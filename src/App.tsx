import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div className="h-dvh">
      <TopBar />
      <div className="flex">
        <SideBar />
        <main className="w-full h-screen md:ml-12 pt-5 md:pl-5">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
