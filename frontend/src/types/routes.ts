import type { SuccessResponse } from "@/types/api";
import type { Departure, DepartureMode } from "@/types/departures";

export interface routesParams {
  from: string;
  to: string;
  startTime: string;
  endTime: string;
}

interface RouteResponseSummary {
  connectionTime: number;
  endLocation: string;
  endTime: string;
  startLocation: string;
  startTime: string;
  totalDuration: number;
  numberOfSegments: number;
  modes: DepartureMode[];
}

export interface RouteDetail {
  departures: Departure[];
  summary: RouteResponseSummary;
}

export type Routes = {
  routes: RouteDetail[];
};

export type RouteResponse  = SuccessResponse<Routes>;
