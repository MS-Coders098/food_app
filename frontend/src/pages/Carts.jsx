import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from '../utils/axios'
import { Buffer } from "buffer"
import Loading from '../components/Loading'
import CartItem from '../components/CartItem'
import { AsyncClearCat, AsyncGetCart } from '../store/actions/cartAction'

const Carts = ({ isLoggedIn, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loggedInUserCarts } = useSelector(state => state.cartSlice)

  const [fullname, setfullname] = useState("")
  const [address, setaddress] = useState("")
  const [profilePic, setprofilePic] = useState("")

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
    else if (isLoggedIn !== "Guest") {
      navigate('/')
    }
    else {
      navigate('/carts')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    dispatch(AsyncGetCart())
  }, [dispatch])


  const handleUpdateUser = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', fullname)
    formData.append('address', address)
    formData.append('profilePic', profilePic)

    try {
      axios.put("/updateuser", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => {
          navigate("/carts")
        })
        .catch(err => console.log(err))
      setaddress("")
      setfullname("")
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = () => {
    dispatch(AsyncClearCat())
    navigate("/products")
  }

  return user && loggedInUserCarts ? (
    <main className='w-full min-h-screen overflow-hidden'>

      <section id="navbar">
        <Navbar isLoggedIn={isLoggedIn} />
      </section>

      <section id="loggedIn-user-details" className='w-full bg-[url("/cartImage.avif")] bg-cover bg-center'>

        <div id="content" className='bg-black flex justify-center flex-col text-zinc-50 items-center bg-opacity-50 w-full'>

          <div id="image" className='w-32 my-4 h-32'>
            {user?.profilePic?.data ? (
              <img src={`data:image/jpeg;base64,${Buffer.from(user.profilePic.data).toString('base64')}`} alt="" className='w-full rounded-full h-full object-cover' />
            ) : (
              <img src="/burger.avif" alt="" className='w-full rounded-full h-full object-cover' />
            )}
          </div>

          <div id="details" className='text-center leading-normal py-3'>
            <h1 className='text-4xl tracking-tight py-3 capitalize font-bold font-serif'>{user?.fullname}</h1>
            <h3 className='text-xl font-semibold font-serif text-zinc-200'>{user?.email}</h3>
          </div>

          <div id="update-form" className='my-4'>
            <h1 className='text-3xl font-light tracking-tight text-center'>Update Your Details</h1>
            <form onSubmit={handleUpdateUser} className="flex tall:flex-col items-center space-x-4 tall:space-y-4 text-black p-4">
              <input
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
                type="text"
                placeholder="Enter Fullname"
                className="flex-1 p-2 border tall:w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Enter Adress"
                className="flex-1 p-2 border border-gray-300 tall:w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={(e) => setprofilePic(e.target.files[0])}
                className="flex-1 p-2 border text-white border-gray-300 tall:w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex-1 px-3 py-3 bg-blue-500 text-white rounded-md tall:w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Details
              </button>
            </form>
          </div>

        </div>

      </section>

      <section id='carts' className='w-full min-h-[50vh]'>

        <div id="header" className='bg-green-700 py-5 text-center flex flex-col gap-4'>
          <h1 className='text-5xl font-bold mdsm:text-3xl tracking-tighter'>This is your cart section</h1>
          <h3 className='text-xl font-semibold mdsm:text-lg px-3'>Your Current Address: <span className='font-bold'> &nbsp;{user?.address}</span></h3>
          <div id="parent-btns" className='flex justify-center xsm:flex-col'>
            <button onClick={() => navigate("/products")} className='py-4 px-3 bg-green-600 m-3 text-white rounded-lg font-semibold'>Check Products</button>
            <button onClick={handleRemove} className='py-4 px-3 bg-red-600 m-3 text-white rounded-lg font-semibold'>Clear Cart</button>
          </div>
        </div>

        <div id="user-cart" className='w-full flex flex-wrap'>
          {loggedInUserCarts.length > 0 ? loggedInUserCarts?.map(item => {
            return <CartItem key={item._id} item={item} />
          }) : (
            <h1 className='w-full h-full bg-zinc-800 text-green-700 font-serif py-20 text-5xl font-black text-center'>No Item In Cart</h1>
          )}
        </div>

      </section>

    </main>
  ) : (
    <Loading />
  )
}

export default Carts