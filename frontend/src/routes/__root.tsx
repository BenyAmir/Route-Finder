import { createRootRoute, Outlet } from '@tanstack/react-router';


export const Route = createRootRoute({
  component: () => <div className='grid place-content-center h-screen'><Outlet /></div>,
});
