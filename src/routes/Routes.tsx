import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "../components/ProtectedRoute";
import  Login_page  from "../pages/Auth/Login_page";
import {Home_page} from "../pages/home";
import {Profile_page} from "../pages/Profile/Profile_page";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const Routes = () => {
  const  token  = useAuth();
    console.log("token is")


  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
       {
      path: "/login",
      element: <Login_page/>,
    },
    {
      path: "/forget_password",
      element: <ForgotPasswordForm/>,

    }
    ,
      {
      path: "/resetPassword",
      element: <ResetPasswordForm/>,

    }

  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element:<Home_page/>,
        },
        {
          path: "/profile",
          element: <Profile_page/>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },

      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login_page/>,
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;