import { postData } from "@/lib/api/methods";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  role: string;
  username: string;
}

export const loginApi = (payload: LoginPayload) =>
  postData<LoginPayload, LoginResponse>("/accounts/login/", payload);
