import { getRouteApi, useNavigate, type RegisteredRouter, type RouteIds } from "@tanstack/react-router";

export function useFilters<T extends RouteIds<RegisteredRouter["routeTree"]>>(
    routeId: T
){
    const routeApi = getRouteApi(routeId);
    const navigate = useNavigate();
    const filters = routeApi.useSearch();

    const setFilters = (partialFilters: Partial<typeof filters>) => {
        navigate({
            search: (prev:any) => ({ ...prev, ...partialFilters }),
        } as any);
    };

    const resetFilters = () => navigate({ search: true });

    return { filters, setFilters, resetFilters };
}