import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const name = body.name?.trim();

  if (!name || !Number.isInteger(body.capacity) || body.capacity < 1) {
    return Response.json(
      { message: "Nome e capacidade válida são obrigatórios." },
      { status: 400 },
    );
  }

  const room = await prisma.room.findUnique({ where: { id } });

  if (!room) {
    return Response.json({ message: "Sala não encontrada." }, { status: 404 });
  }

  const duplicatedRoom = await prisma.room.findFirst({
    where: {
      id: { not: id },
      name,
    },
  });

  if (duplicatedRoom) {
    return Response.json(
      { message: "Já existe uma sala com este nome." },
      { status: 409 },
    );
  }

  return Response.json(
    await prisma.room.update({
      where: { id },
      data: {
        name,
        capacity: body.capacity,
      },
    }),
  );
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const room = await prisma.room.findUnique({ where: { id } });

  if (!room) {
    return Response.json({ message: "Sala não encontrada." }, { status: 404 });
  }

  const bookingsCount = await prisma.booking.count({ where: { roomId: id } });

  if (bookingsCount > 0) {
    return Response.json(
      { message: "Não é possível excluir uma sala que possui reservas." },
      { status: 409 },
    );
  }

  await prisma.room.delete({ where: { id } });

  return new Response(null, { status: 204 });
}
