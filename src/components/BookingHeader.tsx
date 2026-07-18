interface BookingHeaderProps {
  totalBookings: number;
  title?: string;
  subtitle?: string;
}

export default function BookingHeader({
  totalBookings,
  title = "Reserva de salas",
  subtitle = "Agenda centralizada, sem conflitos de horário.",
}: BookingHeaderProps) {
  return (
    <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-sm font-bold tracking-[.22em] text-orange-600">
          DIZEVOLV · CASE TÉCNICO
        </p>

        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="mt-2 text-slate-600">
          {subtitle}
        </p>
      </div>

      <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800">
        {totalBookings} reservas cadastradas
      </div>
    </header>
  );
}