import api from "./api";

/* Organizer: Get bookings for their events */
export const getOrganizerBookings = async () => {
  try {
    const res = await api.get("/bookings/organizer");
    return res.data;
  } catch (err) {
    console.error("Error fetching organizer bookings:", err);
    throw err;
  }
};

/* Create booking */
export const createBooking = async (data: {
  ticketId: string;
  quantity: number;
  attendees: {
    name: string;
    email: string;
    phone: string;
  }[];
}): Promise<{ _id: string }> => {
  try {
    const res = await api.post("/bookings", data);

    // Handle multiple backend response formats
    const booking = res.data?.data || res.data?.booking || res.data;

    if (!booking?._id) {
      throw new Error("Booking creation failed: no booking ID returned");
    }

    return booking;
  } catch (err: any) {
    console.error("Error creating booking:", err);
    throw err;
  }
};

/* User: Get my bookings */
export const getMyBookings = async () => {
  try {
    const res = await api.get("/bookings/my-bookings");
    return res.data;
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    throw err;
  }
};

/* Cancel a booking */
export const cancelBooking = async (id: string) => {
  try {
    const res = await api.put(`/bookings/${id}/cancel`);
    return res.data;
  } catch (err) {
    console.error("Error cancelling booking:", err);
    throw err;
  }
};

/* Get single booking by ID */
export const getBookingById = async (bookingId: string) => {
  try {
    const res = await api.get(`/bookings/${bookingId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching booking:", err);
    throw err;
  }
};