"use client";

// React
import { useCallback, useEffect, useMemo, useState } from "react";

// Components
import BookingForm from "@/components/BookingForm";
import BookingList from "@/components/BookingList";
import BookingHeader from "@/components/BookingHeader";
import RoomForm from "@/components/RoomForm";
import RoomList from "@/components/RoomList";

// Services
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "@/services/booking.service";
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from "@/services/room.service";

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
  const [filterRoomId, setFilterRoomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const now = useMemo(() => new Date(), []);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [roomFeedback, setRoomFeedback] = useState<Feedback | null>(null);
  const [isRoomSubmitting, setIsRoomSubmitting] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState({
    name: "",
    capacity: 1,
  });
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
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: new Date(form.endsAt).toISOString(),
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

  const submitRoom = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setRoomFeedback(null);
    setIsRoomSubmitting(true);

    try {
      if (editingRoom) {
        await updateRoom(editingRoom.id, roomForm);
      } else {
        await createRoom(roomForm);
      }

      setRoomFeedback({
        type: "success",
        message: editingRoom
          ? "Sala atualizada com sucesso."
          : "Sala criada com sucesso.",
      });

      await load();

      setEditingRoom(null);
      setRoomForm({
        name: "",
        capacity: 1,
      });
    } catch (error) {
      setRoomFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a sala.",
      });
    } finally {
      setIsRoomSubmitting(false);
    }
  };

  const startEditingRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      name: room.name,
      capacity: room.capacity,
    });
    setRoomFeedback(null);
  };

  const cancelEditingRoom = () => {
    setEditingRoom(null);
    setRoomForm({
      name: "",
      capacity: 1,
    });
    setRoomFeedback(null);
  };

  const removeRoom = async (room: Room) => {
    if (!window.confirm(`Deseja excluir a sala \"${room.name}\"?`)) {
      return;
    }

    setRoomFeedback(null);
    setIsRoomSubmitting(true);

    try {
      await deleteRoom(room.id);

      if (editingRoom?.id === room.id) {
        cancelEditingRoom();
      }

      if (roomId === room.id) {
        setRoomId("");
      }

      if (filterRoomId === room.id) {
        setFilterRoomId("");
      }

      setRoomFeedback({
        type: "success",
        message: "Sala excluída com sucesso.",
      });

      await load();
    } catch (error) {
      setRoomFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível excluir a sala.",
      });
    } finally {
      setIsRoomSubmitting(false);
    }
  };

  const shown = filterRoomId
    ? bookings.filter((booking) => booking.roomId === filterRoomId)
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
            filterRoomId={filterRoomId}
            setFilterRoomId={setFilterRoomId}
            bookings={shown}
            loading={loading}
            now={now}
            onEdit={startEditing}
            onDelete={removeBooking}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.4fr]">
          <RoomForm
            form={roomForm}
            setForm={setRoomForm}
            submit={submitRoom}
            feedback={roomFeedback}
            isSubmitting={isRoomSubmitting}
            isEditing={Boolean(editingRoom)}
            cancelEditing={cancelEditingRoom}
          />

          <RoomList
            rooms={rooms}
            loading={loading}
            onEdit={startEditingRoom}
            onDelete={removeRoom}
          />
        </div>
      </section>
    </main>
  );
}
