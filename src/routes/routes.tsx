import { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "src/layout";

import FavoritePage from "src/pages/favorite";
import MoviePage from "src/pages/movie/movie";
import MovieDetails from "src/pages/movie/movieDetails";
import NotFoundPage from "src/pages/notfound";
import SignInPage from "src/pages/signin";

export const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </AppLayout>
    ),
    children: [
      { index: true, element: <MoviePage /> },
      { path: "/:movieId", element: <MovieDetails /> },
      { path: "/favorites", element: <FavoritePage /> },
    ],
  },
  {
    path: "login",
    element: <SignInPage />,
  },
  {
    path: "404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);
