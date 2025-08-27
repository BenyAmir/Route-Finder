import { ApiError } from "@/lib/utils";
import type { FindRouteSearchParams } from "@/routes/_layout/find-route";
import type { RouteResponse } from "@/types/routes";

export async function findRoutesApi(token: string | null, params:FindRouteSearchParams) : Promise<RouteResponse> {
  const searchParams = new URLSearchParams(params as unknown as Record<string, string>);
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate network delay
  const response = await fetch(`/api/routes/find?${searchParams}`, {
    headers: { authorization: `Bearer ${token}` || "" },
  });

  const result = await response.json();
  
    if (!response.ok) {
      throw new ApiError(
        response.status === 401 ? 'An error occurred while fetching users.' : `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        result,
        response.headers
      );
    }
  
    return result;
}
