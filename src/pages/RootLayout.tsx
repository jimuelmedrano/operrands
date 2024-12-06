import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div id="appbody" className="h-dvh">
      <Outlet />
    </div>
  );
};

export default RootLayout;
