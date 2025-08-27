import type { LoginResponse } from "@/types/auth";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (data: LoginResponse) => void;
  logout: () => void;
  name: string;
  role: "admin" | "user";
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  setToken: (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.username);
    set({ token: data.token, name: data.user.username, role: data.user.role ?? "user" });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    set({ token: null, name: "" })
  },
  name: localStorage.getItem("userName") || "",
  role: "user"
}));


export const useToken = () => useAuthStore((state) => state.token);

export const useIsAdmin = () => useAuthStore((state) => state.role === "admin");
