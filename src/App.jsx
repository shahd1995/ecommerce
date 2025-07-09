import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './compomemts/Home/Home'
import Cart from './compomemts/Cart/Cart';
import Login from './compomemts/Login/Login';
import Register from './compomemts/Register/Register';
import NotFound from './compomemts/NotFound/NotFound';
import WishList from './compomemts/WishList/WishList'
import Brands from './compomemts/brands/brands';
import ForgetPassword from './compomemts/ForgetPassword/ForgetPassword'
import TokenContextProvider from './Context/TokenContext'
import ProtectRoute from './compomemts/ProtectRoute/ProtectRoute'
import ProductsListing from './compomemts/Products/ProductsListing/ProductsListing'
import PageLayout from './compomemts/LayOut/PageLayout/PageLayout'
import ProductDetails from './compomemts/Products/ProductDetails/ProductDetails'
import CategoriesListing from './compomemts/Categories/CategoriesListing/CategoriesListing'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import CheckOut from './compomemts/CheckOut/CheckOut';
import WishContextProvider from './Context/wishContext';
import VerifyCode from './compomemts/VerifyCode/VerifyCode';
import ResetPassword from './compomemts/ResetPassword/ResetPassword';

function App() {

  let route = createBrowserRouter([
    {
      path: '', element: <PageLayout />, children: [
        { index: true, element: <Home /> },
        { path: '/productslisting', element: <ProductsListing /> },
        { path: '/cart', element: <ProtectRoute><Cart /></ProtectRoute> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/verifycode', element: <VerifyCode /> },
        { path: '/resetpassword', element: <ResetPassword /> },
        { path: '/wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },
        { path: '/categoriesListing', element: <CategoriesListing /> },
        { path: '/brands', element: <Brands /> },
        { path: '/forgetpassword', element: <ForgetPassword /> },
         { path: '/checkout', element: <ProtectRoute><CheckOut /></ProtectRoute> },
        { path: '/productdetails/:id/:categ', element: <ProductDetails /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <TokenContextProvider>
        <CartContextProvider>
          <WishContextProvider>
          <RouterProvider router={route}>
          </RouterProvider>
          <Toaster />
          </WishContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </>
  )
}

export default App
