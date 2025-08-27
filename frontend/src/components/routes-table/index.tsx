import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RouteDetail, Routes } from "@/types/routes";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { TrainFront, Ship, LoaderCircle } from "lucide-react";

interface RoutesTableProps<TData> {
  columns: ColumnDef<RouteDetail>[];
  data: TData;
  isLoading: boolean;
}

export function RoutesTable({
  columns,
  data,
  isLoading,
}: RoutesTableProps<Routes>) {
  const { routes } = data;
  const table = useReactTable<RouteDetail>({
    data: routes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} align="center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Collapsible style={{ display: "contents" }}>
                  <CollapsibleTrigger style={{ display: "contents" }}>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} align="center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </CollapsibleTrigger>
                  <CollapsibleContent style={{ display: "contents" }}>
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        {row.original.departures.length > 0 && (
                          <ul className="list-disc p-6 bg-muted flex flex-col gap-2">
                            {row.original.departures.map((dep, idx) => {
                              const hours = Math.floor(dep.duration / 60);
                              const minutes = dep.duration % 60;
                              return (
                                <li
                                  key={idx}
                                  className="flex gap-4 align-middle"
                                >
                                  <span>
                                    {dep.mode === "TRAIN" ? (
                                      <TrainFront />
                                    ) : (
                                      <Ship />
                                    )}
                                  </span>
                                  <span>{` From ${dep.departureCode} To ${dep.arrivalCode} last ${hours}h ${minutes}m`}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading ...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          First Page
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          Last Page
        </Button>
      </div>
    </div>
  );
}
