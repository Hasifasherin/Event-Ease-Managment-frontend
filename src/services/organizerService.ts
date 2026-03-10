import api from "./api";

export const getOrganizerDashboard = async () => {
  try {
    const res = await api.get("/organizer/dashboard");
    return res.data;
  } catch (error: any) {
    console.error(
      "Organizer Dashboard API Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};