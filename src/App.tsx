import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AppPage from "./pages/AppPage";
import HomePage from "./pages/AppPages/HomePage";
import SearchPage from "./pages/AppPages/SearchPage";
import CategoriesPage from "./pages/AppPages/CategoriesPage";
import ProfilePage from "./pages/AppPages/ProfilePage";
import AuthRoute from "./pages/AuthRoute";

import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassPage from "./pages/ForgotPassPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <AuthRoute>
              <SignInPage />
            </AuthRoute>
          }
        />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgotpass" element={<ForgotPassPage />} />
        <Route
          path="app"
          element={
            <AuthRoute>
              <AppPage />
            </AuthRoute>
          }
        >
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
