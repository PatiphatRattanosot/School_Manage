import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/personnel/ProfilePage";
import EditProfilePage from "../pages/personnel/EditProfilePage";
import AddNewsPage from "../pages/news/AddNewsPage";
import EditNewsPage from "../pages/news/EditNewsPage";
import DepartmentPage from "../pages/department/dashbord/DepartmentPage";
import EditDepartmentPage from "../pages/department/EditDepartmentPage";
import PersonnelPage from "../pages/personnel/dashboard/index";
import EditPersonnelPage from "../pages/personnel/EditProfilePage";
import NotAllow from "../components/checkpPermissions/NotAllow";
import AdminOnly from "../components/checkpPermissions/AdminOnly";
import AdminOrTeacher from "../components/checkpPermissions/AdminOrTeacher";
import IsUser from "../components/checkpPermissions/IsUser";


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
                element: <IsUser><ProfilePage/></IsUser>
            }, {
                path: "/profile/edit",
                element: <IsUser><EditProfilePage/></IsUser>
            }, {
                path: "/profile/edit/:id",
                element: <AdminOnly><EditProfilePage/></AdminOnly>
            }, {
                path: "/news/add",
                element:<AdminOrTeacher><AddNewsPage/></AdminOrTeacher> 
            }, {
                path: "/news/edit/:id",
                element: <AdminOrTeacher><EditNewsPage/></AdminOrTeacher>
            },{
                path:"/dashboard/department",
                element: <AdminOnly><DepartmentPage/></AdminOnly>
            },{
                path:"/dashboard/department/edit/:id",
                element: <AdminOnly><EditDepartmentPage/></AdminOnly>
            },{
                path:"/dashboard/personnel",
                element:<IsUser><PersonnelPage/></IsUser>
            },{
                path:"/dashboard/personnel/edit/:id",
                element:<AdminOnly><EditPersonnelPage/></AdminOnly>
            },{
                path:"/notallow",
                element:<NotAllow/>
            }
        ]
    }
])
export default route