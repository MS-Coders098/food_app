import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AsyncGetOrder } from '../store/actions/orderAction'
import AdminNavbar from '../components/AdminNavbar'
import Loading from '../components/Loading'
import Orders from '../components/Orders'

const AdminOrders = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orders } = useSelector(state => state.orderSlice)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }

    if (isLoggedIn !== "Admin") {
      navigate('/')
    }
    else {
      navigate('/admin/orders')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    dispatch(AsyncGetOrder())
  }, [])


  return orders?.orders ? (
    <main className='w-full min-h-screen bg-zinc-900 bg-opacity-70'>

      <div id="navbar">
        <AdminNavbar />
      </div>

      <div id="user-orders" className='flex sm:justify-center flex-wrap gap-8 px-7 py-4'>
        {orders?.orders.map((order, index) => (
          <Orders order={order} key={index} id={index} />
        ))}
      </div>

    </main>
  ) : (
    <Loading />
  )
}

export default AdminOrders