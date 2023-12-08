import React from 'react'
import Navbar from '../components/web/nabar/Navbar'
import Footer from '../components/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <>
      <Navbar />
      <Outlet />
      <Footer />
      </>
    </div>
  )
}
