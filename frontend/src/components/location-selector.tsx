import { getLocationsApi } from "@/api/getLocations";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToken } from "@/store/auth";
import type { SuccessResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import type { FieldError } from "react-hook-form";

export function LocationSelector({
  placeholder = "Select Location",
  onChange,
  value,
  formError,
}: {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  formError?: FieldError;
}) {
  const token = useToken();
  const { data, isPending, isError, error } = useQuery<
    SuccessResponse<string[]>
  >({
    queryKey: ["locations"],
    queryFn: () => getLocationsApi(token),
  });

  const locations = data?.data.sort() || [];

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger className="w-[180px]">
        {isPending ? (
          <div className="flex items-center">
            <LoaderCircle
              size={16}
              className="animate-spin cursor-pointer text-red-500 hover:text-red-700 text-sm"
            />
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
        
      </SelectTrigger>
      </FormControl>
      <SelectContent>
        {locations.map((location) => (
          <SelectItem value={location}>{location}</SelectItem>
        ))}
        {isError && (
          <div className="text-destructive text-sm">{error.message}</div>
        )}
        {formError && (
          <div className="text-destructive text-sm">{formError.message}</div>
        )}
      </SelectContent>
    </Select>
  );
}
