import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useState } from "react";

const SideBar = () => {
  const currentRoute = useLocation();
  const [toggle, setToggle] = useState(currentRoute.pathname);

  const homePath = "/";
  const searchPath = "/search";
  const categoriesPath = "/categories";
  const profilePath = "/profile";

  return (
    <div className="sidebar-style">
      <div onClick={() => setToggle(homePath)}>
        <SidebarItem
          src={homePath}
          icon="House"
          {...(toggle === homePath ? { active: true } : {})}
        />
      </div>

      <div onClick={() => setToggle(searchPath)}>
        <SidebarItem
          src={searchPath}
          icon="Search"
          {...(toggle === searchPath ? { active: true } : {})}
        />
      </div>

      <div onClick={() => setToggle(categoriesPath)}>
        <SidebarItem
          src={categoriesPath}
          icon="Shapes"
          {...(toggle === categoriesPath ? { active: true } : {})}
        />
      </div>

      <div onClick={() => setToggle(profilePath)}>
        <SidebarItem
          src={profilePath}
          icon="CircleUser"
          {...(toggle === profilePath ? { active: true } : {})}
          profile
        />
      </div>
    </div>
  );
};

function SidebarItem({
  src,
  icon,
  active,
  profile,
}: {
  src: string;
  icon: any;
  active?: boolean;
  profile?: boolean;
}) {
  return (
    <NavLink to={src}>
      <div
        className={
          "group p-2 rounded-md " +
          (active
            ? "bg-primary hover:bg-primary dark:hover:bg-primaryDark "
            : "hover:bg-accent ") +
          (profile ? "md:fixed md:bottom-0 md:mb-8" : "")
        }
      >
        <Icon
          name={icon}
          className={active ? "text-primary-foreground" : "text-foreground"}
        />
      </div>
    </NavLink>
  );
}

export default SideBar;
