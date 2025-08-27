import { findRoutesApi } from "@/api/findRoutes";
import { DateTimePicker } from "@/components/date-time-picker";
import { LocationSelector } from "@/components/location-selector";
import { RoutesTable } from "@/components/routes-table";
import { columns as routesColumns } from "@/components/routes-table/columns";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useFilters } from "@/hooks/useFilters";
import { useToken } from "@/store/auth";
import type { RouteResponse } from "@/types/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoaderCircle, PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  from: z.string().min(1, "Username is required"),
  to: z.string().min(1, "Username is required"),
  startTime: z.date(),
  endTime: z.date(),
});

export type FindRouteSearchParams = z.infer<typeof formSchema>;

export const Route = createFileRoute("/_layout/find-route")({
  component: FindRoutePage,
  validateSearch: () => ({}) as FindRouteSearchParams,
});

function FindRoutePage() {
  const token = useToken();

  const { filters, resetFilters, setFilters } = useFilters(Route.id);

  const { data, isError, error, isPending, isLoading } = useQuery<RouteResponse>({
    queryKey: ["find-route", filters],
    queryFn: () => findRoutesApi(token, filters as any),
    enabled: !!token && Object.keys(filters).length > 0,
  });

  const form = useForm<FindRouteSearchParams>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="grid gap-6">
      <div className="p-8 bg-card rounded-lg border border-border sticky -inset-y-8 z-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => setFilters(data))}
            className="space-y-4 w-[70vw]"
          >
            <div className="flex items-center gap-8 w-[70vw] flex-wrap">
              <div className="flex items-end py-4 gap-3">
                <Label className="text-sm font-medium text-muted-foreground">
                  <PlaneTakeoffIcon className="inline mr-2" />
                </Label>
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Location</FormLabel>
                      <LocationSelector
                        placeholder="Departure Location"
                        onChange={field.onChange}
                        value={field.value || filters.from}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Time</FormLabel>
                      <DateTimePicker
                        value={field.value || filters.startTime}
                        form={form}
                        controlName="startTime"
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-end py-4 gap-3">
                <Label className="text-sm font-medium text-muted-foreground">
                  <PlaneLandingIcon className="inline mr-2" />
                </Label>
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Location</FormLabel>
                      <LocationSelector
                        placeholder="Departure Location"
                        onChange={field.onChange}
                        value={field.value || filters.to}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Time</FormLabel>
                      <DateTimePicker
                        value={field.value || filters.endTime}
                        form={form}
                        controlName="endTime"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" variant="default" className="mt-2">
                <span className="text-sm font-medium">Search</span>
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {(data || isError || isLoading) && (
        <div className="p-8 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Available Routes</h1>
          </div>
          {isError && (
            <div className="text-destructive text-sm">{error.message}</div>
          )}


          <RoutesTable
            data={data?.data || { routes: [] }}
            columns={routesColumns}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
