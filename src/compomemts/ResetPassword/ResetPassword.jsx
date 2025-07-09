import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { TokenContext } from '../../Context/TokenContext'

export default function ResetPassword() {
  let navigate = useNavigate()
  let { UserToken, setUserToken } = useContext(TokenContext)
  const [errorMsg, seterrorMsg] = useState('')
  const [IsLoading, setIsLoading] = useState(false)

  function submitForm(val) {
    setIsLoading(true)
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', val).then(({ data }) => {
      localStorage.setItem('UserToken', data.token)
      navigate('/')
      setUserToken(data.token)
      setIsLoading(false)
      console.log(data)
    }).catch((error) => {
      seterrorMsg(error.response.data.message)
      setIsLoading(false)
    })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required("This field is required"),
    newPassword: Yup.string().required('This field is required').matches(/^[A-Z][a-z0-9]{6,10}$/, "Invalid Password")
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema,
    onSubmit: submitForm
  })

  return (
    <>
      <div className='container mx-auto'>
        <div className="my-10 mx-auto flex items-center justify-center max-w-1/3 dark:bg-gray-950">
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8 w-full">
            <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Reset Password</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" />
                {formik.errors.email && <span className='text-red-600 sm-text'>{formik.errors.email}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input type="password" id="newPassword" name='newPassword' value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" />
                {formik.errors.newPassword && <span className='text-red-600 sm-text'>{formik.errors.newPassword}</span>}
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{IsLoading == true ? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
              {errorMsg && <span className='block text-red-500 mt-4'>{errorMsg}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
