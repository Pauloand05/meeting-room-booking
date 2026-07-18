import type { Room } from "@/types/room";

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomCard({ room, onEdit, onDelete }: RoomCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <h3 className="font-bold">{room.name}</h3>

      <p className="mt-1 text-sm text-slate-500">
        Capacidade: {room.capacity} pessoas
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(room)}
          className="w-auto bg-slate-200 px-3 py-2 text-sm text-slate-700"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(room)}
          className="w-auto !bg-red-600 px-3 py-2 text-sm hover:!bg-red-700"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
