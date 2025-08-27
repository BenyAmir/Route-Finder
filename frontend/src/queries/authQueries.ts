import { login } from "@/api/login";
import { useAuthStore } from "@/store/auth";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type { SuccessResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useLogin() {
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  return useMutation<SuccessResponse<LoginResponse>, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: SuccessResponse<LoginResponse>) => {
      setToken(data.data);
      navigate({ to: "/upload-csv" });
    },
  });
}
