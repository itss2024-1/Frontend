import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import NotFound from './pages/Errors/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import UserPage from './pages/Admin/user/UserPage'
import Home from './components/Home/Home'
import LayoutAdmin from './components/Admin/LayoutAdmin'
import AdminPage from './pages/Admin/AdminPage'
import LoginPage from './pages/Login/Login'

const Layout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminPage /> },
      {
        path: "users",
        element: <UserPage />,
      },]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
