import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-card rounded-lg shadow p-8">
      <div>You should first Login to the dashboard</div>
      <p>the Username is "Admin" and the Password is "Admin123"</p>
      <Button>
        <Link to="/login">Go to Login Page</Link>
      </Button>
    </div>
  );
}

