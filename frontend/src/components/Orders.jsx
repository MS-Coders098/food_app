import React from 'react'
import { Buffer } from "buffer"

const Orders = ({ order, id }) => {
  return (
    <div className="max-w-sm sm:w-full bg-green-600 text-zinc-800 shadow-lg rounded-lg overflow-hidden p-4">
      <div className="text-center text-lg font-bold mb-2">id# &nbsp; {id + 1}</div>
      <div className="text-center text-lg font-bold mb-2">Date: {order.date.split("T")[0]}</div>
      <div className="flex justify-center mb-4">
        {order.productId.image && order.productId.image.data ? (

          <img src={`data:image/jpeg;base64,${Buffer.from(order.productId.image.data).toString('base64')}`} alt="" className="w-24 h-24 rounded-full object-cover" />

        ) : (
          <h1></h1>
        )}
      </div>
      <div className="text-center text-xl font-semibold mb-2">{order.productId.pname}</div>
      <div className="flex justify-between xsm:flex-col xsm:items-center xsm:mb-0 xsm:py-5 xsm:gap-0 gap-5 px-4 mb-4">
        <span className="text-lg font-normal">Price: <span className='font-medium inline-block xsm:ml-4'>${order.quantity * order.productId.price}</span> </span>
        <span className="text-lg font-normal">Qty: <span className='font-medium inline-block xsm:ml-4'>{order.quantity}</span> </span>
      </div>
      <div>
        <h3 className="text-left text-lg font-bold">Ordered By</h3>
        <div className="text-left pl-2">
          <p className="text-base capitalize">Name: {order.userId.fullname}</p>
          <p className="text-base">Email: {order.userId.email}</p>
        </div>
      </div>
    </div>
  )
}

export default Orders