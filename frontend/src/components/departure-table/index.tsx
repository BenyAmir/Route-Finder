import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Departure, DeparturesWithPagination } from "@/types/departures";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

interface DeparturesTableProps<TData> {
  columns: ColumnDef<Departure>[];
  data: TData;
  paginationState: {
    pageIndex: number;
    pageSize: number;
  };
  setPaginationState: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}

export function DeparturesTable({
  columns,
  data,
  paginationState,
  setPaginationState,
}: DeparturesTableProps<DeparturesWithPagination<Departure>>) {
  const { departures, pagination } = data;

  const table = useReactTable<Departure>({
    data: departures,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: pagination?.total || 20,
    manualPagination: true,
    onPaginationChange: setPaginationState,
    state: {
      pagination: paginationState,
    },
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
                    <TableHead key={header.id}>
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
