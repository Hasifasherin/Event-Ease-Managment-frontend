import api from "./api";

export const getMyNotifications = async (page = 1) => {
  const res = await api.get(`/notifications?page=${page}`);
  return res.data;
};

export const markAsRead = async (id: string) => {
  return await api.put(`/notifications/${id}/read`);
};

export const markAllAsRead = async () => {
  return await api.put(`/notifications/mark-all/read`);
};

export const deleteNotification = async (id: string) => {
  return await api.delete(`/notifications/${id}`);
};

export const getUnreadCount = async () => {
  const res = await api.get(`/notifications/unread-count`);
  return res.data;
};