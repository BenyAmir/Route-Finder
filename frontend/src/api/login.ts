import { ApiError } from "@/lib/utils";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type { SuccessResponse } from "@/types/api";

export async function login(data: LoginRequest): Promise<SuccessResponse<LoginResponse>> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: data.username, password: data.password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status === 401 ? 'Invalid username or password' : `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response.statusText,
      result,
      response.headers
    );
  }

  return result;
}
