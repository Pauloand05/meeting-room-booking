import type { Booking } from "@/types/booking";
import type { Room } from "@/types/room";

import BookingCard from "./BookingCard";

interface BookingListProps {
  rooms: Room[];
  roomId: string;
  setRoomId: (value: string) => void;

  bookings: Booking[];

  loading: boolean;

  now: Date;

  onEdit: (booking: Booking) => void;

  onDelete: (booking: Booking) => void;
}

export default function BookingList({
  rooms,
  roomId,
  setRoomId,
  bookings,
  loading,
  now,
  onEdit,
  onDelete,
}: BookingListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Agenda</h2>
          <p className="text-sm text-slate-500">
            Ordenada por horário de início
          </p>
        </div>
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value="">Todas as salas</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="text-slate-500">Carregando agenda…</p>
      ) : bookings.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
          Nenhuma reserva para esta sala.
        </p>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              now={now}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
