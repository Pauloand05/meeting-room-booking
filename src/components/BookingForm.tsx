import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Room } from "@/types/room";
import type { BookingFormData } from "@/types/booking";

interface BookingFormProps {
  rooms: Room[];
  roomId: string;
  setRoomId: (value: string) => void;

  form: BookingFormData;

  setForm: Dispatch<SetStateAction<BookingFormData>>;

  submit: (event: FormEvent<HTMLFormElement>) => void;

  message: string;
}

export default function BookingForm({
  rooms,
  roomId,
  setRoomId,
  form,
  setForm,
  submit,
  message,
}: BookingFormProps) {
  return (
      <form
        onSubmit={submit}
        className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <h2 className="text-xl font-bold">Nova reserva</h2>
        <p className="mb-6 mt-1 text-sm text-slate-500">
          A disponibilidade é validada no servidor.
        </p>
        <label>
          Sala
          <select
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} · até {room.capacity} pessoas
              </option>
            ))}
          </select>
        </label>
        <label>
          Título
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex.: Planejamento semanal"
          />
        </label>
        <label>
          Participantes
          <input
            required
            min="1"
            type="number"
            value={form.participants}
            onChange={(e) =>
              setForm({ ...form, participants: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Início
          <input
            required
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
          />
        </label>
        <label>
          Fim
          <input
            required
            type="datetime-local"
            value={form.endsAt}
            onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
          />
        </label>
        <button disabled={!roomId}>Criar reserva</button>
        {message && (
          <p className="mt-4 text-sm font-medium text-orange-700">{message}</p>
        )}
      </form>
  );
}
