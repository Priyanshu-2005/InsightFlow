import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PdfUpload from "../src/component/PdfUpload";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ErrorPage from "./pages/errorpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountVerification from "./pages/verification";
import AccountVerified from "./pages/AccountVerified";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter(
    [
      {
        // element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/verified",
            element: <AccountVerified />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/verification",
            element: <AccountVerification />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/signup",
            element: <SignUpPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/",
            element: <LoginPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/app",
            element: <PdfUpload />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
    {
      basename: "/InsightFlow",
    }
  );

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:from-purple-600 hover:to-blue-500 transition-all duration-300 tracking-tight mb-6 px-4 py-2 border-b-2 border-gray-200 shadow-sm">
          InsightFlow
        </h1>

        <div className="mt-10"></div>
        <main className="flex-grow p-4">
          <RouterProvider router={router} />
        </main>
      </div>
    </>
  );
}

export default App;
