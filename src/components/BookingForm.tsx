import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Room } from "@/types/room";
import type { BookingFormData } from "@/types/booking";
import type { Feedback } from "@/types/feedback";

interface BookingFormProps {
  rooms: Room[];
  roomId: string;
  setRoomId: (value: string) => void;

  form: BookingFormData;

  setForm: Dispatch<SetStateAction<BookingFormData>>;

  submit: (event: FormEvent<HTMLFormElement>) => void;

  feedback: Feedback | null;

  isSubmitting: boolean;
}

export default function BookingForm({
  rooms,
  roomId,
  setRoomId,
  form,
  setForm,
  submit,
  feedback,
  isSubmitting,
}: BookingFormProps) {
  const selectedRoom = rooms.find((room) => room.id === roomId);

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
        <select className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
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
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Ex.: Planejamento semanal"
        />
      </label>
      <label>
        Participantes
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          min={1}
          type="number"
          value={form.participants}
          onChange={(e) =>
            setForm({
              ...form,
              participants: Number(e.target.value),
            })
          }
        />
        {selectedRoom && (
          <p className="mt-1 text-xs text-slate-500">
            Capacidade máxima: {selectedRoom.capacity} pessoas
          </p>
        )}
      </label>
      <label>
        Início
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          type="datetime-local"
          value={form.startsAt}
          onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
        />
      </label>
      <label>
        Fim
        <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          type="datetime-local"
          value={form.endsAt}
          onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
        />
      </label>
      <button disabled={!roomId || isSubmitting}>
        {isSubmitting ? "Criando..." : "Criar reserva"}
      </button>
      {feedback && (
        <div
          className={`mt-4 rounded-lg border px-4 py-3 text-sm font-medium ${
            feedback.type === "success"
              ? "border-green-300 bg-green-100 text-green-700"
              : "border-red-300 bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
}
