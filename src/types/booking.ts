import { Room } from "./room";

export interface Booking {
  id: string;
  roomId: string;
  title: string;
  participants: number;
  startsAt: string;
  endsAt: string;
  room: Room;
}

export interface BookingFormData {
  title: string;
  participants: number;
  startsAt: string;
  endsAt: string;
}