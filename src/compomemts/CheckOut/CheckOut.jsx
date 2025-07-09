import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CheckOut() {

  const [IsLoading, setIsLoading] = useState(false)
  let { resetCartAfterPayment, cartId } = useContext(CartContext)
  let headers = { token: localStorage.getItem("UserToken") }
  const [isOnline, setisOnline] = useState(true)
  
  function payCash(val) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      shippingAddress: val
    }, {
      headers
    }).then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        resetCartAfterPayment()
        toast.success("Thank you for shopping here")
      }
    }).catch((error) => {
      console.log(error);

    })
  }

  function payOnline(val) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/`, {
      shippingAddress: val
    }, {
      headers
    }).then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log(response.data.session.url);
        window.location.href = response.data.session.url
        resetCartAfterPayment()
        toast.success("Thank you for shopping here")
      }else{
        toast.error("SOmething went wrong")
      }
    }).catch((error) => {
      console.log(error);

    })
  }

  function detectPaymentMethod(val) {
    if (isOnline) {
      payOnline(val)
    } else {
      payCash(val)
    }
  }

  let formik = useFormik({
    initialValues: {
      city: '',
      phone: '',
      details: ''
    }, onSubmit: detectPaymentMethod
  })

  return (
    <>
      <div className='container mx-auto'>
        <div className="my-10 mx-auto flex items-center justify-center max-w-1/3 dark:bg-gray-950">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8 w-full">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Check Out</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address details</label>
                <input type="text" id="details" name="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone number</label>
                <input type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                <input type="text" id="city" name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <button onClick={()=>setisOnline(false)} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{IsLoading == true ? <i className='fas fa-spinner fa-spin'></i> : "Pay Cash"}</button>
              <button onClick={()=>setisOnline(true)} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3">{IsLoading == true ? <i className='fas fa-spinner fa-spin'></i> : "Pay Online"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}