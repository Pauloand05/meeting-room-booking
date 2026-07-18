# Meeting Room Booking

Sistema de reserva de salas desenvolvido como desafio técnico para a Dizevolv.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Tailwind CSS

## Funcionalidades

- Cadastro de reservas
- Listagem de reservas
- Filtro por sala
- Validação de conflitos de horário
- Validação da capacidade da sala
- Feedback visual para sucesso e erro

## Regras de negócio

- Não permite reservas sobrepostas para a mesma sala.
- Não permite reservas com horário final menor ou igual ao inicial.
- Não permite reservas acima da capacidade da sala.
- As reservas são ordenadas por horário de início.

## Estrutura do projeto

```text
src/
 ├── app/
 ├── components/
 ├── lib/
 ├── services/
 ├── types/
 └── utils/

prisma/
 ├── migrations/
 ├── schema.prisma
 └── seed.ts
```

## Como executar

### Clone

```bash
git clone <url>
```

### Instale

```bash
npm install
```

### Configure o ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="sua_string_do_neon"
```

### Gere o Prisma Client

```bash
npx prisma generate
```

### Execute as migrations

```bash
npx prisma migrate deploy
```

### Popule o banco

```bash
npm run seed
```

### Execute

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run seed
```

## Autor

Paulo Andrade