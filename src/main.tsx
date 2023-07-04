import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CatDetail } from "./pages/cats/CatDetail.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Cats from "./pages/cats/Cats.tsx";
import { ErrorPage } from "./common/components/ErrorPage.tsx";
import "./common/styles/App.css";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Cats />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/cats/:id",
    element: <CatDetail />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
