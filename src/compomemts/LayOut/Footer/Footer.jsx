import React, { useEffect, useState } from 'react'

export default function Footer() {
    
  return (
    <>
      <footer className="mx-auto w-full relative text-center bg-blue-500 text-white">
        <div className="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
          <h2 className="font-bold text-3xl xl:text-4xl leading-snug">
            Ready to get your productivity back?<br />Start your free trial today.
          </h2>
          <div className="mt-8">
            <nav className="flex flex-wrap justify-center text-lg font-medium">
              <div className="px-5 py-2"><a href="#">Contact</a></div>
              <div className="px-5 py-2"><a href="#">Pricing</a></div>
              <div className="px-5 py-2"><a href="#">Privacy</a></div>
              <div className="px-5 py-2"><a href="#">Terms</a></div>
              <div className="px-5 py-2"><a href="#">Twitter</a></div>
            </nav>
            <p className="mt-7 text-base">© 2023 XYZ, LLC</p>
          </div>
        </div>
      </footer>

    </>
  )
}
