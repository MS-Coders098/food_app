import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const AdminHome = ({ isLoggedIn }) => {
  const [pname, setpname] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }

    if (isLoggedIn !== "Admin") {
      navigate('/')
    }
    else{
      navigate('/admin/home')
    }
  }, [isLoggedIn, navigate])

  const handleProductCreation = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('pname', pname);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);

    axios.post("/products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        alert("Product Created Successfully")

      })
      .catch(err => alert(err.message))
      setcategory("")
      setdescription("")
      setimage(null)
      setpname("")
      setprice("")
  }

  return (
    <div className='w-full h-screen bg-green-500'>

      {/* Navbar */}
      <div id="navbar">
        <AdminNavbar />
      </div>

      {/* Form */}
      <div className='w-full flex-col flex justify-center bg-green-700 bg-opacity-65'>
        <h1 className='text-center pt-6 text-3xl font-bold tracking-tight text-zinc-800'>Create a Product</h1>
        <form onSubmit={handleProductCreation} className="w-full p-8">

          <div className="flex flex-wrap sm:flex-col sm:gap-7 pt-10 pb-[6%] gap-4">

            <div className="flex-1 relative mb-4">
              <input
                type="text"
                name="pname"
                className="peer bg-transparent w-full border-b-2 text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-150 ease-in-out"
                placeholder=" "
                value={pname}
                onChange={(e) => setpname(e.target.value)}
                required
              />
              <label className="absolute left-0 -top-6 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-[0.75rem] peer-focus:text-gray-400 transition-all duration-300 ease-in-out">
                Product Name
              </label>
            </div>

            <div className="flex-1 relative mb-4">
              <input
                type="number"
                name="price"
                className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                placeholder=" "
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required
              />
              <label className="absolute left-0 -top-6 text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-0 peer-focus:-top-6 peer-focus:text-[0.75rem] peer-focus:text-gray-400 transition-all duration-300 ease-in-out">
                Price
              </label>
            </div>

          </div>

          <div className="flex flex-wrap sm:flex-col sm:gap-7 gap-4 pb-[6%]">

            <div className="flex-1 flex relative mb-4">
              <label className="text-white text-nowrap">Fast Food</label>
              <input
                type="radio"
                name="category"
                className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                placeholder=" "
                value="F"
                checked={category === "F"}
                onChange={(e) => setcategory(e.target.value)}
                required
              />
              <label className="text-white text-nowrap">Chinese</label>
              <input
                type="radio"
                name="category"
                className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                placeholder=" "
                value="C"
                checked={category === "C"}
                onChange={(e) => setcategory(e.target.value)}
                required
              />
              <label htmlFor="" className='text-white'>Deserts</label>
              <input
                type="radio"
                name="category"
                className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                placeholder=" "
                value="D"
                checked={category === "D"}
                onChange={(e) => setcategory(e.target.value)}
                required
              />

            </div>

            <div className="flex-1 relative mb-4">
              <input
                type="file"
                name="file"
                className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
                placeholder=" "
                onChange={(e) => setimage(e.target.files[0])}
                required
              />
              <label className="absolute left-0 -top-6 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-[0.75rem] peer-focus:text-gray-400 transition-all duration-300 ease-in-out">
                Choose an Image
              </label>
            </div>
          </div>
          <div className="relative mb-4">
            <textarea
              name="description"
              className="peer w-full border-b-2 bg-transparent text-white border-gray-300 focus:border-green-600 focus:outline-none transition-all duration-300 ease-in-out"
              placeholder=" "
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
            ></textarea>
            <label className="absolute left-0 -top-6 text-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-placeholder-shown:top-0 peer-focus:-top-4 peer-focus:text-[0.75rem] peer-focus:text-gray-400 transition-all duration-300 ease-in-out">
              Enter a Short Description
            </label>
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 ease-in-out">
            Submit
          </button>
        </form>
      </div >


    </div >
  )
}

export default AdminHome