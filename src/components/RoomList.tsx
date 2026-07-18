import type { Room } from "@/types/room";

import RoomCard from "./RoomCard";

interface RoomListProps {
  rooms: Room[];
  loading: boolean;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomList({
  rooms,
  loading,
  onEdit,
  onDelete,
}: RoomListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Salas cadastradas</h2>
        <p className="text-sm text-slate-500">Ordenadas por nome</p>
      </div>

      {loading ? (
        <p className="text-slate-500">Carregando salas...</p>
      ) : rooms.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
          Nenhuma sala cadastrada.
        </p>
      ) : (
        <div className="space-y-3">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
