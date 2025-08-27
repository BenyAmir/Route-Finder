import { NavigationComponent } from '@/components/navigation';

import { useAuthStore } from '@/store/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Toaster } from 'sonner';


export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  beforeLoad: () => {
    console.log('Checking authentication status...');
    const isAuthenticated = !!useAuthStore.getState().token
    if (!isAuthenticated) {
      throw redirect({to: '/login'});
    }
  }
});

function LayoutComponent() {
  const userName = useAuthStore((state) => state.name);
  return (
    <div className="flex min-h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-58 bg-card border-r border-border flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-card rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Departures Panel</h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent/>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Admin Panel</span>
              <span>/</span>
              <span className="text-foreground font-medium">Departures</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{userName.slice(0,2)}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-muted overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full grid justify-center">
            
              <Outlet />

          </div>
        </main>
        <Toaster/>
      </div>
    </div>
  );
}
