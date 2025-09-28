import { Link, useLocation } from "react-router";
import {
  MenuIcon,
  NavRail,
  NavRailFab,
  NavRailItem,
  NavRailLink,
  NavRailList,
  NavRailMenu,
  NavRailPanel,
  NavRailTrigger,
} from "~/components/ui/nav-rail";
import { EditIcon, StarsIcon } from "~/icons";

export default function NavRailDemo() {
  const { hash } = useLocation();

  function isActive(value?: string) {
    return hash === value ? "active" : "";
  }

  return (
    <div>
      <div className="flex gap-[16px]">
        <div>
          <NavRail modal>
            <NavRailTrigger>
              <MenuIcon />
            </NavRailTrigger>
            <NavRailPanel>
              <NavRailMenu></NavRailMenu>
              <NavRailFab icon={<EditIcon />} label="Edit"></NavRailFab>
              <NavRailList>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label1" className={isActive("#label1")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label2" className={isActive("#label2")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label3" className={isActive("#label3")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
              </NavRailList>
            </NavRailPanel>
          </NavRail>
        </div>
        <div>
          <NavRail>
            <NavRailPanel>
              <NavRailMenu></NavRailMenu>
              <NavRailFab icon={<EditIcon />} label="Edit"></NavRailFab>
              <NavRailList>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label1" className={isActive("#label1")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label2" className={isActive("#label2")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
                <NavRailItem>
                  <NavRailLink
                    icon={<StarsIcon />}
                    render={
                      <Link to="#label3" className={isActive("#label3")} />
                    }
                  >
                    Label
                  </NavRailLink>
                </NavRailItem>
              </NavRailList>
            </NavRailPanel>
          </NavRail>
        </div>
      </div>
    </div>
  );
}
