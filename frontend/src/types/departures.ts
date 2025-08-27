import type { PaginationParams, SuccessResponse } from "@/types/api";

export type DepartureStatus = "CANCELLED" | "CLOSED" | "OPEN";
export type DepartureMode = "TRAIN" | "SHIP";
export type Departure = {
  departureCode: string;
  arrivalCode: string;
  depTime: string;
  arrTime: string;
  deadline: string;
  pickup: string;
  status: DepartureStatus;
  releaseTime: string;
  mode: DepartureMode;
  id: number;
  duration: number;
};

export interface DeparturesWithPagination<T> extends Partial<PaginationParams> {
  departures: T[];
}

export type DepartureResponse = SuccessResponse<DeparturesWithPagination<Departure>>;