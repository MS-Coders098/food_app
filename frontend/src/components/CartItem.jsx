import React, { useEffect, useState } from 'react'
import { Buffer } from "buffer"
import { FaPlusCircle } from "react-icons/fa";
import axios from "../utils/axios"
import { useDispatch } from 'react-redux';
import { AsyncRemoveCart } from '../store/actions/cartAction';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {
  const [quantity, setquantity] = useState()
  const [state, setstate] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setquantity(item.products[0].quantity)
  }, [item])

  const updateQuantity = () => {
    setquantity(quantity => quantity + 1)
  }

  const handleOrder = (id) => {
    try {
      axios.post("/order", { id, quantity })
        .then(res => alert(res.data))
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleClearCart = () => {
    dispatch(AsyncRemoveCart(item._id))
    navigate("/products")
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
      {item?.products.reverse().map((product, index) => {
        return <section key={index}>
          <div id="pimage">
            <img className="w-full h-44 object-cover object-center" src={`data:image/jpeg;base64,${Buffer.from(product.productId.image.data).toString('base64')}`} alt="" />
          </div>
          <div className="px-6 py-4">
            <p className="font-bold text-xl mb-2">{product.productId.pname}</p>
            <p className="text-gray-700 text-base">{product.productId.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold pr-3 text-gray-900">${product.productId.price * quantity}</span>
              <div className="flex items-center">
                <span className="mr-2">Qty: {quantity}</span>
                <button
                  onClick={updateQuantity}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  <FaPlusCircle />
                </button>
              </div>
            </div>
          </div>
          <div id="btns" className='flex xsm:flex-col'>
            <button onClick={() => handleOrder(product.productId.id)} className='py-4 px-3 bg-green-600 m-3 text-white rounded-lg font-semibold'>Order Now</button>
            <button onClick={handleClearCart} className='py-4 px-3 bg-red-600 m-3 text-white rounded-lg font-semibold'>Remove From Cart</button>
          </div>
        </section>
      })}
    </div>
  );
}

export default CartItem