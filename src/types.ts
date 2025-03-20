import { loginSchema } from "@/schemas/login";
import { z } from "zod";
import { signupSchema } from "@/schemas/signup";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type SignupFormData = z.infer<typeof signupSchema>;
export interface SignUpResponse extends AccessToken, RefreshToken, User {
  msg: string;
}
export interface AccessToken {
  access_token: string;
}
export interface RefreshToken {
  refresh_token: string;
}
export interface User {
  id: number;
  address: string;
  blocked: boolean;
  email: string;
  first_name: string;
  last_name: string;
  profile_desc: string;
  role: string;
  status: string;
}

export interface AuthData {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
}
export interface AuthState extends AuthData {
  setAuth: (authData: AuthData) => void;
  logout: () => void;
}
export type AppointmentStatus =
  | "up-coming"
  | "on-going"
  | "completed"
  | "canceled";

export type AppointmentData = {
  id: number;
  client_requirements: string;
  date_time: string; // ISO string for date
  doctor_id: number;
  status: AppointmentStatus;
  user_id: number;
};
