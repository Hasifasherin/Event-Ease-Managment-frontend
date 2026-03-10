import api from "./api";

/* ================= ORGANIZER PAYMENTS ================= */
export const getOrganizerPayments = async () => {
  const res = await api.get("/payments/organizer");
  return res.data;
};

/* ================= USER PAYMENTS ================= */
export const getMyPayments = async () => {
  const res = await api.get("/payments/my-payments");
  return res.data;
};

/* ================= ADMIN PAYMENTS ================= */
export const getAllPayments = async () => {
  const res = await api.get("/payments");
  return res.data;
};

/* ================= GET TOTAL REVENUE ================= */
export const getTotalRevenue = async () => {
  const res = await api.get("/payments/revenue");
  return res.data;
};


export const makePayment = async (data: {
  bookingId: string;
  paymentMethod: string;
}) => {
  const res = await api.post("/payments", data);
  return res.data;
};

