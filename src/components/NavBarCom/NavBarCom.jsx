import React, { useState, useEffect } from 'react';
import { setupDropdown, DarkModeToggle } from "../../utils/helpers";
import icon from '../../assets/icon.svg';
import { useLocation } from 'react-router-dom';

const NavBarCom = () => {
    const activeLink = useLocation().pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    

    useEffect(() => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const toggleMobileMenu = () => {
            console.log(isMobileMenuOpen);
            setIsMobileMenuOpen(!isMobileMenuOpen);
            console.log(isMobileMenuOpen);
        };
        
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };


        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        window.addEventListener('resize', handleResize);

        setupDropdown();

        return () => {
            if (mobileMenuBtn) {
                mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='bg-white dark:bg-gray-900'>
            <nav className="bg-white dark:bg-gray-900 shadow-lg p-4 navbar sticky-nav">
                <div className="container mx-auto flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <img src={icon} alt="Logo" className="h-8 mr-2" />
                        <span className="dark:text-white font-bold text-lg md:text-xl lg:text-2xl text-black">
                            Address <span className="text-gray-500 dark:text-gray-400">Book</span>
                        </span>
                    </a>

                    <div className="hidden md:flex space-x-6">
                        <a href="/home"
                            className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>HOME</a>
                        <a href="/advsearch"
                            className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/advsearch' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>SEARCH</a>
                        <a href="/about"
                            className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/about' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>ABOUT</a>
                        <a href="/contact-us"
                            className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/contact-us' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>CONTACT US</a>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="dropdown relative">
                            <button id="dropdownButton" className="text-gray-700 hover:text-blue-600 buttonStyle p-0">
                                <svg className="w-6 h-6 fill-(--icon-color) mr-3" viewBox="0 0 418 512" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                                </svg>
                            </button>
                        </div>
                        <button onClick={DarkModeToggle} className="text-gray-600 hover:text-blue-600 buttonStyle p-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-(--icon-color)" viewBox="0 0 512 512">
                                <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                            </svg>
                        </button>

                        <button id="mobile-menu-btn" className="md:hidden text-gray-600 hover:text-blue-600 buttonStyle p-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="mobile-menu" className={`${isMobileMenuOpen ? 'flex' : 'hidden'} dark:bg-gray-900 flex-col items-center space-y-4 p-4 bg-white shadow-lg`}>
                    <a href="/"
                        className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/' ? ' text-blue-500 font-medium ' : ' dark:text-white text-gray-700 '}`}>HOME</a>
                    <a href="/advsearch"
                        className={`text-gray-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/advsearch' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>SEARCH</a>
                    <a href="/about"
                        className={`text-gray-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/about' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>ABOUT</a>
                    <a href="/contact-us"
                        className={`text-gray-700 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink == '/contact-us' ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>CONTACT US</a>
                </div>
            </nav>

            <div id="settingsPanel" className="fixed inset-0 bg-black bg-opacity-50 hidden">
                <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-full">
                    <div className="p-6 relative">
                        <div className="absolute right-5 top-6 cursor-pointer">
                            <svg id="closeSettingsPanel" className="w-6 h-6" viewBox="0 0 418 512" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#ff0000" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-4">Settings Panel</h2>
                        <p className="text-gray-700">Bu yan pəncərə "Option 1" klik olunduqda açılır.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarCom;