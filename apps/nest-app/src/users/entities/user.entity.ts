// Reutiliza o tipo User gerado pelo Prisma Client como entidade da aplicação.
// Isso garante que a tipagem do serviço esteja sempre sincronizada com o schema do banco.
export type { User } from '@prisma/client';
