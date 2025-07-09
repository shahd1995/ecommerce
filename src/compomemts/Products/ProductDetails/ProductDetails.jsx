import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'

export default function ProductDetails() {

    var settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  var relatedSettings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };

  let {id, categ} = useParams()
  const [productDetails, setproductDetails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)

  function getProductDetails(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
      setproductDetails(data.data)
    }).catch((error)=>{

    })
  }

  function getRelatedProducts(){
    axios.get('https://ecommerce.routemisr.com/api/v1/products').then(({data})=>{
      let allProducts = data?.data
      let filteredProducts = allProducts.filter((product)=>{ return product.category.name === categ})
      setRelatedProducts(filteredProducts)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    getProductDetails()
    getRelatedProducts()
  },[id])
  
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            {/* Product Images */}
            <div className="w-full md:w-1/2 px-4 mb-8">
              <Slider {...settings}>
              {productDetails?.images.map((image)=>{ return <img src={image} alt="Product" className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-md mb-4" id="mainImage" />
              })}
              </Slider>
            </div>
            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2"> {productDetails?.title}</h2>
              <p className="text-gray-600 mb-4">Brand: {productDetails?.brand.name}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">{productDetails?.price} EGP</span>
              </div>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 text-gray-600">{productDetails?.ratingsAverage} ({productDetails?.ratingsQuantity} reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">{productDetails?.description}</p>
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
              </div>
              <div className="flex space-x-4 mb-6">
                <button className="bg-blue-500 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:shadow-lg hover:drop-shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Add to Cart
                </button>
                <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  Wishlist
                </button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Industry-leading noise cancellation</li>
                  <li>30-hour battery life</li>
                  <li>Touch sensor controls</li>
                  <li>Speak-to-chat technology</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='related-products mb-15'>
            <div className="mx-auto max-w-2xl lg:mx-0 mt-15 mb-6">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Related Products</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">Stay informed with large number of our latest trending products.</p>
            </div>
            <Slider {...relatedSettings}>
            {relatedProducts?.map((relatedProduct) => {
                return <div key={relatedProduct.id} className="flex items-center justify-center">
                  <div className="w-71 bg-white border border-blue-200 rounded-lg shadow-md p-4">
                    <div className="relative">          
                      {/* Wishlist Icon */}
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                      </button>
                      {/* Product Image */}
                      <Link to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}>
                        <div>
                          <img src={relatedProduct.imageCover} alt={relatedProduct.title} className="object-contain w-full h-[250px] fill" />
                        </div>
                      </Link>
                    </div>
                    {/* Product Details */}
                    <div className="mt-4">
                      <Link to={`/productdetails/${relatedProduct.id}/${relatedProduct.category.name}`}>
                      <h3 className="text-gray-800 font-medium text-base mb-1 line-clamp-1">
                        {relatedProduct.title}
                      </h3>
                      </Link>
                      <p className="text-gray-600 text-xs line-clamp-1">
                        {relatedProduct.description}
                      </p>
                      <div className="flex items-baseline space-x-2 mt-2">
                          <span className='flex items-center gap-1'>
                            Total Rating: 
                          <span className='font-bold'>{relatedProduct.ratingsQuantity}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                            </svg>
                          </span>    
                        </div>
                      {/* Pricing */}
                      <div className="flex items-end justify-between">                 
                        <div className="flex items-baseline space-x-2 mt-2">
                          <span className="text-blue-600 text-xl font-semibold">{relatedProduct.price} EGP</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              })}
            </Slider>
          </div>
        </div>
      </div>

    </>
  )
}
