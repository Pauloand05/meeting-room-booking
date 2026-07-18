"use client";

// React
import { useCallback, useEffect, useMemo, useState } from "react";

// Components
import BookingForm from "@/components/BookingForm";
import BookingList from "@/components/BookingList";
import BookingHeader from "@/components/BookingHeader";

// Services
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "@/services/booking.service";
import { getRooms } from "@/services/room.service";

// Types
import type { Booking, BookingFormData } from "@/types/booking";
import type { Room } from "@/types/room";
import type { Feedback } from "@/types/feedback";

// Utils
import { formatDateTimeLocal } from "@/utils/date";

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const now = useMemo(() => new Date(), []);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
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
      setFeedback({
        type: "error",
        message: "Erro ao carregar os dados.",
      });
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    load();
  }, [load]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeedback(null);
    setIsSubmitting(true);

    const start = new Date(form.startsAt);
    const end = new Date(form.endsAt);

    if (end <= start) {
          setFeedback({
      type: "error",
      message: "O horário de término deve ser maior que o horário de início.",
    });

    setIsSubmitting(false);
    return;
  }

    try {
      const data = {
        ...form,
        roomId,
        participants: form.participants,
      };

      if (editingBooking) {
        await updateBooking(editingBooking.id, data);
      } else {
        await createBooking(data);
      }

      setFeedback({
        type: "success",
        message: editingBooking
          ? "Reserva atualizada com sucesso."
          : "Reserva criada com sucesso.",
      });

      await load();

      setEditingBooking(null);

      setForm({
        title: "",
        participants: 1,
        startsAt: formatDateTimeLocal(new Date(Date.now() + 3600000)),
        endsAt: formatDateTimeLocal(new Date(Date.now() + 7200000)),
      });
    } catch (error) {
      setFeedback({
      type: "error",
      message:
        error instanceof Error
          ? error.message
          : "Não foi possível criar a reserva.",
    });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (booking: Booking) => {
    setEditingBooking(booking);
    setRoomId(booking.roomId);
    setForm({
      title: booking.title,
      participants: booking.participants,
      startsAt: formatDateTimeLocal(new Date(booking.startsAt)),
      endsAt: formatDateTimeLocal(new Date(booking.endsAt)),
    });
    setFeedback(null);
  };

  const cancelEditing = () => {
    setEditingBooking(null);
    setForm({
      title: "",
      participants: 1,
      startsAt: formatDateTimeLocal(new Date(Date.now() + 3600000)),
      endsAt: formatDateTimeLocal(new Date(Date.now() + 7200000)),
    });
    setFeedback(null);
  };

  const removeBooking = async (booking: Booking) => {
    if (!window.confirm(`Deseja excluir a reserva \"${booking.title}\"?`)) {
      return;
    }

    setFeedback(null);
    setIsSubmitting(true);

    try {
      await deleteBooking(booking.id);

      if (editingBooking?.id === booking.id) {
        cancelEditing();
      }

      setFeedback({
        type: "success",
        message: "Reserva excluída com sucesso.",
      });

      await load();
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir a reserva.",
      });
    } finally {
      setIsSubmitting(false);
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
            feedback={feedback}
            isSubmitting={isSubmitting}
            isEditing={Boolean(editingBooking)}
            cancelEditing={cancelEditing}
          />

          <BookingList
            rooms={rooms}
            roomId={roomId}
            setRoomId={setRoomId}
            bookings={shown}
            loading={loading}
            now={now}
            onEdit={startEditing}
            onDelete={removeBooking}
          />
        </div>
      </section>
    </main>
  );
}
