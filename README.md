# Reserva de Salas

Aplicação Next.js/TypeScript para gerenciar salas e reservas. A API valida no servidor: campos obrigatórios, fim posterior ao início, capacidade e sobreposição (`início < fimExistente` e `fim > inícioExistente`). Reservas adjacentes são permitidas.

## Executar

1. Crie um banco PostgreSQL (Neon ou Supabase) e atualize `DATABASE_URL` em `.env`.
2. Execute `npx prisma migrate dev --name init`.
3. Cadastre salas por `POST /api/rooms` (ex.: `{ "name": "Sala Atlântico", "capacity": 12 }`).
4. Execute `npm run dev`.

## Decisões

- Capacidade é bloqueio rígido, para evitar uma reserva inviável.
- Não há horário de funcionamento: o escopo não o determina.
- Para recorrência, criaria uma entidade `BookingSeries` (regra RRULE e período) e materializaria ocorrências; a checagem continuaria por ocorrência, dentro de transação.
