import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Home, Crypto, Trending, Saved, ErrorPage } from "./pages/";
import CryptoDetails from "./components/CryptoDetails.jsx";
import { ErrorBoundary } from "react-error-boundary";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <Outlet />
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Crypto />,
            children: [
              {
                path: ":coinId",
                element: <CryptoDetails />,
              },
            ],
          },
          {
            path: "/trending",
            element: <Trending />,
            children: [
              {
                path: ":coinId",
                element: <CryptoDetails />,
              },
            ],
          },
          {
            path: "/saved",
            element: <Saved />,
            children: [
              {
                path: ":coinId",
                element: <CryptoDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, info) => {
        console.log("An error occurred!");
        console.log(error);
        console.log(info);
      }}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
