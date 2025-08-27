import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;
  headers: Headers;

  constructor(message: string, status: number, statusText: string, data: unknown, headers: Headers) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.headers = headers;

    this.validateToken();
  }

  validateToken() {
    if (this.status === 403 || this.status === 401) {
      localStorage.removeItem('token');
      // Optionally, you can also redirect the user to the login page
      window.location.href = '/login';
    }
  }
}