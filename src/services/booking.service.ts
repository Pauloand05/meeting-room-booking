import type { Booking } from "@/types/booking";

export async function getBookings(): Promise<Booking[]> {
  const response = await fetch("/api/bookings");

  if (!response.ok) {
    throw new Error("Erro ao buscar reservas.");
  }

  return response.json();
}

export async function createBooking(data: {
  roomId: string;
  title: string;
  participants: number;
  startsAt: string;
  endsAt: string;
}) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Erro ao criar reserva.");
  }

  return body;
}

export async function updateBooking(
  id: string,
  data: {
    roomId: string;
    title: string;
    participants: number;
    startsAt: string;
    endsAt: string;
  },
) {
  const response = await fetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || "Erro ao atualizar reserva.");
  }

  return body;
}

export async function deleteBooking(id: string) {
  const response = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const body = await response.json();

    throw new Error(body.message || "Erro ao excluir reserva.");
  }
}
