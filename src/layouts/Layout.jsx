import React from 'react'
import Navbar from '../components/web/nabar/Navbar'
import Footer from '../components/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({user, setUser}) {
  return (
    <div>
      <>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
      <Footer />
      </>
    </div>
  )
}
