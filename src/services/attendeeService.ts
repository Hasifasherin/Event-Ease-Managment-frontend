import api from "./api";

export const getOrganizerEvents = async () => {
  const res = await api.get("/events/organizer/my-events");
  return res.data;
};

export const getEventAttendees = async (eventId: string) => {
  const res = await api.get(`/attendees/event/${eventId}`);
  return res.data;
};

export const checkInAttendee = async (id: string) => {
  const res = await api.put(`/attendees/checkin/${id}`);
  return res.data;
};