import * as React from "react"
import {Box, ChakraProvider, theme,} from "@chakra-ui/react"
import {Home_page} from "./pages/Home/home"
import  {Profile_page} from "./pages/Profile/Profile_page";
import Login_page from "./pages/Auth/Login_page"
import SignUpPage from "./pages/Auth/SignUpPage";
import AuthProvider  from "./provider/AuthProvider";
import Routes from "./routes/Routes";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
               <AuthProvider>
                  <Routes />
                </AuthProvider>


        </Box>
    </ChakraProvider>
)
