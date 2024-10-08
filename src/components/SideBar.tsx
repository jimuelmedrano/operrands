import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideBar = () => {
  const currentRoute = useLocation();
  const [toggle, setToggle] = useState(currentRoute.pathname);

  const homePath = "/";
  const searchPath = "/search";
  const categoriesPath = "/categories";
  const profilePath = "/profile";

  return (
    <div className="w-full py-4 md:w-fit md:left-auto md:h-dvh gap-8 fixed bottom-0 md:top-0 flex-center md:flex-col md:no-transition z-10">
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

      <NavLink to={profilePath}>
        <Avatar
          className={
            "md:absolute md:bottom-0 md:left-0 md:mb-10 w-7 h-7 md:h-9 md:w-9 ring-4 hover:ring-accent " +
            (toggle === profilePath
              ? "ring-primary hover:ring-primary "
              : "ring-transparent")
          }
          onClick={() => setToggle(profilePath)}
        >
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </NavLink>
    </div>
  );
};

function SidebarItem({
  src,
  icon,
  active,
}: {
  src: string;
  icon: any;
  active?: boolean;
}) {
  return (
    <NavLink to={src}>
      <div
        className={
          "group p-2 rounded-md " +
          (active
            ? "bg-primary hover:bg-primary dark:hover:bg-primaryDark "
            : "hover:bg-accent ")
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
