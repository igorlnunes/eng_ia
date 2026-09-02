# Contexto e Guias do Projeto (GEMINI.md)

Este repositório é um **monorepo** gerenciado com **pnpm workspaces**, contendo uma aplicação frontend em React e uma aplicação backend em NestJS.

---

## 🏗️ Arquitetura do Workspace

- **Gerenciador de Pacotes**: `pnpm` (versão `11.25.0`)
- **Estratégia de Workspaces**: `apps/*` (definido em `pnpm-workspace.yaml`)
- **Tipo de Módulo**: ES Modules (`"type": "module"`)
- **Padrão de Git**: **Conventional Commits** em todos os projetos (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`)

### Aplicativos em `apps/`

1. **`apps/react-app`** (Frontend)
   - **Stack**: React 19, TypeScript 6, Vite 8, Tailwind CSS
   - **Arquitetura de UI**: **Atomic Design** (`atoms`, `molecules`, `organisms`, `templates`, `pages`)
   - **Testes**: Obrigatório teste cobrindo o uso essencial de **cada componente**
   - **Linter**: Oxlint
   - **Objetivo**: Interface do usuário e aplicação cliente Web.

2. **`apps/nest-app`** (Backend)
   - **Stack**: NestJS 12, Express, TypeScript 6
   - **Arquitetura de API**: **Princípios RESTful** (Recursos no plural, Verbos HTTP adequados, Status Codes apropriados, DTOs e payloads padronizados)
   - **Testes**: Vitest (unitários e e2e)
   - **Linter & Formatação**: Oxlint + Prettier
   - **Objetivo**: API Backend e regras de negócio.

---

## 🛠️ Comandos Frequentes

### Execução a partir da Raiz (Root)

| Ação | Comando |
| :--- | :--- |
| Rodar Frontend (React) em dev | `pnpm dev:react` |
| Build do Frontend (React) | `pnpm build:react` |
| Rodar Backend (NestJS) em dev | `pnpm dev:nest` |
| Build do Backend (NestJS) | `pnpm build:nest` |

### Comandos Específicos dos Projetos

#### Frontend (`apps/react-app`)
- **Dev**: `pnpm --filter react-app dev`
- **Build**: `pnpm --filter react-app build`
- **Lint**: `pnpm --filter react-app lint`

#### Backend (`apps/nest-app`)
- **Dev**: `pnpm --filter nest-app start:dev`
- **Build**: `pnpm --filter nest-app build`
- **Testes Unitários**: `pnpm --filter nest-app test`
- **Testes E2E**: `pnpm --filter nest-app test:e2e`
- **Lint**: `pnpm --filter nest-app lint`
- **Formatação**: `pnpm --filter nest-app format`

---

## 📐 Diretrizes e Convenções de Código

### 1. Git & Controle de Versão
- **Conventional Commits**: Siga estritamente o padrão para todas as mensagens de commit:
  - `feat`: Nova funcionalidade.
  - `fix`: Correção de bug.
  - `docs`: Alteração em documentação.
  - `style`: Formatação, ponto e vírgula, sem alteração de código produtivo.
  - `refactor`: Refatoração sem alteração de comportamento externo.
  - `test`: Adição ou correção de testes.
  - `chore`: Atualização de tarefas de build, pacotes, etc.

### 2. Frontend (`apps/react-app`)
- **Atomic Design**: Organizar os componentes da interface nas 5 camadas:
  - `src/components/atoms/`: Elementos fundamentais e indivisíveis (ex: Botões, Inputs, Ícones).
  - `src/components/molecules/`: Combinação de átomos (ex: Campo de busca com botão, FormField).
  - `src/components/organisms/`: Seções complexas de UI (ex: Header, Sidebar, Formulário completo).
  - `src/components/templates/`: Layouts da página sem dados reais.
  - `src/pages/`: Páginas finais populadas com dados e estado.
- **Estilização com Tailwind CSS**: Utilizar Tailwind CSS para todas as estilizações de componentes.
- **Testes Obrigatórios de Componentes**: **Todo** componente React criado deve obrigatoriamente possuir um arquivo de teste (`.spec.tsx` ou `.test.tsx`) cobrindo seus casos de uso essenciais (renderização, eventos de clique, estados principais).

### 3. Backend (`apps/nest-app`)
- **Aderência Estrita aos Princípios REST**:
  - **URIs Orientadas a Recursos**: Substantivos no plural (ex: `/users`, `/products`).
  - **Uso Correto de Verbos HTTP**: `GET` (leitura), `POST` (criação), `PUT` (substituição total), `PATCH` (atualização parcial), `DELETE` (remoção).
  - **Status Codes HTTP Adequados**: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`, `500 Internal Server Error`.
  - **Validação com DTOs**: Utilizar Data Transfer Objects fortemente tipados e validados para request body/query params.
- **Arquitetura NestJS**:
  - Respeitar a separação por Módulos, Controllers, Services e DTOs.

### 4. Monorepo & Qualidade Geral
- **Monorepo & Filtros**: Utilize sempre `pnpm --filter <app-name>` ao executar scripts ou instalar dependências em subprojetos.
- **TypeScript Estrito**: Manter tipagens explícitas sem o uso de `any` injustificado.
- **Linter e Formatação**: Manter o código alinhado com o Oxlint e Prettier.
