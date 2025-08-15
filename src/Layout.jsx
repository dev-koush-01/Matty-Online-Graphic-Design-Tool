import React from 'react'
import Navbar from './Component/Navbar/Navbar.jsx'
import Footer from './Component/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main content area grows to push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout