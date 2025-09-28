import { Link, Outlet } from "react-router";
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
    <div className="flex min-h-screen">
      <div className="flex flex-col gap-[12px] p-[24px]">
        <button className="first-letter:uppercase" onClick={toggleTheme}>
          {theme === "dark" ? "light" : "dark"}
        </button>
        <Link to="button">Button</Link>
        <Link to="icon-button">Icon button</Link>
        <Link to="fab">FAB</Link>
        <Link to="checkbox">Checkbox</Link>
        <Link to="radio">Radio</Link>
        <Link to="nav-rail">Nav rail</Link>
      </div>
      <main className="p-[24px]">
        <Outlet />
      </main>
    </div>
  );
}
