# Desafio sistema de gerenciamento de tarefas (To-Do List)

Repositório para ser usado pelos candidatos à vaga de Desenvolvedor Júnior Backend Liferay da Simplify

## Descrição

- Desenvolva uma aplicação web utilizando uma linguagem de programação e um framework de sua escolha. A aplicação deve consistir em um sistema de gerenciamento de tarefas, onde os usuários podem criar, visualizar, editar e excluir tarefas.

## Requisitos

- Usar banco de dados
- Campos mínimos da entidade de tarefa
  - Nome
  - Descrição
  - Realizado
  - Prioridade
- Criar CRUD de tarefas

## Instruções

- Fazer um fork do repositório para sua conta pessoal do git
- Trabalhar utilizando commits
- Documentar como executar sua aplicação
- Descrever as funcionalidades do software

## Como Executar

Instalando as dependências do projeto, executando o comando na raiz do projeto:

```bash
npm i
```

### Variáveis de Ambiente

Deve-se criar um arquivo de variaveis de ambiente na raiz do projeto, nomeado de `.env` ou `env.local`, e copiar o conteúdo do arquivo `.env.example` para ele, editando as variáveis conforme seu ambiente.

### Banco de Dados

Esse projeto utiliza **MySQL** com o **Prisma ORM**, portanto para configurar, basta configurar a variável `DATABASE_URL` no arquivo `.env`, com as configurações de seu BD.

```bash
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```

Para criar as tabelas, deve-se executar os seguintes comandos do **Prisma**:

```bash
npx prisma generate
npx prisma migrate dev
```

### NextAuth

NextAuth requer as seguintes variáveis:

```bash
NEXTAUTH_SECRET="random_secret"
NEXTAUTH_URL="http://localhost:3000/api/auth"
```

Para gerar o `NEXTAUTH_SECRET`, recomenda-se executar o comando (com **openssl instalado**):

```bash
openssl rand -base64 32
```

O provedor Github do Next Auth requer as seguintes variáveis:

```bash
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
```

Para criar ambas, deve-se acessar https://github.com/settings/developers e criar um novo OAuth App, com as seguintes URLs:

- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/auth/callback/github

Após a criação do OAuth App no Github, deve-se copiar o **Client ID** e colocar na variável `GITHUB_CLIENT_ID`, depois gerar o **Client Secret** e colocar na variável `GITHUB_CLIENT_SECRET` do `.env`.

Para auxílio, segue um tutorial com passo a passo: https://scribehow.com/shared/How_to_Create_an_OAuth_App_on_GitHub__iV4dy-mRQ1KloN6JS3CUBw

### Observações

Caso sua aplicação esteja sendo executada em uma porta diferente, deve-se alterar as variáveis conforme a porta utilizada.

## Funcionalidades

- [x] Autenticação com Github
- [x] CRUD de tarefas (Listar, Criar, Editar, Excluir)
- [x] Uso do BD MySQL
- [x] Selecionar prioridade da tarefa
- [x] Marcar/Desmarcar tarefas como feitas
- [x] Light/Dark mode

## Tecnologias

- [Next.js][next]
- [Typescript][typescript]
- [Prisma][prisma]
- [NextAuth.js][nextauth]
- [React Hook Form][react_hook_form]
- [TailwindCSS][tailwindcss]
- [Shadcn/ui][shadcn_ui]
- [Radix UI][radix]
- [Lucide-react][lucide]
- [Zod][zod]

[next]: https://nextjs.org
[typescript]: https://www.typescriptlang.org
[prisma]: https://www.prisma.io
[nextauth]: https://next-auth.js.org
[react_hook_form]: https://react-hook-form.com
[tailwindcss]: https://tailwindcss.com
[shadcn_ui]: https://ui.shadcn.com
[radix]: https://www.radix-ui.com
[lucide]: https://lucide.dev
[zod]: https://zod.dev
