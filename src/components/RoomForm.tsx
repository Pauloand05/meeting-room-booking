import type { Dispatch, FormEvent, SetStateAction } from "react";
import type { Feedback } from "@/types/feedback";

interface RoomFormData {
  name: string;
  capacity: number;
}

interface RoomFormProps {
  form: RoomFormData;
  setForm: Dispatch<SetStateAction<RoomFormData>>;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  feedback: Feedback | null;
  isSubmitting: boolean;
  isEditing: boolean;
  cancelEditing: () => void;
}

export default function RoomForm({
  form,
  setForm,
  submit,
  feedback,
  isSubmitting,
  isEditing,
  cancelEditing,
}: RoomFormProps) {
  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <h2 className="text-xl font-bold">Salas</h2>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Cadastre e gerencie as salas disponíveis.
      </p>

      <label>
        Nome
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          placeholder="Ex.: Sala Atlântico"
        />
      </label>

      <label>
        Capacidade
        <input
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          required
          min={1}
          type="number"
          value={form.capacity}
          onChange={(event) =>
            setForm({ ...form, capacity: Number(event.target.value) })
          }
        />
      </label>

      <button disabled={isSubmitting}>
        {isSubmitting
          ? isEditing
            ? "Salvando..."
            : "Criando..."
          : isEditing
          ? "Salvar alterações"
          : "Criar sala"}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={cancelEditing}
          className="mt-2 bg-slate-200 text-slate-700"
        >
          Cancelar edição
        </button>
      )}

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
