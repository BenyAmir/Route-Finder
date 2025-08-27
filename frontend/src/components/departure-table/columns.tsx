
import type { Departure } from "@/types/departures";
import type { ColumnDef } from "@tanstack/react-table";
import { formatLocalTimeClean } from "@/lib/dateUtils";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    filterKey?: keyof TData;
  }
}

export const columns: ColumnDef<Departure>[] = [
  {
    accessorKey:"number",
    header: "#",
    cell: ({ row, table }) => {
      const {pageIndex,pageSize} = table.getState().pagination;
      const rowIndex = row.index + 1 + pageIndex * pageSize;
      return rowIndex;
    },
  },
  {
    accessorKey: "departureCode",
    header: "Departure",
    meta: { filterKey: "departureCode" },
  },
  {
    accessorKey: "arrivalCode",
    header: "Arrival",
    meta: { filterKey: "arrivalCode" },
  },
  {
    accessorKey: "depTime",
    header: "Departure Time",
    cell: ({ row }) => {
      const value = row.getValue("depTime") as string;
      return formatLocalTimeClean(value);
    },
  },
  {
    accessorKey: "arrTime",
    header: "Arrival Time",
    cell: ({ row }) => {
      const value = row.getValue("arrTime") as string;
      return formatLocalTimeClean(value);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className={`flex items-center justify-center py-1 px-2 ${status === 'Open' && 'bg-green-200'}  ${status === 'Cancelled' && 'bg-red-200'} ${status === 'Closed' && 'bg-gray-200'}`}>
          <span className={`text-sm font-medium text-gray-700 `}>
            {status}
            </span>
        </div>
      );
    },
  },
];
