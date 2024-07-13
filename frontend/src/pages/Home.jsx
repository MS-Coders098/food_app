import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Register from './Register';
import Login from './Login';
import HomeItem from '../components/HomeItem';
import { Link } from 'react-router-dom';
import { FaArrowDownLong } from "react-icons/fa6";

const Home = ({ isLoggedIn }) => {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: 'Burger',
      image: '/burger.avif',
      description: 'A delicious burger with cheese, lettuce, and toppings.',
    }
    ,
    {
      id: 2,
      name: 'Pizza',
      image: '/pizza.avif',
      description: 'A classic pizza with tomato sauce, cheese, and toppings.',
    },
    {
      id: 3,
      name: 'Pasta',
      image: '/pasta.avif',
      description: 'A hearty pasta dish with tomato sauce, cheese, and toppings.',
    }
  ])

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}

      <Navbar isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <section className="bg-[url('/home.avif')] bg-center bg-cover bg-opacity-80 text-zinc-200">
        <div className="container bg-black bg-opacity-50 mx-auto px-4 py-20 text-center xl:py-16 lg:py-12 md:py-10 sm:py-8 xsm:py-6">
          <h2 className="text-4xl font-bold mb-4 lg:text-3xl md:text-2xl sm:text-xl">Delicious Food Delivered to Your Doorstep</h2>
          <p className="text-lg mb-8 lg:text-base md:text-sm">Order now and enjoy the best meals from the comfort of your home.</p>

          <div id="buttons">
            {isLoggedIn === "Guest" ? (
              <>
                <Link to="/products" className="bg-green-500 mx-3 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 lg:px-5 lg:py-2 md:px-4 md:py-2 sm:px-3 sm:py-1">
                  Products
                </Link>
                <Link to="/carts" className="bg-white mx-3 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 lg:px-5 lg:py-2 md:px-4 md:py-2 sm:px-3 sm:py-1">
                  Carts
                </Link>
              </>
            ) : (
              <>
                <a href="#forms" className="bg-green-500 mx-3 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 lg:px-5 lg:py-2 md:px-4 md:py-2 sm:px-3 sm:py-1">
                  Login
                </a>
                <a href="#forms" className="bg-white mx-3 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 lg:px-5 lg:py-2 md:px-4 md:py-2 sm:px-3 sm:py-1">
                  Sign In
                </a>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Featured Dishes */}
      <section className="container flex-wrap mx-auto px-8 py-20 xl:py-16 lg:py-12 md:py-10 sm:py-8 xsm:py-6">
        {!isLoggedIn && (
          <div id="recommendation" className='flex flex-col mb-10 justify-center items-center'>
            <h3 className='mb-3 mdsm:text-center text-xl font-semibold font-mono tracking-tight'>Login/Sign In to see further details</h3>
            <FaArrowDownLong size={50} className="text-green-500 animate-bounce" />
          </div>
        )}
        <h3 className="text-5xl textShadow font-bold text-center mb-4 lg:text-2xl md:text-xl sm:text-lg">Featured Dishes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <HomeItem key={food.id} food={food} />
          ))}
        </div>
      </section>

      <section id="forms" className='flex w-full lg:flex-col lg:h-full bg-zinc-800 xl:gap-7 bg-opacity-65 py-5 px-8 gap-5 xl:py-1 xl:px-2 h-screen justify-between'>

        <div id="registration" className="w-full rounded-lg p-8  transition-transform duration-300 ease-in-out transform ">
          <h2 className="textShadow text-3xl font-bold text-center text-black mb-6">Register Your Account</h2>
          <Register />
        </div>

        <div id="login" className="w-full rounded-lg p-8 transition-transform duration-300 ease-in-out transform">
          <h2 className="textShadow text-3xl font-bold text-center text-zinc-800 mb-6">Login to Existing Account</h2>
          <Login />
        </div>

      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home
