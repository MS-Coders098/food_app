import React from 'react'

const HomeItem = ({ food }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 bg-gray-300">
                <img className="w-full h-full object-cover object-center" src={food.image} alt={food.name} />
            </div>
            <div className="p-4">
                <h4 className="text-xl font-bold mb-2 lg:text-lg md:text-base sm:text-sm">
                    {food.name}
                </h4>
                <p className="text-gray-600 mb-4 lg:text-sm md:text-xs">
                    {food.description}
                </p>
            </div>
        </div>
    )
}

export default HomeItem