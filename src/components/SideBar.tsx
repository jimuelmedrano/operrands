import { NavLink } from "react-router-dom";
import { House, Search, Shapes, CircleUser } from "lucide-react";

const SideBar = () => {
  return (
    <div className="sidebar-style">
      <NavLink to={"/"}>
        <House className="icon-style" />
      </NavLink>
      <NavLink to={"/search"}>
        <Search className="icon-style" />
      </NavLink>
      <NavLink to={"/categories"}>
        <Shapes className="icon-style" />
      </NavLink>

      <NavLink to={"/profile"} className="md:fixed md:bottom-0 md:mb-8">
        <CircleUser className="icon-style" />
      </NavLink>
    </div>
  );
};

export default SideBar;
