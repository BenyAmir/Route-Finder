import type { User } from "@/types/users";

export type LoginResponse = {
  token: string;
  user: User;
}

export type LoginRequest = {
    username: string,
    password: string
}