import type { Room } from "@/types/room";

export async function getRooms(): Promise<Room[]> {
  const response = await fetch("/api/rooms");

  if (!response.ok) {
    throw new Error("Erro ao buscar salas.");
  }

  return response.json();
}

export async function createRoom(data: { name: string; capacity: number }) {
  const response = await fetch("/api/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Erro ao criar sala.");
  }

  return body;
}

export async function updateRoom(
  id: string,
  data: { name: string; capacity: number },
) {
  const response = await fetch(`/api/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Erro ao atualizar sala.");
  }

  return body;
}

export async function deleteRoom(id: string) {
  const response = await fetch(`/api/rooms/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const body = await response.json();

    throw new Error(body.message || "Erro ao excluir sala.");
  }
}
