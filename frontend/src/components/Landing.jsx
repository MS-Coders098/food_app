import React, { useEffect, useState } from 'react'

const Landing = ({ handleSearch }) => {
    const [input, setinput] = useState("")

    useEffect(() => {
        handleSearch(input)
    }, [input])

    return (
        <div className='w-full'>

            <header id="landing-header" className='flex bg-[url("/products_nav.avif")] bg-cover bg-center py-3 px-5 items-center md:flex-col md:justify-center md:items-center text-nowrap text-white'>
                <nav className='flex list-none w-1/2 lg:flex-col bg-black bg-opacity-55 justify-between md:w-full md:mb-5'>
                    <h1 className='text-3xl tracking-tight mr-7 font-bold md:text-center -p-2 xsm:text-xl lg:mr-0 md:mb-3'>We Offer These Dishes:</h1>
                    <ul className='flex justify-around items-center font-semibold  gap-12 xl:gap-6 text-xl mdsm:gap-3 mdsm:flex-col'>
                        {[{ id: 1, name: "Chinese", place: "#" }, { id: 2, name: "Fast Foods", place: "#" }, { id: 3, name: "Deserts", place: "#" }].map(item => (
                            <li key={item.id} className='hover:bg-gray-400 duration-150 md:text-2xl px-4 mdsm:px-2 py-3 mdsm:py-1 rounded'><a href={item.place}>{item.name}</a></li>
                        ))}
                    </ul>
                </nav>
                <div id="search" className='w-1/2 flex justify-end md:w-full bg-black bg-opacity-55'>
                    <input value={input} onChange={(e) => setinput(e.target.value)} type="text" placeholder='Search For The Food....' className='px-2 w-1/2 md:w-full py-2 outline-none bg-transparent border-b-2 font-semibold' />
                </div>
            </header>

            <main
                className="flex lg:flex-col w-full min-h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/products_background.jpeg')",
                }}
            >
                <div className="bg-black bg-opacity-50 flex-1 flex items-center justify-center p-8">
                    <div className="text-white text-center">
                        <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-4xl font-bold mb-4">Delicious Food, Delivered To You</h1>
                        <p className="sm:text-base md:text-lg lg:text-xl text-2xl">
                            Choose your favorite meals and have them delivered to your door. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, dolorem.
                        </p>
                    </div>
                </div>
                <div className="bg-black bg-opacity-50 flex-1 flex items-center justify-center p-8">
                    <img
                        src="/products_image.png"
                        alt="Delicious Food"
                        className="max-w-full"
                    />
                </div>
            </main>

        </div>
    )
}

export default Landing