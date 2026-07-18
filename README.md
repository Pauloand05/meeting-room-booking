# Meeting Room Booking

Sistema de gerenciamento de reservas de salas desenvolvido como desafio técnico para a Dizevolv.

O objetivo da aplicação é permitir o gerenciamento de salas e reservas, garantindo que não existam conflitos de horário e respeitando a capacidade máxima de cada sala.

---

# Tecnologias utilizadas

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Tailwind CSS

---

# Funcionalidades

## CRUD de Salas

- Criar sala
- Listar salas
- Editar sala
- Excluir sala

## CRUD de Reservas

- Criar reserva
- Listar reservas
- Editar reserva
- Excluir reserva

## Regras implementadas

- Validação de conflito de horários
- Validação da capacidade da sala
- Validação de campos obrigatórios
- Ordenação das reservas por horário
- Filtro de reservas por sala
- Feedback visual para operações de sucesso e erro

---

# Arquitetura

O projeto foi organizado em camadas para separar responsabilidades.

```text
src/
├── app/
│   ├── api/
│   └── page.tsx
├── components/
├── services/
├── types/
├── utils/
└── lib/

prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

### Organização

- **API Routes:** validações e regras de negócio.
- **Services:** comunicação entre Front-end e API.
- **Components:** interface reutilizável.
- **Types:** modelos compartilhados.
- **Utils:** funções auxiliares.

---

# Regras de negócio

## Conflito de horário

A validação de conflitos é realizada exclusivamente no servidor.

Uma reserva é considerada conflitante quando existe qualquer sobreposição entre dois intervalos de tempo da mesma sala.

Foi adotada a seguinte regra:

- uma reserva terminando exatamente no horário em que outra começa **não é considerada conflito**.

Exemplo:

- Reserva A: 13:00 → 14:00
- Reserva B: 14:00 → 15:00

Essas reservas são permitidas.

---

## Capacidade

Cada sala possui uma capacidade máxima cadastrada.

O sistema impede a criação ou edição de reservas cuja quantidade de participantes ultrapasse essa capacidade.

A validação ocorre tanto no Front-end quanto na API.

---

## Exclusão de salas

Uma sala não pode ser excluída caso existam reservas vinculadas a ela.

Essa validação é realizada no servidor.

---

# Decisões tomadas

Durante o desenvolvimento foram adotadas as seguintes decisões.

## Reserva terminando exatamente quando outra começa

Foi considerado que não existe conflito.

Essa decisão permite melhor utilização das salas sem sobreposição de horários.

---

## Horário de funcionamento

Não foi definido horário comercial.

A aplicação permite reservas em qualquer horário, pois essa regra não fazia parte do escopo do desafio.

---

## Edição de uma reserva

Ao editar uma reserva, o sistema ignora a própria reserva durante a verificação de conflitos.

Dessa forma, é possível alterar outras informações sem gerar falso positivo de conflito.

---

## Comunicação dos erros

As mensagens retornadas pela API são exibidas ao usuário através de feedback visual no formulário, informando claramente o motivo da falha.

---

# Evolução para reservas recorrentes

Para suportar reservas recorrentes seria necessário:

- criar um modelo para séries de recorrência;
- armazenar regras de repetição (diária, semanal, mensal);
- gerar as ocorrências da reserva;
- validar conflitos para cada ocorrência individualmente;
- permitir edição apenas da ocorrência atual ou da série completa.

Essa abordagem mantém a flexibilidade do sistema e facilita futuras evoluções.

---

# Como executar

## Clonar o projeto

```bash
git clone https://github.com/Pauloand05/meeting-room-booking.git
```

```bash
cd meeting-room-booking
```

---

## Instalar dependências

```bash
npm install
```

---

## Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="sua_string_do_neon"
```

---

## Gerar o Prisma Client

```bash
npx prisma generate
```

---

## Executar as migrations

```bash
npx prisma migrate deploy
```

---

## Popular o banco

```bash
npm run seed
```

---

## Executar a aplicação

```bash
npm run dev
```

---

# Scripts

```bash
npm run dev

npm run build

npm run lint

npm run seed
```

---

# Deploy

Aplicação: *[(https://meeting-room-booking-lovat.vercel.app/)]*

Repositório: *[(https://github.com/Pauloand05/meeting-room-booking)]*

---

# Melhorias futuras

- Autenticação de usuários.
- Calendário (Timeline).
- Pesquisa por salas.
- Testes automatizados.
- Docker.
- Paginação.

---

# Autor

**Paulo André**