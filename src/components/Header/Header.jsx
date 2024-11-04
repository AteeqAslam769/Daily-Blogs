import React, { useState } from 'react';
import { LogoutBtn, Logo } from '../index';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.status);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    return (
        <header className="relative py-3 shadow-lg bg-gray-800 z-10 ">
            <nav className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center">
                    <NavLink to="/">
                        <Logo color='white' className="ml-2 w-44 md:w-52" />
                    </NavLink>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white focus:outline-none ml-4"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <ul className="hidden md:flex md:flex-row md:space-x-4 ml-auto">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `block px-6 py-2 duration-200 rounded-full ${
                                            isActive ? 'bg-gray-200 text-gray-900' : 'text-white hover:bg-gray-500'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn className="block px-6 py-2 text-gray-700 duration-200 hover:bg-gray-200 rounded-full" />
                        </li>
                    )}
                </ul>

                {isMobileMenuOpen && (
                    <ul className="absolute top-14 right-0 left-0 bg-gray-500 shadow-md flex flex-col items-center space-y-2 py-4 md:hidden">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        to={item.slug}
                                        className={({ isActive }) =>
                                            `block px-6 py-2 duration-200 rounded-full ${
                                                isActive ? 'bg-gray-800 text-white' : 'text-white    hover:bg-gray-200'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn className="block px-6 py-2 text-gray-700 duration-200 hover:bg-gray-200 rounded-full" />
                            </li>
                        )}
                    </ul>
                )}
            </nav>
        </header>
    );
}

export default Header;
