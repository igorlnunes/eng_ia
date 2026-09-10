import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data in reverse relation order
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('senha123', 10);

  // Users
  const ana = await prisma.user.create({
    data: {
      name: 'Ana Silva',
      email: 'ana@example.com',
      password: passwordHash,
    },
  });

  const carlos = await prisma.user.create({
    data: {
      name: 'Carlos Souza',
      email: 'carlos@example.com',
      password: passwordHash,
    },
  });

  const beatriz = await prisma.user.create({
    data: {
      name: 'Beatriz Lima',
      email: 'beatriz@example.com',
      password: passwordHash,
    },
  });

  // Tags
  const tagReact = await prisma.tag.create({ data: { name: 'React' } });
  const tagJS = await prisma.tag.create({ data: { name: 'JavaScript' } });
  const tagTS = await prisma.tag.create({ data: { name: 'TypeScript' } });
  const tagNode = await prisma.tag.create({ data: { name: 'Node.js' } });
  const tagTailwind = await prisma.tag.create({ data: { name: 'Tailwind' } });
  const tagCSS = await prisma.tag.create({ data: { name: 'CSS' } });
  const tagCleanCode = await prisma.tag.create({ data: { name: 'Clean Code' } });
  const tagPython = await prisma.tag.create({ data: { name: 'Python' } });

  // Posts
  // Post 1: React hooks (with image)
  const post1 = await prisma.post.create({
    data: {
      title: 'Dominando useMemo e useCallback no React 19',
      description:
        'Aprenda como evitar re-renderizações desnecessárias e otimizar componentes críticos em aplicações React modernas sem perder legibilidade.',
      codeSnippet: `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);\n\nconst handleClick = useCallback(() => {\n  console.log('Button clicked', a);\n}, [a]);`,
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
      sharesCount: 14,
      authorId: ana.id,
      tags: {
        connect: [{ id: tagReact.id }, { id: tagTS.id }],
      },
    },
  });

  // Post 2: TypeScript Tips (NO IMAGE - tests thumbnail placeholder!)
  const post2 = await prisma.post.create({
    data: {
      title: '5 Utility Types Essenciais no TypeScript que você deveria usar',
      description:
        'Pick, Omit, Partial, Record e ReturnType: explorando exemplos reais do dia a dia para deixar seu código mais tipado, previsível e conciso.',
      codeSnippet: `type UserPreview = Pick<User, 'id' | 'name'>;\ntype EditableFields = Partial<Omit<User, 'id' | 'createdAt'>>;\n\nfunction updateProfile(fields: EditableFields): void {\n  // Atualização segura\n}`,
      imageUrl: null, // Placeholder test!
      sharesCount: 28,
      authorId: carlos.id,
      tags: {
        connect: [{ id: tagTS.id }, { id: tagCleanCode.id }],
      },
    },
  });

  // Post 3: Tailwind CSS Tips (with image)
  const post3 = await prisma.post.create({
    data: {
      title: 'Criando layouts responsivos ultra modernos com Tailwind CSS v4',
      description:
        'Descubra novidades da versão 4 do Tailwind, uso de variáveis CSS nativas e como montar grids flexíveis para dashboards de alta performance.',
      codeSnippet: `@theme {\n  --color-primary: #59f588;\n  --font-sans: 'Prompt', sans-serif;\n}`,
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
      sharesCount: 9,
      authorId: beatriz.id,
      tags: {
        connect: [{ id: tagTailwind.id }, { id: tagCSS.id }],
      },
    },
  });

  // Post 4: Node.js Streams (NO IMAGE - tests thumbnail placeholder!)
  const post4 = await prisma.post.create({
    data: {
      title: 'Processamento eficiente de arquivos gigantes com Node.js Streams',
      description:
        'Como processar gigabytes de dados sem estourar a memória RAM da máquina usando pipelines, transform streams e backpressure correto.',
      codeSnippet: `import { pipeline } from 'node:stream/promises';\nimport { createReadStream, createWriteStream } from 'node:fs';\nimport { createGzip } from 'node:zlib';\n\nawait pipeline(\n  createReadStream('input.txt'),\n  createGzip(),\n  createWriteStream('input.txt.gz')\n);`,
      imageUrl: null, // Placeholder test!
      sharesCount: 42,
      authorId: ana.id,
      tags: {
        connect: [{ id: tagNode.id }, { id: tagJS.id }],
      },
    },
  });

  // Post 5: Clean Architecture (with image)
  const post5 = await prisma.post.create({
    data: {
      title: 'Arquitetura Limpa em APIs NestJS: Módulos, Serviços e DTOs',
      description:
        'Boas práticas de desacoplamento, injeção de dependências e regras de validação para manter microsserviços manuteníveis e testáveis.',
      codeSnippet: `@Injectable()\nexport class CreatePostUseCase {\n  constructor(private readonly repo: PostRepository) {}\n  async execute(dto: CreatePostDto) {\n    return this.repo.save(dto);\n  }\n}`,
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
      sharesCount: 31,
      authorId: carlos.id,
      tags: {
        connect: [{ id: tagNode.id }, { id: tagCleanCode.id }, { id: tagTS.id }],
      },
    },
  });

  // Post 6: Python & AI (with image)
  const post6 = await prisma.post.create({
    data: {
      title: 'Integrando LLMs com LangChain e FastAPI em Python',
      description:
        'Tutorial completo para criar agentes inteligentes capazes de pesquisar dados na internet e responder perguntas em tempo real com streaming.',
      codeSnippet: `from langchain.chat_models import ChatOpenAI\nfrom langchain.schema import HumanMessage\n\nllm = ChatOpenAI(temperature=0)\nresponse = llm([HumanMessage(content="Explique recursão")])\nprint(response.content)`,
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      sharesCount: 50,
      authorId: beatriz.id,
      tags: {
        connect: [{ id: tagPython.id }],
      },
    },
  });

  // Comments
  await prisma.comment.createMany({
    data: [
      {
        content: 'Excelente explicação! useMemo me salvou em uma lista com mais de 1000 itens.',
        postId: post1.id,
        authorId: carlos.id,
      },
      {
        content: 'Muito bom! Você recomenda usar memo() em conjunto com useCallback sempre?',
        postId: post1.id,
        authorId: beatriz.id,
      },
      {
        content: 'ReturnType é simplesmente fantástico quando estamos lidando com bibliotecas externas.',
        postId: post2.id,
        authorId: ana.id,
      },
      {
        content: 'O Tailwind v4 simplificou muito a configuração sem o arquivo tailwind.config.js!',
        postId: post3.id,
        authorId: ana.id,
      },
      {
        content: 'Streams são o recurso mais subestimado do Node.js. Parabéns pelo post!',
        postId: post4.id,
        authorId: carlos.id,
      },
    ],
  });

  // Likes
  await prisma.like.createMany({
    data: [
      { postId: post1.id, userId: carlos.id },
      { postId: post1.id, userId: beatriz.id },
      { postId: post2.id, userId: ana.id },
      { postId: post2.id, userId: beatriz.id },
      { postId: post3.id, userId: ana.id },
      { postId: post4.id, userId: carlos.id },
      { postId: post4.id, userId: beatriz.id },
      { postId: post5.id, userId: ana.id },
      { postId: post6.id, userId: carlos.id },
      { postId: post6.id, userId: ana.id },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
