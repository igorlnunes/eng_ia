import os
import sys
import asyncio
import subprocess
from pathlib import Path
from google.antigravity import Agent, LocalAgentConfig, CapabilitiesConfig


def load_env_fallback():
    """Fallback local: carrega chaves de .env se não estiverem no ambiente."""
    env_file = Path(".env")
    if env_file.exists():
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip("\"'").strip()
                    if key not in os.environ:
                        os.environ[key] = val


def get_api_key() -> str:
    load_env_fallback()
    api_key = os.environ.get("GEMINI_ACTIONS_API_KEY") or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("ERRO: Nenhuma chave de API encontrada em GEMINI_ACTIONS_API_KEY ou GEMINI_API_KEY.")
        sys.exit(1)
    return api_key


def get_diff() -> str:
    base_ref = os.environ.get("GITHUB_BASE_REF")
    diff_commands = []

    if base_ref:
        diff_commands.extend([
            ["git", "diff", f"origin/{base_ref}...HEAD"],
            ["git", "diff", f"origin/{base_ref}"]
        ])

    # Fallbacks para teste local ou quando base_ref não estiver definido
    diff_commands.extend([
        ["git", "diff", "main...HEAD"],
        ["git", "diff", "main"],
        ["git", "diff", "HEAD~1"],
        ["git", "diff", "HEAD"]
    ])

    for cmd in diff_commands:
        try:
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            if result.stdout.strip():
                print(f"Diff obtido com sucesso via comando: {' '.join(cmd)}")
                return result.stdout
        except subprocess.SubprocessError:
            continue

    return ""


def get_project_guidelines() -> str:
    gemini_md = Path("GEMINI.md")
    if gemini_md.exists():
        return gemini_md.read_text(encoding="utf-8")
    return ""


async def run_review(diff: str, api_key: str) -> str:
    guidelines = get_project_guidelines()

    system_instructions = f"""Você é um Engenheiro de Software Sênior especialista em Code Review e Tech Lead de arquitetura.
Sua missão é realizar uma revisão minuciosa, construtiva e técnica do Pull Request fornecido.

O projeto segue estritamente as diretrizes contidas no arquivo GEMINI.md abaixo:
---
{guidelines}
---

Ao revisar o diff, certifique-se de validar:
1. **Frontend (apps/react-app)**:
   - Conformidade com Atomic Design (atoms, molecules, organisms, templates, pages).
   - Uso de Tailwind CSS.
   - **OBRIGATÓRIO**: Todo componente React novo ou alterado deve ter testes essenciais (.spec.tsx / .test.tsx).
2. **Backend (apps/nest-app)**:
   - Princípios RESTful (recursos no plural, verbos HTTP corretos, status codes adequados).
   - Validações fortes via DTOs.
   - Separação adequada entre Modules, Controllers e Services.
   - Testes unitários/e2e correspondentes.
3. **Padrões Gerais e Git**:
   - Qualidade, segurança, ausência de 'any' sem justificativa no TypeScript, performance.
   - Padrão de Conventional Commits.

Estruture sua resposta estritamente em Markdown no seguinte formato:
### 📋 Resumo das Mudanças
(Breve síntese do que foi implementado)

### 🌟 Pontos Positivos
(Destaques de boas práticas encontradas)

### ⚠️ Pontos de Atenção & Sugestões
(Apontamentos técnicos específicos com nome de arquivos e linhas, se aplicável, sugerindo melhorias)

### 🧪 Verificação de Testes & Cobertura
(Avaliação sobre a presença e cobertura dos testes obrigatórios)

### 🎯 Veredito
(Recomendação: **Aprovado**, **Aprovado com Ressalvas** ou **Requer Alterações**)
"""

    config = LocalAgentConfig(
        system_instructions=system_instructions,
        api_key=api_key,
        capabilities=CapabilitiesConfig()  # Modo somente leitura
    )

    # Limita o diff caso seja excessivamente grande para evitar estourar limites
    max_diff_len = 40000
    trimmed_diff = diff[:max_diff_len]
    if len(diff) > max_diff_len:
        trimmed_diff += f"\n\n[... Diff truncado em {max_diff_len} caracteres ...]"

    prompt = f"Por favor, revise o seguinte diff de Pull Request:\n\n```diff\n{trimmed_diff}\n```"

    review_chunks = []
    print("Iniciando sessão do Antigravity Agent para Code Review...")
    async with Agent(config) as agent:
        response = await agent.chat(prompt)
        async for token in response:
            review_chunks.append(token)
            sys.stdout.write(token)
            sys.stdout.flush()

    print("\nRevisão concluída com sucesso!")
    return "".join(review_chunks)


async def main():
    api_key = get_api_key()
    diff = get_diff()

    output_path = Path("pr_review_output.md")

    if not diff.strip():
        message = (
            "## 🤖 Antigravity AI Code Review\n\n"
            "Nenhuma alteração de código (diff) detectada para análise neste Pull Request."
        )
        print(message)
        output_path.write_text(message, encoding="utf-8")
        return

    print(f"Tamanho do diff detectado: {len(diff)} caracteres.")
    review_markdown = await run_review(diff, api_key)

    full_output = f"## 🤖 Antigravity AI Code Review\n\n{review_markdown}\n\n---\n*Revisão automatizada via Antigravity Agent no GitHub Actions.*"
    output_path.write_text(full_output, encoding="utf-8")
    print(f"Comentário de revisão salvo em: {output_path.resolve()}")


if __name__ == "__main__":
    asyncio.run(main())
