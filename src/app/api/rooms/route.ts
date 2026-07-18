import { prisma } from "@/lib/prisma";
export async function GET() { return Response.json(await prisma.room.findMany({ orderBy: { name: 'asc' } })) }
export async function POST(request: Request) { const body = await request.json(); if (!body.name || !Number.isInteger(body.capacity) || body.capacity < 1) return Response.json({ message: 'Nome e capacidade válida são obrigatórios.' }, { status: 400 }); return Response.json(await prisma.room.create({ data: { name: body.name.trim(), capacity: body.capacity } }), { status: 201 }) }
