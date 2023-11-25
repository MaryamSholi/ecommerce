import React from 'react'
import Navbar from '../components/dashboard/nabar/Navbar'
import Footer from '../components/dashboard/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
