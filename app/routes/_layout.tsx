import { NavLink, Outlet } from "react-router";
import { Button } from "~/components/ui/button";
import { routes } from "~/routes";

export function capitalize(id: string) {
  const tokens = id.split("-");
  return tokens
    .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
    .join(" ");
}

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex shrink-0 flex-col gap-1 p-4">
        {routes.map((route) => (
          <Button
            key={route}
            size="xs"
            nativeButton={false}
            render={<NavLink to={route} />}
          >
            {capitalize(route)}
          </Button>
        ))}
      </div>
      <main className="w-full p-4">
        <Outlet />
      </main>
    </div>
  );
}
