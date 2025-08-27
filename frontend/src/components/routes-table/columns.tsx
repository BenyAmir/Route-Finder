
import type { RouteDetail } from "@/types/routes";
import type { ColumnDef } from "@tanstack/react-table";
import { formatLocalTimeClean } from "@/lib/dateUtils";

export const columns: ColumnDef<RouteDetail>[] = [
  {
    accessorKey:"number",
    header: "#",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    id: "startLocation",
    header: "Departure",
    accessorFn: (row) => row.summary.startLocation,
  },
  {
    id: "endLocation",
    header: "Arrival",
    accessorFn: (row) => row.summary.endLocation,
  },
  {
    id: "startTime",
    header: "Departure Time",
    accessorFn: (row) => row.summary.startTime,
    cell: ({ row }) => {
      const value = row.getValue("startTime") as string;
      return formatLocalTimeClean(value);
    },
  },
  {
    id: "endTime",
    header: "Arrival Time",
    accessorFn: (row) => row.summary.endTime,
    cell: ({ row }) => {
      const value = row.getValue("endTime") as string;
      return formatLocalTimeClean(value);
    },
  },
  {
    id: "totalDuration",
    header: "Total Duration",
    accessorFn: (row) => row.summary.totalDuration,
    cell: ({ row }) => {
      const totalDuration = row.getValue("totalDuration") as number;
      if (typeof totalDuration !== "number") return "-";
      const hours = Math.floor(totalDuration / 60);
      const minutes = totalDuration % 60;
      return `${hours}h ${minutes}m`;
    }
  },
  {
    id: "connectionTime",
    header: "Total Connection Time",
    accessorFn: (row) => row.summary.connectionTime,
    cell: ({ row }) => {
      const connectionTime = row.getValue("connectionTime") as number;
      if (typeof connectionTime !== "number") return "-";
      const hours = Math.floor(connectionTime / 60);
      const minutes = connectionTime % 60;
      return `${hours}h ${minutes}m`;
    }
  },
  // {
  //   id: "modes",
  //   header: "Connection modes",
  //   accessorFn: (row) => row.summary.modes,
  //   cell: ({ row }) => {
  //     const modes = row.getValue("modes") as Array<string> ;
  //     return (
  //       <div className={`flex items-center justify-center  ${modes.includes('Train') && 'bg-yellow-300'} ${modes.includes('Ship') && 'bg-purple-300'}`}>
  //         <span className={`text-sm font-medium text-gray-700`}>
  //           {modes.map((mode) => (mode)).join(", ")}</span>
  //       </div>
  //     );
  //   },
  // }
];
