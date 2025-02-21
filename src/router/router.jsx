import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Features from "../components/Features";
import DashboardLayout from "../layout/DashboardLayout";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'features',
            element: <Features></Features>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <DashboardLayout></DashboardLayout>,
      children:[
        {
          
        }
      ]
    }
  ]);

  export default router;