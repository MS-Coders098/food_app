import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/actions/productAction'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import AdminNavbar from '../components/AdminNavbar'
import ProductsItem from '../components/ProductsItem'

const AdminProducts = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.productSlice)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }

    if (isLoggedIn !== "Admin") {
      navigate('/')
    }
    else {
      navigate('/admin/products')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return products?.allProducts ? (
    <div className='w-full min-h-screen bg-zinc-800 bg-opacity-80'>

      {/* Navbar  */}
      <div id="navbar">
        <AdminNavbar />
      </div>

      {/* Products */}
      <div className='flex flex-wrap mdsm:justify-center'>
        {[...products?.allProducts].reverse().map((product) => (
          <ProductsItem key={product.id} product={product} addToCart={false} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default AdminProducts