export interface User {
  _id: string
  name: string
  email: string
  role?: "user" | "organizer" | "admin"
  token: string
}