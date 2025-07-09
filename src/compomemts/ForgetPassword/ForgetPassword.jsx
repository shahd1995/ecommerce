import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function ForgetPassword() {
  let navigate = useNavigate()
  const [IsLoading, setIsLoading] = useState(false)

  function submitForm(val) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', val).then(({ data }) => {
      toast.success(data.message)
      navigate('/verifycode')
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    })
  }


  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required("This field is required"),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <div className='container mx-auto'>
      <div className="my-10 mx-auto flex items-center justify-center max-w-1/3 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8 w-full">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Forget Password</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
              {formik.errors.email && <span className='text-red-600 sm-text'>{formik.errors.email}</span>}
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{IsLoading == true ? <i className='fas fa-spinner fa-spin'></i> : "Verify"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
