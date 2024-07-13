import React from 'react';
import { Buffer } from 'buffer';
import axios from '../utils/axios';

const ProductsItem = ({ product, addToCart }) => {

  const handleAddToCart = (id) => {
    axios.post("/cart", {id})
    .then(res => {
        if (res.data) {
            alert(res.data)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={`max-w-md w-full rounded mdsm:w-full overflow-hidden bg-green-600 shadow-lg p-2 ${addToCart ? "m-0" : "m-4"}`}>

      <div id="image" className='flex justify-center'>
        {product.image && product.image.data && (
          <img
            src={`data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`}
            className="w-48 h-48 object-cover rounded-full"
          />
        )}
      </div>

      <div className="px-12 py-4 text-white">
        <div className="font-bold text-3xl mb-2 text-center">{product.pname}</div>
        <div id="details" className='flex text-xl mdsm:flex-col justify-between gap-1 mt-6'>
          {product.category === "F" ? (
            <div className=" ">Category: <span className='inline-block ml-1 font-semibold'>Fast Food</span></div>
          ) : (
            <h1></h1>
          )}
          {product.category === "C" ? (
            <div className=" ">Category: <span className='inline-block ml-2'>Chinese</span></div>
          ) : (
            <h1></h1>
          )}
          {product.category === "D" ? (
            <div className=" ">Category: <span className='inline-block ml-2'>Desert</span></div>
          ) : (
            <h1></h1>
          )}

          <div className="">Price: <span className='inline-block font-semibold ml-2'>${product.price}</span></div>
        </div>
      </div>

      <div className="px-6 pt-2 pb-2 contain-content text-center">
        <p className="text-zinc-100 text-base">{product.description}</p>
      </div>

      <div id="cart">
        {addToCart && (
          <button onClick={() => handleAddToCart(product._id)} className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Add to Cart
          </button>
        )}
      </div>

    </div>
  );
};

export default ProductsItem;
