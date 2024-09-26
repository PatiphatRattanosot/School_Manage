import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Layout from "../components/Layout";
import ProfilePage from '../pages/ProfilePage'
import EditProfilePage from "../pages/EditProfilePage";
const route = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }, {
                path: "/signup",
                element: <RegisterPage />
            }, {
                path: "/signin",
                element: <LoginPage />
            }, {
                path: "/profile",
                element: <ProfilePage/>
            }, {
                path: "/profile/edit",
                element: <EditProfilePage/>
            }
        ]
    }
])
export default route