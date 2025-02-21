import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Features from "../components/Features";
import DashboardLayout from "../layout/DashboardLayout";
import AddTask from "../pages/AddTask";
import ManageTask from "../pages/ManageTask";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

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
            element: <PrivateRoute><Features></Features></PrivateRoute>
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
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children:[
        {
          path:'add-task',
          element: <AddTask></AddTask>
        },
        {
          path:'manage-task',
          element: <ManageTask></ManageTask>
        },
        {
          path:'profile',
          element: <Profile></Profile>
        },
      ]
    }
  ]);

  export default router;