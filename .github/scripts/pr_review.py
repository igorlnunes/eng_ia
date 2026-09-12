import os
import sys
import asyncio
import subprocess
from pathlib import Path
# pyrefly: ignore [missing-import]
from google.antigravity import Agent, LocalAgentConfig


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


def get_diff_and_stat() -> tuple[str, str]:
    base_ref = os.environ.get("GITHUB_BASE_REF")
    exclude_args = [
        "--",
        ".",
        ":(exclude)pnpm-lock.yaml",
        ":(exclude)package-lock.json",
        ":(exclude)yarn.lock",
        ":(exclude)*.lock",
        ":(exclude)*.tsbuildinfo",
        ":(exclude)dist/**",
        ":(exclude)build/**"
    ]

    targets = []
    if base_ref:
        targets.extend([
            f"origin/{base_ref}...HEAD",
            f"origin/{base_ref}"
        ])

    targets.extend([
        "main...HEAD",
        "main",
        "HEAD~1",
        "HEAD"
    ])

    for target in targets:
        try:
            stat_cmd = ["git", "diff", "--stat", target] + exclude_args
            stat_res = subprocess.run(stat_cmd, capture_output=True, text=True)
            
            diff_cmd = ["git", "diff", target] + exclude_args
            diff_res = subprocess.run(diff_cmd, capture_output=True, text=True)

            if diff_res.stdout.strip():
                print(f"Diff obtido com sucesso em relação a: {target}")
                return stat_res.stdout.strip(), diff_res.stdout.strip()
        except subprocess.SubprocessError:
            continue

    return "", ""


def get_project_guidelines() -> str:
    gemini_md = Path("GEMINI.md")
    if gemini_md.exists():
        return gemini_md.read_text(encoding="utf-8")
    return ""


async def run_review(stat: str, diff: str, api_key: str) -> str:
    guidelines = get_project_guidelines()

    system_instructions = f"""Você é um Engenheiro de Software Sênior especialista em Code Review e Tech Lead de arquitetura.
Sua missão é realizar uma revisão minuciosa, construtiva e técnica do Pull Request fornecido.

O projeto segue estritamente as diretrizes contidas no arquivo GEMINI.md abaixo:
---
{guidelines}
---

Ao revisar o diff e os arquivos alterados, certifique-se de validar:
1. **Frontend (apps/react-app)**:
   - Conformidade com Atomic Design (atoms, molecules, organisms, templates, pages).
   - Uso de Tailwind CSS para estilização.
   - **OBRIGATÓRIO**: Todo componente React novo ou alterado DEVE possuir um arquivo de teste (.spec.tsx ou .test.tsx) cobrindo seus casos essenciais.
2. **Backend (apps/nest-app)**:
   - Princípios RESTful (recursos no plural, verbos HTTP adequados, status codes corretos).
   - Validações fortes com DTOs.
   - Separação adequada entre Módulos, Controllers, Services e DTOs.
   - Testes unitários/e2e para novas regras de negócio.
3. **Padrões Gerais e Git**:
   - TypeScript estrito, ausência de tipagens fracas ou 'any' injustificado.
   - Padrão de Conventional Commits (feat, fix, refactor, test, docs, etc.).
   - Possíveis gargalos de segurança ou performance.

Estruture sua resposta estritamente em Markdown no seguinte formato:
### 📋 Resumo das Mudanças
(Breve síntese do que foi implementado a partir dos arquivos alterados)

### 🌟 Pontos Positivos
(Destaques de boas práticas arquiteturais e de código encontradas)

### ⚠️ Pontos de Atenção & Sugestões
(Apontamentos técnicos específicos com nome de arquivos e linhas, se aplicável, sugerindo melhorias)

### 🧪 Verificação de Testes & Cobertura
(Avaliação detalhada: se novos componentes React possuem os testes obrigatórios e se o backend possui testes)

### 🎯 Veredito
(Recomendação: **Aprovado**, **Aprovado com Ressalvas** ou **Requer Alterações**)
"""

    model_name = os.environ.get("ANTIGRAVITY_MODEL", "gemini-2.5-flash")
    print(f"Utilizando modelo: {model_name}")

    config = LocalAgentConfig(
        system_instructions=system_instructions,
        api_key=api_key,
        model=model_name,
        tools=[]  # Modo puramente analítico (sem execução de ferramentas de shell)
    )

    # Limita o diff caso seja muito extenso para caber no contexto com margem
    max_diff_len = 30000
    trimmed_diff = diff[:max_diff_len]
    if len(diff) > max_diff_len:
        trimmed_diff += f"\n\n[... Diff truncado em {max_diff_len} caracteres de {len(diff)} totais ...]"

    prompt = f"""Por favor, revise o seguinte Pull Request:

### 📁 Arquivos Alterados (git diff --stat):
```text
{stat}
```

### 🔍 Diff de Alterações:
```diff
{trimmed_diff}
```
"""

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
    stat, diff = get_diff_and_stat()

    output_path = Path("pr_review_output.md")

    if not diff.strip():
        message = (
            "## 🤖 Antigravity AI Code Review\n\n"
            "Nenhuma alteração de código detectada para análise neste Pull Request."
        )
        print(message)
        output_path.write_text(message, encoding="utf-8")
        return

    print(f"Tamanho do diff detectado: {len(diff)} caracteres.")
    review_markdown = await run_review(stat, diff, api_key)

    full_output = f"## 🤖 Antigravity AI Code Review\n\n{review_markdown}\n\n---\n*Revisão automatizada com Antigravity Agent no GitHub Actions.*"
    output_path.write_text(full_output, encoding="utf-8")
    print(f"\nComentário de revisão salvo em: {output_path.resolve()}")


if __name__ == "__main__":
    asyncio.run(main())
