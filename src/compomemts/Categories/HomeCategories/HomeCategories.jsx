import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader';
import axios from 'axios';
import Slider from 'react-slick';

export default function HomeCategories() {

    var settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };


  const [categories, setcategories] = useState(null)
  function getAllCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories').then(({ data }) => {
      setcategories(data.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <section className='recent-products py-10'>
      {categories ?
        <>
          <div className="mx-auto max-w-2xl lg:mx-0 mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Explore Popular Categories</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Stay informed with large number of our latest trending products.</p>
          </div>
          <div>
            <Slider {...settings}>
             {categories.map((category)=>{ return <div className="relative rounded overflow-hidden h-[300px]">
                <img src={category.image} alt="Hanging Planters" className="w-full h-[300px] object-cover" />
                <p className="cursor-pointer absolute inset-0 bg-black/70 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                 {category.name}
                </p>
              </div>  
               })}
               </Slider>
          </div>
        </>
        : <Loader />}
    </section>
  )
}
