import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import Loader from '../../Loader/Loader';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../../Context/wishContext';

export default function RecentProducts() {
  let { addToCart } = useContext(CartContext)
  let {addToWishList, removeFromWishList, favoriteIds} = useContext(WishContext)

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  const [recentProducts, setrecentProducts] = useState(null)

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then(({ data }) => {
      setrecentProducts(data.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  async function addProductToCart(prodId) {
    let response = await addToCart(prodId)
    console.log(response);
    if (response.data.status === 'success') {
      toast.success(response.data.message)
    }
  }

  async function addProductToWishList(prodId) {
    let response = await addToWishList(prodId)
    console.log(response);
    if (response.data.status === 'success') {
      toast.success(response.data.message)
    }
  }

  async function removeProductFromWishList(prodId) {
    let response = await removeFromWishList(prodId)
    console.log(response);
    if (response.data.status === 'success') {
      toast.success(response.data.message)
    }
  }
  
  useEffect(() => {
    getProducts()
  }, [])


  return (

    <section className='recent-products py-10'>
      {recentProducts ?
        <>
          <div className="mx-auto max-w-2xl lg:mx-0 mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Latest Products</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Stay informed with large number of our latest trending products.</p>
          </div>
          <Slider {...settings}>
            {recentProducts?.map((recentProduct) => {
              return <div key={recentProduct.id} className="flex items-center justify-center">
                <div className="w-71 bg-white border border-blue-200 rounded-lg shadow-md p-4">
                  <div className="relative">
                    {/* Wishlist Icon */}
                    {favoriteIds?.includes(recentProduct.id) ? (
                    <button
                      onClick={() => removeProductFromWishList(recentProduct.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                    >
                      {/* Filled Heart - Remove from Wishlist */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => addProductToWishList(recentProduct.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                    >
                      {/* Outline Heart - Add to Wishlist */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  )}
                    {/* Product Image */}
                    <Link to={`/productdetails/${recentProduct?.id}/${recentProduct?.category.name}`}>
                      <div>
                        <img src={recentProduct.imageCover} alt={recentProduct.title} className="object-contain w-full h-[250px] fill" />
                      </div>
                    </Link>
                  </div>
                  {/* Product Details */}
                  <div className="mt-4">
                    <Link to={`/productdetails/${recentProduct.id}/${recentProduct.category.name}`}>
                      <h3 className="text-gray-800 font-medium text-base mb-1 line-clamp-1">
                        {recentProduct.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-xs line-clamp-1">
                      {recentProduct.description}
                    </p>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className='flex items-center gap-1'>
                        Total Rating:
                        <span className='font-bold'>{recentProduct.ratingsQuantity}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                        </svg>
                      </span>
                    </div>
                    {/* Pricing */}
                    <div className="flex items-end justify-between">
                      <div className="flex items-baseline space-x-2 mt-2">
                        <span className="text-blue-600 text-xl font-semibold">{recentProduct.price} EGP</span>
                      </div>
                      <button onClick={() => addProductToCart(recentProduct.id)} className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            })}
          </Slider>
        </>
        : <Loader />}
    </section>
  )
}
