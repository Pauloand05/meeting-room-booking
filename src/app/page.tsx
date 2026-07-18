"use client";

// React
import { useCallback, useEffect, useMemo, useState } from "react";

// Components
import BookingForm from "@/components/BookingForm";
import BookingList from "@/components/BookingList";
import BookingHeader from "@/components/BookingHeader";

// Services
import { createBooking, getBookings } from "@/services/booking.service";
import { getRooms } from "@/services/room.service";

// Types
import type { Booking, BookingFormData } from "@/types/booking";
import type { Room } from "@/types/room";

// Utils
import { formatDateTimeLocal } from "@/utils/date";


export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const now = useMemo(() => new Date(), []);
  const [form, setForm] = useState<BookingFormData>({
    title: "",
    participants: 1,
    startsAt: formatDateTimeLocal(new Date(now.getTime() + 3600000)),
    endsAt: formatDateTimeLocal(new Date(now.getTime() + 7200000)),
  });

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const [roomsData, bookingsData] = await Promise.all([
        getRooms(),
        getBookings(),
      ]);

      setRooms(roomsData);

      if (!roomId && roomsData[0]) {
        setRoomId(roomsData[0].id);
      }

      setBookings(bookingsData);
    } catch (error) {
      console.error(error);
      setMessage("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    load();
  }, [load]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const submit = async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
    event.preventDefault();
    setMessage("");

    try {
      await createBooking({
        ...form,
        roomId,
        participants: Number(form.participants),
      });

      setMessage("Reserva criada com sucesso.");
      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível criar a reserva.",
      );
    }
  };
  const shown = roomId
    ? bookings.filter((booking) => booking.roomId === roomId)
    : bookings;
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <BookingHeader totalBookings={bookings.length} />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.4fr]">
          <BookingForm
            rooms={rooms}
            roomId={roomId}
            setRoomId={setRoomId}
            form={form}
            setForm={setForm}
            submit={submit}
            message={message}
          />

          <BookingList
          rooms={rooms}
          roomId={roomId}
          setRoomId={setRoomId}
          bookings={shown}
          loading={loading}
          now={now}
        />
        </div>
      </section>
    </main>
  );
}
