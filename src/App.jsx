import React, { useEffect } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import NotFound from './pages/Errors/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import LayoutAdmin from './components/Admin/LayoutAdmin'
import AdminPage from './pages/Admin/AdminPage'
import LoginPage from './pages/Login/Login'
import { fetchAccount } from './redux/slice/accountSlide'
import Home from './pages/Client/Home/Home'
import UserPage from './pages/Admin/User/UserPage'
import ResumePage from './pages/Client/Resume/ResumePage'
import ResumeTable from './components/Admin/Resume/ResumeTable'
import ScheduleTable from './components/Schedule/ScheduleTable'
import MyResumeTable from './pages/Client/Resume/MyResumeTable'

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
      {
        path: "resumes/:slug",
        element: <ResumePage />
      },
      {
        path: "schedules",
        element: <ScheduleTable />
      },
      {
        path: "resume",
        element: <MyResumeTable />
      },
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
        path: "resumes",
        element: <ResumeTable />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
])

const App = () => {
  const dispatch = useDispatch();

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
