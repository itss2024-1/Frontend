import React, { useEffect } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import NotFound from './pages/Errors/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import LayoutAdmin from './components/Admin/LayoutAdmin'
import AdminPage from './pages/Admin/AdminPage'
import LoginPage from './pages/Login/Login'
import { fetchAccount } from './redux/slice/accountSlide'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Client/Home/Home'
import SchoolPage from './pages/Admin/School/SchoolPage'
import UserPage from './pages/Admin/User/UserPage'

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
      },
      {
        path: "schools",
        element: <SchoolPage />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount())
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
