import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/cats/helpers/ErrorPage.tsx";
import { CatDetail } from "./pages/cats/CatDetail.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Cats from "./pages/cats/Cats.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cats />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cats/:id",
    element: <CatDetail />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);