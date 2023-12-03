import {Navigate, Outlet} from "react-router-dom";
import  AuthContextProps,{useAuth,} from "../provider/AuthProvider";
import {useToast} from "@chakra-ui/react";


export function  ProtectedRoute() {
    const toast=useToast()
    let token =useAuth();
    let datatoken= JSON.stringify(token)
    let dataTokenO= JSON.parse(datatoken);

    // console.log("data of token", dataTokenO.token)
    // Check if the user is authenticated
    if (!dataTokenO.token) {
        // If not authenticated, redirect to the login page
         toast({
                        title: "You are not authenticated",
                        status: 'warning',
                        duration: 9000,
                        isClosable: true,
                        position: 'top',
                    })
        return <Navigate to="/login"/>;
    }

    // If authenticated, render the child routes
    return <Outlet/>;
}