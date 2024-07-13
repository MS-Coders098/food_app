import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-zinc-300 shadow-md transition-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 998 50"
          className="font-sans"
        >
          <text
            x="0"
            y="40"
            fill="#16A34A"
            fontSize="38"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            Foodie
          </text>
        </svg>
        {isLoggedIn && (
          <Logout />
        )}
        <nav className="flex tall:hidden px-4 space-x-11 duration-300 transition-all ease-in-out">

          {isLoggedIn === "Admin" ? (
            <>
            {[{ id: 1, name: "Go To Admin's Panel", place: "/admin/home" }].map((item, index) => {
              return (
                <Link key={index} className='text-gray-600 font-serif text-2xl font-black text-nowrap hover:text-green-600' to={item.place}>
                  {item.name}
                </Link>
              );
            })}
            </>
          ) : (
            <>
              {[{ id: 1, name: "Home", place: "/" }, { id: 2, name: "Carts", place: "/carts" }, { id: 3, name: "Products", place: "/products" }].map((item, index) => {
                return (
                  <Link key={index} className='text-gray-600 font-serif text-2xl font-black hover:text-green-600' to={item.place}>
                    {item.name}
                  </Link>
                );
              })}
            </>
          )}

        </nav>
        <button className="tall:flex hidden duration-300 transition-all ease-in-out" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`tall:${isOpen ? 'flex' : 'hidden'} duration-300 transition-all ease-in-out tall:flex-col text-center bg-zinc-300 shadow-md`}>
        {isOpen && (
          <nav className="tall:flex duration-300 ease-in-out tall:flex-col text-center bg-zinc-200 shadow-md transition-all">
            {[{ id: 1, name: "Home", place: "/" }, { id: 2, name: "Carts", place: "/carts" }, { id: 3, name: "Products", place: "/products" }].map((item, index) => {
              return (
                <Link key={item.id} className='text-gray-600 font-serif text-2xl font-black hover:text-green-600 py-2' to={item.place}>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar