import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    axios.get("/logout")
      .then((res) => {
        alert("Logged Out")
        dispatch(logout())
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <button onClick={handleLogout} className='bg-red-500 tall:px-2 tall:py-2 hover:bg-red-700 duration-150 ease-in-out transition-all px-4 py-3 text-white rounded-md hover:scale-105'>
      Logout
    </button>
  )
}

export default Logout
