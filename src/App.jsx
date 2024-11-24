import React from 'react'
import LayoutAdmin from './components/Admin'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import NotFound from './pages/Errors/NotFound'
import Footer from './components/Footer'
import Header from './components/Header'

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
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
  }
])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
