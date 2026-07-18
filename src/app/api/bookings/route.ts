import { prisma } from "@/lib/prisma";
export async function GET() { return Response.json(await prisma.booking.findMany({ include: { room: true }, orderBy: { startsAt: 'asc' } })) }
export async function POST(request: Request) {
  const body = await request.json(); const startsAt = new Date(body.startsAt); const endsAt = new Date(body.endsAt)
  if (!body.roomId || !body.title?.trim() || !Number.isInteger(body.participants) || body.participants < 1 || Number.isNaN(startsAt.valueOf()) || Number.isNaN(endsAt.valueOf()) || endsAt <= startsAt) return Response.json({ message: 'Preencha os campos e informe um intervalo válido.' }, { status: 400 })
  const room = await prisma.room.findUnique({ where: { id: body.roomId } }); if (!room) return Response.json({ message: 'Sala não encontrada.' }, { status: 404 })
  if (body.participants > room.capacity) return Response.json({ message: `A sala comporta no máximo ${room.capacity} participantes.` }, { status: 409 })
  const conflict = await prisma.booking.findFirst({ where: { roomId: body.roomId, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } } })
  if (conflict) return Response.json({ message: 'Este horário conflita com uma reserva existente nesta sala.' }, { status: 409 })
  return Response.json(await prisma.booking.create({ data: { roomId: body.roomId, title: body.title.trim(), participants: body.participants, startsAt, endsAt }, include: { room: true } }), { status: 201 })
}
