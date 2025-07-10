import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { TokenContext } from '../../Context/TokenContext'


//password@gmail.com //shahdmedhat@gmail.com
//Password
export default function Register() {
  let navigate = useNavigate()
  let {UserToken, setUserToken} = useContext(TokenContext)
  const [errorMsg, seterrorMsg] = useState('')
  const [IsLoading, setIsLoading] = useState(false)

  function submitForm(val){
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', val).then(({data})=>{
      localStorage.setItem('UserToken', data.token)
      navigate('/')
      setUserToken(data.token)
      setIsLoading(false)
    }).catch((error)=>{
      console.log(error.response);
      
      seterrorMsg(error.response.data.message)
      setIsLoading(false)
    })
  }
  

  let validationSchema = Yup.object().shape({
    name:Yup.string().required('This field is required').matches(/^.{3,6}$/, "Must be atleast 3 characters and maximum 6"),
    email:Yup.string().email('Invalid email').required("This field is required"),
    password:Yup.string().required('This field is required').matches(/^[A-Z0-9][a-z0-9]{6,10}$/, "Didn`t accept characters, should contain only 1 capital letter, Min 6 & Max 10 characters"),
    rePassword:Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Must match password'),
    phone:Yup.string().required('This field is required').matches(/^01[0125][0-9]{8}$/, 'Invalid phone number')
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema,
    onSubmit:submitForm
  })

  return (
    <>  
      <div className='container mx-auto'>
      <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center my-6">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
        <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
            <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {formik.errors.name && <span className='text-red-500'>{formik.errors.name}</span>}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {formik.errors.email && <span className='text-red-500 sm-text'>{formik.errors.email}</span>}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {formik.errors.password && <span className='text-red-500 sm-text'>{formik.errors.password}</span>}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input type="password" id="rePassword" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {formik.errors.rePassword && <span className='text-red-500 sm-text'>{formik.errors.rePassword}</span>}
          </div>
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
            <input type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {formik.errors.phone && <span className='text-red-500 sm-text'>{formik.errors.phone}</span>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-sm">{IsLoading == true ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:text-blue-500">Login</Link>
          {errorMsg && <span className='block text-red-500 mt-4'>{errorMsg}</span>}
        </div>
      </div>
      </div>
    </>
  )
}