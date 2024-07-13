import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-2xl mr-5 text-nowrap font-black font-serif">Admin Panel</div>
                        <Logout />
                    </div>
                    <div className="-mr-2 hidden md:block sm:hidden xsm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.364 5.636a1.5 1.5 0 00-2.121 0L12 9.879 7.757 5.636a1.5 1.5 0 00-2.121 2.121L9.879 12l-4.243 4.243a1.5 1.5 0 002.121 2.121L12 14.121l4.243 4.243a1.5 1.5 0 002.121-2.121L14.121 12l4.243-4.243a1.5 1.5 0 000-2.121z"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4 5h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 6h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1zm0 6h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1z"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                    <div className="flex md:hidden items-center space-x-4 sm:hidden xsm:hidden">

                        {[{ id: 1, name: "Add Product", place: "/admin/home" }, { id: 2, name: "Preview Product", place: "/admin/products" }, { id: 3, name: "Orders", place: "/admin/orders" }, {id: 4, name: "Home", place: "/"}].map(item => (
                            <Link key={item.id} to={item.place && item.place} className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">{item.name}</Link>
                        )

                        )
                        }

                    </div>
                </div>
            </div>
            <div className={`hidden md:flex sm:flex sm:justify-center sm:text-center xsm:block md:${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                    {[{ id: 1, name: "Add Product", place: "/admin/home" }, { id: 2, name: "Preview Product", place: "/admin/products" }, { id: 3, name: "Orders", place: "/admin/orders" }].map(item => (
                        <Link key={item.id} to={item.place} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">{item.name}</Link>
                    )

                    )
                    }
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
