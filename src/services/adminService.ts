import api from "./api";

/* ================= DASHBOARD ================= */

export const getAdminDashboard = async () => {
  try {
    const response = await api.get("/admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("Dashboard API Error ", error);
    throw error;
  }
};
/* ================= USERS ================= */

export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

/* BLOCK / UNBLOCK USER */
export const blockUser = async (id: string) => {
  const response = await api.patch(`/admin/users/${id}/block`);
  return response.data;
};

/* DELETE USER */
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

/* ================= ORGANIZERS ================= */

export const getAllOrganizers = async () => {
  const response = await api.get("/admin/organizers");
  return response.data;
};

/* ================= EVENTS ================= */

export const getAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

/* ================= BOOKINGS ================= */

// ✅ Get all bookings (admin route)
export const getAllBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

// ✅ Get single booking (modal details)
export const getBookingById = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// ✅ Delete booking (admin)
export const deleteBooking = async (id: string) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

/* ================= PAYMENTS ================= */

// Get All Payments (Admin)
export const getAllPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

// Get Revenue (Admin)
export const getRevenueStats = async () => {
  const response = await api.get("/payments/revenue");
  return response.data;
};

/* ================= NOTIFICATIONS ================= */

// Get All Notifications (Admin)
export const getAllNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

/* Send Broadcast Notification (Admin Only) */
export const sendNotification = async (data: {
  message: string;
  role?: string;
}) => {
  const response = await api.post("/notifications/broadcast", data);
  return response.data;
};

// Delete Notification (Admin)
export const deleteNotification = async (id: string) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
/* ================= SLIDERS ================= */

// ✅ Get Active Sliders (Public)
export const getSliders = async () => {
  const response = await api.get("/sliders");
  return response.data;
};

// ✅ Get All Sliders (Admin)
export const getAllSliders = async () => {
  const response = await api.get("/sliders/all");
  return response.data;
};

// ✅ Create Slider (Admin)
export const createSlider = async (
  formData: FormData,
  onUploadProgress?: (percent: number) => void
) => {
  const response = await api.post("/sliders", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: any) => {
      if (onUploadProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percent);
      }
    },
  });

  return response.data;
};

// ✅ Update Slider (Admin)
export const updateSlider = async (id: string, formData: FormData) => {
  const response = await api.put(`/sliders/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ✅ Delete Slider (Admin)
export const deleteSlider = async (id: string) => {
  const response = await api.delete(`/sliders/${id}`);
  return response.data;
};