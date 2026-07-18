import type { Booking } from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
  now: Date;
}

export default function BookingCard({
  booking,
  now,
}: BookingCardProps) {
  const start = new Date(booking.startsAt);
  const end = new Date(booking.endsAt);

  const state =
    start <= now && end >= now
      ? "Em andamento"
      : start > now
      ? "Próxima"
      : "Encerrada";

  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex justify-between gap-3">
        <div>
          <h3 className="font-bold">{booking.title}</h3>

          <p className="text-sm text-slate-500">
            {booking.room.name} · {booking.participants} participantes
          </p>
        </div>

        <span className="h-fit rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">
          {state}
        </span>
      </div>

      <p className="mt-3 text-sm font-medium">
        {start.toLocaleString("pt-BR")} —{" "}
        {end.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </article>
  );
}