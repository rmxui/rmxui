import { Outlet } from "react-router";
import { useTheme } from "~/components/theme-provider";

export default function Layout() {
  const { theme, setTheme } = useTheme();
  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
  return (
    <main className="flex gap-[24px] min-h-screen">
      <div className="flex-col">
        <button className="cursor-pointer" onClick={toggleTheme}>
          {theme === "dark" ? "light" : "dark"}
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
