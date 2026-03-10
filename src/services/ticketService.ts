import api from "./api";

/* ================= CREATE TICKET ================= */
export const createTicket = async (data: any) => {
  const res = await api.post("/tickets", data);
  return res.data;
};

/* ================= GET TICKETS BY EVENT ================= */
export const getTicketsByEvent = async (eventId: string) => {
  const res = await api.get(`/tickets/event/${eventId}`);
  return res.data;
};

/* ================= UPDATE TICKET ================= */
export const updateTicket = async (id: string, data: any) => {
  const res = await api.put(`/tickets/${id}`, data);
  return res.data;
};

/* ================= DELETE TICKET ================= */
export const deleteTicket = async (id: string) => {
  const res = await api.delete(`/tickets/${id}`);
  return res.data;
};

export const getTicket = async (id: string) => {
  const res = await api.get(`/tickets/${id}`);
  return res.data;
};