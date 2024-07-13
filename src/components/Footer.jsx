import React from 'react';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 lg:w-5/12 px-4 mb-8">
                        <div className="flex items-center">
                            <Logo width="100px" color='white'/>
                            
                        </div>
                        <p className="mt-4 text-sm leading-relaxed">
                            &copy; 2023. All Rights Reserved by Daily Blogs.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-300 uppercase mb-4">Company</h3>
                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/12 px-4 mb-8">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-300 uppercase mb-4">Support</h3>
                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-3/12 px-4 mb-8">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-300 uppercase mb-4">Legals</h3>
                            <ul>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
