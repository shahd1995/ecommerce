import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function PageLayout() {
    
    
  return (
    <>
      <Header />
      <main className='bg-gray-100 py-6 min-h-[75vh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
