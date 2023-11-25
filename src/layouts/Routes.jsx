import React from 'react'
import {createBrowserRouter,} from "react-router-dom";
import Home from './../components/web/home/Home.jsx';
import Categories from './../components/web/categories/Categories.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import HomeDashboard from './../components/dashboard/home/Home.jsx'
import CategoriesDashboard from './../components/dashboard/categories/Categories.jsx'
import Layout from './Layout.jsx';
import Register from '../components/web/register/Register.jsx';
import Login from '../components/web/login/Login.jsx';

export const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      {
        path:'register',
        element: <Register />,
      },
      {
        path:'login',
        element: <Login />,
      },
      {
        path:'home',
        element:<Home />,
      },
      {
        path:'categories',
        element: <Categories />

      }
    ]
  },
  {
    path:'/dashboard',
    element: <DashboardLayout />,
    children:[
      {
        path: 'home',
        element: <HomeDashboard />,
      },
      {
        path: 'categories',
        element: <CategoriesDashboard />,
      }
    ]
  },
]);