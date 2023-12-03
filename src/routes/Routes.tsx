import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {useAuth} from "../provider/AuthProvider";
import {ProtectedRoute} from "../components/ProtectedRoute";
import Login_page from "../pages/Auth/Login_page";
import {Home_page} from "../pages/Home/home";
import {Profile_page} from "../pages/Profile/Profile_page";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import SignUpPage from "../pages/Auth/SignUpPage";
import {Chat_page} from "../pages/Chat/Chat_page";
import {Profile_page_client} from "../pages/Profile/Profile_page_client";
import NotFound from "../pages/NotFound/NotFound";
import {PostWithComment} from "../components/PostwithComment";
import {Explore} from "../components/Explore";
import {Message} from "../components/Message";
const Routes = () => {
    const token = useAuth();


    // Define public routes accessible to all users
    const routesForPublic = [{
        path: "/forget_password", element: <ForgotPasswordForm/>,

    }, {
        path: "/login", element: <Login_page/>,
    },
        {
            path: "/resetPassword", element: <ResetPasswordForm/>,

        }, {
            path: "/signUp", element: <SignUpPage/>,
        },
        {
           path: "*", element: <NotFound/>,
        },
       {
      path: "/post/:id",
      element: <PostWithComment />,
    },


    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [{
        path: "/", element: <ProtectedRoute/>, // Wrap the component in ProtectedRoute
        children: [{
            path: "/", element: <Home_page/>,
        }, {
            path: "/profile", element: <Profile_page/>,
        }, {
            path: "/chat",
            element: <Chat_page/>,
        },{
            path: "/profile/:id", element: <Profile_page_client/>,


        },
        {
        path: "/explore", element: <Explore />,

    },
            {
        path: "/message", element: <Message />,

    },


        ],
    },];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [{
        // path: "/", element: <div>Home Page</div>,
    }];


    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([...routesForPublic, ...(!token ? routesForNotAuthenticatedOnly : []), ...routesForAuthenticatedOnly,]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router}/>;
};

export default Routes;