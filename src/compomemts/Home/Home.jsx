import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import RecentProducts from '../Products/RecentProducts/RecentProducts'
import HomeCategories from '../Categories/HomeCategories/HomeCategories'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {

  let {UserToken} = useContext(TokenContext)

  return (
    <>
    <MainSlider />
    <div className='home container mx-auto'>
      <HomeCategories />
      <RecentProducts />
    </div>
    </>

  )
}
