import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext'

export default function ProtectRoute(props) {
  //let { UserToken } = useContext(TokenContext)

  if (localStorage.getItem("UserToken") !== null) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}
