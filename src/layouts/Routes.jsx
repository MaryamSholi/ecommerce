import React from 'react'
import { createBrowserRouter, } from "react-router-dom";
import Home from './../components/web/home/Home.jsx';
import Categories from './../components/web/categories/Categories.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import HomeDashboard from './../components/dashboard/home/Home.jsx'
import CategoriesDashboard from './../components/dashboard/categories/Categories.jsx'
import Layout from './Layout.jsx';
import Register from '../components/web/register/Register.jsx';
import Login from '../components/web/login/Login.jsx';
import Cart from '../components/web/cart/Cart.jsx';
import CategoriesDetails from '../components/web/categories/CategoriesDetails.jsx';
import Product from '../components/web/products/Product.jsx';
import ProtectedRoute from '../components/web/protectedRoute/ProtectedRoute.jsx';
import Profile from '../components/web/profile/Profile.jsx';
import ForgetPassword from '../components/web/forgetPassword/ForgetPassword.jsx';
import SendCode from '../components/web/sendCode/SendCode.jsx';
import UserInfo from '../components/web/profile/UserInfo.jsx';
import UserContact from '../components/web/profile/UserContact.jsx';
import CreateOrder from '../components/web/order/CreateOrder.jsx';
import UserOrders from '../components/web/profile/UserOrders.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile',
        element:
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>,
        children: [
          {
            index: true,
            element: <UserInfo />
          },
          {
            path: 'contact',
            element: <UserContact />
          },
          {
            path: 'orders',
            element: <UserOrders />
          }
        ]

      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword />

      },
      {
        path: 'sendCode',
        element: <SendCode />

      },
      {
        // path:'home',
        index: true,
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'cart',
        element:
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
      },
      {
        path: 'products/category/:categoryId',
        element: <CategoriesDetails />
      },
      {
        path: 'product/:productId',
        element: <Product />

      },
      {
        path: 'order',
        element: <CreateOrder />
      },
      {
        path: '*',
        element: <h2>page not found --- web</h2>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [{
      path: 'home',
      element: <HomeDashboard />
    }
      , {
      path: 'categories',
      element: <CategoriesDashboard />
    },
    {
      path: '*',
      element: <h2>page not found --- dashboard</h2>
    }
    ]
  }
]);