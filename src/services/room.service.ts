import type { Room } from "@/types/room";

export async function getRooms(): Promise<Room[]> {
  const response = await fetch("/api/rooms");

  if (!response.ok) {
    throw new Error("Erro ao buscar salas.");
  }

  return response.json();
}