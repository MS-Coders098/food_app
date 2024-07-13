import React from 'react';
import { Buffer } from "buffer"
import axios from '../utils/axios';

const FoodItem = ({ food }) => {

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
        <div className="max-w-sm tall:w-full  bg-white shadow-lg rounded-lg overflow-hidden">
            <div id="image">
                {food.image && food.image.data && (
                    <img className="w-full h-48 object-cover" src={
                        `data:image/jpeg;base64,${Buffer.from(food.image.data).toString('base64')}`
                    } alt='' />
                )}

            </div>
            <div className="p-4">
                <h3 className="text-2xl font-bold">{food.pname}</h3>
                <p className="text-gray-600">{food.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900">${food.price}</span>
                    <button onClick={() => handleAddToCart(food._id)} className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
