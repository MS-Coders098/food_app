import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import Products from './pages/Products'
import Error from './pages/Error'
import Carts from './pages/Carts'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/slices/authSlice'
import AdminHome from './pages/AdminHome'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import { fetchUserData } from './store/actions/userAction'

const App = () => {
  axios.defaults.withCredentials = true
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.authSlice)
  const { user } = useSelector(state => state.userSlice)

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(fetchUserData())
  }, [dispatch, isLoggedIn, user])

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route exact path="/products" element={<Products isLoggedIn={isLoggedIn} />} />
        <Route exact path="/carts" element={<Carts isLoggedIn={isLoggedIn} user={user} />} />

        {/* Admin Routes */}
        <Route exact path="/admin/home" element={<AdminHome isLoggedIn={isLoggedIn} />} />
        <Route exact path='/admin/products' element={<AdminProducts isLoggedIn={isLoggedIn} />} />
        <Route exact path='/admin/orders' element={<AdminOrders isLoggedIn={isLoggedIn}/>} />

        {/* Error Routes */}

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
