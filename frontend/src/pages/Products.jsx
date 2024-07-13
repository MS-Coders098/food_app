import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFoods } from '../store/actions/foodAction'
import Footer from '../components/Footer'
import FoodItem from '../components/FoodItem'
import Loading from "../components/Loading"
import ProductsItem from '../components/ProductsItem'

const Products = ({ isLoggedIn }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { foods } = useSelector(state => state.foodSlice)

  const [chinese, setchinese] = useState()
  const [deserts, setdeserts] = useState()
  const [fastfoods, setfastfoods] = useState()
  const [inpValue, setinpValue] = useState("")
  const [fetchedProducts, setfetchedProducts] = useState([])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }

    if (isLoggedIn !== "Guest") {
      navigate('/')
    }
    else {
      navigate('/products')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    dispatch(fetchFoods())
  }, [])

  useEffect(() => {
    if (foods?.foodModel) {
      setchinese(foods?.foodModel.filter(food => food.category === "C"))
      setdeserts(foods?.foodModel.filter(food => food.category === "D"))
      setfastfoods(foods?.foodModel.filter(food => food.category === "F"))
    }
  }, [foods])

  const handleSearch = (value) => {
    setinpValue(value)
  }

  // set all the category of products in fetchedProducts state from the value of inpValue compared with the pname
  useEffect(() => {
    if (inpValue) {
      setfetchedProducts([...chinese, ...fastfoods, ...deserts]?.filter(food => food.pname.toLowerCase().includes(inpValue.toLowerCase())))
    } else {
      setfetchedProducts(fastfoods)
    }
  }, [inpValue, fastfoods, chinese, deserts])


  return fastfoods && chinese && deserts ? (
    <div className='w-full min-h-screen overflow-hidden'>

      <div id="navbar">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>

      <div id="landing">
        <Landing handleSearch={handleSearch} />
      </div>

      {inpValue ? (
        <section id="searched-products" className='w-full min-h-screen bg-black bg-opacity-80'>
          {fetchedProducts ? (
            <>
              {fetchedProducts.length > 0 ? (
                <div className='p-4 flex-wrap flex gap-5'>
                  {fetchedProducts?.map(food => {
                    return <ProductsItem key={food.id} product={food} addToCart={true} />
                  })}
                </div>
              ) : (
                <h1>No Food Item Available</h1>
              )}
            </>
          ) : (
            <Loading />
          )}
        </section>
      ) : (
        <section id="products-page">

          <div id="fast-foods">
            <h1 className='text-7xl px-4 py-10 sm:text-5xl mdsm:py-5 mdsm:px-0 mdsm:text-center text-zinc-800 bg-green-600  tracking-wider font-black'>Fast &nbsp;Foods</h1>
            <div id="items" className='bg-black py-5 flex gap-5 px-3 flex-wrap bg-opacity-80'>
              {fastfoods && fastfoods.length !== 0 ? (
                fastfoods.map(food => {
                  return <FoodItem key={food.id} food={food} />
                })
              ) : (
                <h1 className='w-full text-5xl font-bold text-white h-screen flex justify-center items-center'>No Item To display</h1>
              )}
            </div>
          </div>

          <div id="chinese">
            <h1 className='text-7xl sm:text-5xl mdsm:py-5 mdsm:px-0 mdsm:text-center px-4 py-10 text-zinc-800 bg-green-600  tracking-wider font-black'>Chinese</h1>
            <div id="items" className='bg-black py-5 flex gap-5 px-3 flex-wrap bg-opacity-80'>
              {chinese && chinese.length !== 0 ? (
                chinese.map(food => {
                  return <FoodItem key={food.id} food={food} />
                })
              ) : (
                <h1 className='w-full text-5xl font-bold text-white h-screen flex justify-center items-center'>No Item To display</h1>
              )}
            </div>
          </div>

          <div id="deserts">
            <h1 className='text-7xl px-4 sm:text-5xl mdsm:py-5 mdsm:px-0 mdsm:text-center py-10 text-zinc-800 bg-green-600  tracking-wider font-black'>Deserts</h1>
            <div id="items" className='bg-black py-5 flex gap-5 px-3 flex-wrap bg-opacity-80'>
              {deserts && deserts.length !== 0 ? (
                deserts.map(food => {
                  return <FoodItem key={food.id} food={food} />
                })
              ) : (
                <h1 className='w-full text-5xl font-bold text-white h-screen flex justify-center items-center'>No Item To display</h1>
              )}
            </div>
          </div>

        </section>
      )}

      <Footer />
    </div >
  ) : (
    <Loading />
  )
}

export default Products