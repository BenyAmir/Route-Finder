import { ApiError } from "@/lib/utils";
import type { DepartureResponse } from "@/types/departures";

export async function getDeparturesApi(
  token: string | null,
  pagination: {
    pageIndex: number;
    pageSize: number;
  }
): Promise<DepartureResponse> {

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  const searchParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });
  
  const response = await fetch(`/api/data/departures?${searchParams}`, {
    headers: { authorization: `Bearer ${token}` || "" },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status === 401
        ? "An error occurred while fetching users."
        : `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response.statusText,
      result,
      response.headers
    );
  }

  return result;
}
