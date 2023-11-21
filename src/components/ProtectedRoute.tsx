import {Navigate, Outlet} from "react-router-dom";
import  AuthContextProps,{useAuth,} from "../provider/AuthProvider";


export function ProtectedRoute() {
    let token = useAuth();
    let datatoken= JSON.stringify(token)
    let dataTokenO= JSON.parse(datatoken);

    console.log("data of token", dataTokenO.token)
    // Check if the user is authenticated
    if (!dataTokenO.token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login"/>;
    }

    // If authenticated, render the child routes
    return <Outlet/>;
}