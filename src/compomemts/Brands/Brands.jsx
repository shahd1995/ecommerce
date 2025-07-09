import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

export default function Brands() {


  const [allBrands, setAllBrands] = useState(null)

  function getBrands() {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands').then(({ data }) => {
      setAllBrands(data.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <section className='recent-Brands container mx-auto py-10'>
      {allBrands ?
        <>
          <div className="mx-auto max-w-2xl lg:mx-0 mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">All Brands</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Stay informed with large number of our latest trending Brands.</p>
          </div>
          <div className="flex flex-wrap gap-6 w-full mx-auto px-0">
            {allBrands.map((category, index) => (
              <div key={index} className="relative rounded basis-[calc(25%-18px)] mb-6  flex-grow-0">
                <img src={category.image} alt="Hanging Planters" className="w-full  object-cover" />
                <p className="cursor-pointer absolute inset-0 bg-black/70 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </>
        : <Loader />}
    </section>
  )
}
