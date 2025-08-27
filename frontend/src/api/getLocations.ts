import { ApiError } from "@/lib/utils";
import type { SuccessResponse } from "@/types/api";

export async function getLocationsApi(token: string | null) : Promise<SuccessResponse<string[]>> {
  const response = await fetch("/api/data/locations", {
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
