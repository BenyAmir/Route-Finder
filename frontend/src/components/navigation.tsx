import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/store/auth";
import { useSetTheme, useTheme } from "@/store/theme";
import { Link, useNavigate } from "@tanstack/react-router";

import { LogOut , FileUp, Ship, Search} from "lucide-react";

export function NavigationComponent() {
  const logOut = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const theme = useTheme();
  const setTheme = useSetTheme();

  const handleLogOut = () => {
    logOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex flex-col flex-1 p-4 space-y-6">
      <div className="grow">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          General
        </h3>
        <nav className="space-y-1">
              <Link
                to="/departures"
                key='Departures'
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
                activeProps={{
                  className: "bg-gray-100 text-gray-900",
                }}
                inactiveProps={{
                  className: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                }}
              >
                <span className="mr-3"><Ship /></span>
                Departures
              </Link>
              <Link
                to="/find-route"
                key='find-route'
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
                activeProps={{
                  className: "bg-gray-100 text-gray-900",
                }}
                inactiveProps={{
                  className: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                }}
              >
                <span className="mr-3"><Search /></span>
                Find Route
              </Link>
        </nav>
      </div>
      <div className="mt-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Configuration
        </h3>
        <nav className="space-y-1">
              <Link
                to="/upload-csv"
                key='CSVUpload'
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
                activeProps={{
                  className: "bg-gray-100 text-gray-900",
                }}
                inactiveProps={{
                  className: "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                }}
              >
                <span className="mr-3"><FileUp /></span>
                CSV File Upload
              </Link>
        </nav>
      </div>
      </div>

      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="grow flex items-center border-r border-gray-200">
            <span className="text-xs">🌞</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked: boolean) => {
                setTheme(checked ? "dark" : "light");
              }}
            />
            <span className="text-xs">🌙</span>
          </div>
          <div>
            <Button
              className="flex items-center  px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              variant="ghost"
              onClick={() => handleLogOut()}
            >
              <LogOut />
              <span className="ms-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
