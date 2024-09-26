import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import { useState } from "react";

const SideBar = () => {
  const [toggle, setToggle] = useState(1);

  function updateToggle(id: number) {
    setToggle(id);
  }

  return (
    <div className="sidebar-style">
      <div onClick={() => updateToggle(1)}>
        <SidebarItem
          src="/"
          icon="House"
          {...(toggle === 1 ? { active: true } : {})}
        />
      </div>

      <div onClick={() => updateToggle(2)}>
        <SidebarItem
          src="/search"
          icon="Search"
          {...(toggle === 2 ? { active: true } : {})}
        />
      </div>

      <div onClick={() => updateToggle(3)}>
        <SidebarItem
          src="/categories"
          icon="Shapes"
          {...(toggle === 3 ? { active: true } : {})}
        />
      </div>

      <div onClick={() => updateToggle(4)}>
        <SidebarItem
          src="/profile"
          icon="CircleUser"
          {...(toggle === 4 ? { active: true } : {})}
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
          "group p-2 rounded-md" +
          (active
            ? " bg-primaryDark dark:bg-primary hover:bg-primaryDark dark:hover:bg-primary"
            : " hover:bg-secondary dark:hover:bg-secondaryDark") +
          (profile ? " md:fixed md:bottom-0 md:mb-8" : "")
        }
      >
        <Icon name={icon} className="icon-style" />
      </div>
    </NavLink>
  );
}

export default SideBar;
