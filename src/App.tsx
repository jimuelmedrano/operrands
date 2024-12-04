import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import HomePage from "./pages/AppPages/HomePage";
import SearchPage from "./pages/AppPages/SearchPage";
import CategoriesPage from "./pages/AppPages/CategoriesPage";
import ProfilePage from "./pages/AppPages/ProfilePage";

import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="app" element={<AppPage />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
