import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

const AppPage = () => {
  return (
    <div>
      <TopBar />
      <div className="flex h-dvh">
        <SideBar />
        <main className="w-full h-fit md:h-[85%] md:ml-12 md:pl-5">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default AppPage;
