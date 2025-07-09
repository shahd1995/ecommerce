import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import axios from 'axios'

export default function CategoriesListing() {

  const [allCategories, setAllCategories] = useState(null)

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then(({ data }) => {
      setAllCategories(data.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <section className='recent-Categories container mx-auto py-10'>
      {allCategories ?
        <>
          <div className="mx-auto max-w-2xl lg:mx-0 mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">All Categories</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Stay informed with large number of our latest trending Categories.</p>
          </div>
          <div className="flex flex-wrap gap-6 w-full mx-auto">
            {allCategories.map((category) => {
              return <div key={category.id} className="relative rounded basis-[calc(25%-18px)] mb-6  flex-grow-0">
                <img src={category.image} alt="Hanging Planters" className="w-full h-[500px] object-cover" />
                <p className="cursor-pointer absolute inset-0 bg-black/70 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                  {category.name}
                </p>
              </div>
            })}
          </div>
        </>
        : <Loader />}
    </section>
  )
}
