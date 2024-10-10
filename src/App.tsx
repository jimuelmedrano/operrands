import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import { Toaster } from "./components/ui/sonner";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div className="h-dvh">
      <TopBar />
      <div className="flex h-full">
        <SideBar />
        <main className="w-full h-fit md:h-[85%] md:ml-12 md:pl-5">
          <Routes>
            <Route index element={<HomePage />} />
            {/* change these routes to /errands/pagename when landing page and login pages are available*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default App;
