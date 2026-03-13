import { NavLink, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex shrink-0 flex-col gap-1 p-4">
        <Button size="xs" nativeButton={false} render={<NavLink to="button" />}>
          Button
        </Button>
        <Button
          size="xs"
          nativeButton={false}
          render={<NavLink to="button-group" />}
        >
          Button Group
        </Button>
        <Button size="xs" nativeButton={false} render={<NavLink to="toggle" />}>
          Toggle
        </Button>
      </div>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
