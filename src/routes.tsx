import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes";
import FavoriteMovies from "./components/movies/favorites";
import Watchlist from "./components/movies/watchlist";
import Home from "./components/home/homePage";

const Login = React.lazy(() => import("./components/auth/login"));
const Register = React.lazy(() => import("./components/auth/register"));
const AdminPage = React.lazy(() => import("./components/admin/adminPage"));
const TrailerPage = React.lazy(() => import("./components/movies/movieDetails/trailer"));

const publicRoutes = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/movies/trailer/:id", element: <TrailerPage /> },
];

const protectedRoutes = [
  { path: "/adminPage", element: <AdminPage /> },
  { path: "/movies/favorites", element: <FavoriteMovies /> },
  { path: "/movies/watchlist", element: <Watchlist /> },
];

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<p></p>}>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {protectedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
