import { getDeparturesApi } from "@/api/getDepartures";
import { DeparturesTable } from "@/components/departure-table";
import { columns as departureColumns } from "@/components/departure-table/columns";
import { useToken } from "@/store/auth";
import type { DepartureResponse } from "@/types/departures";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_layout/departures")({
  component: DepartureListPage,
});

function DepartureListPage() {
  const token = useToken();
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isError, error } = useQuery<DepartureResponse>({
    queryKey: ["departures", paginationState],
    queryFn: () => getDeparturesApi(token, paginationState),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="grid gap-6">
      <div className="p-8 bg-card rounded-lg border border-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Departures</h1>
        </div>
        {isError && (
          <div className="text-destructive text-sm">{error.message}</div>
        )}
        <DeparturesTable
          columns={departureColumns}
          data={
            data?.data || {
              departures: [],
            }
          }
          paginationState={paginationState}
          setPaginationState={setPaginationState}
        />
      </div>
    </div>
  );
}
