import api from "./api";

/* EVENTS */

export const getEvents = async (params?: any) => {
  const res = await api.get("/events", { params });
  return res.data.events;
};

export const getEventsByCategory = async (category: string) => {
  const res = await api.get("/events", {
    params: { category },
  });
  return res.data.events;
};

export const getEventById = async (id: string) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

/* SLIDERS */

export const getSliders = async () => {
  const res = await api.get("/sliders");
  return res.data.data;
};