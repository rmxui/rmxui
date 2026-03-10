import { NavLink, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        <Button nativeButton={false} render={<NavLink to="buttons" />}>
          Buttons
        </Button>
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
