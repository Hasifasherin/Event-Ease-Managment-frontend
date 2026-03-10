// src/services/authService.ts
import api from "./api";
import { User } from "@/types/user";

// Signup data type
export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: "user" | "organizer";
  age?: number;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  phoneNumber?: string;
  username?: string;
}

// LOGIN
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });

  const { user, token } = response.data;

  // Store token safely
  localStorage.setItem(
    "user",
    JSON.stringify({ ...user, token })
  );

  return response.data;
};

// SIGNUP
export const signupUser = async (signupData: SignupData) => {
  const response = await api.post("/auth/signup", signupData);
  return response.data;
};