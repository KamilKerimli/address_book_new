import React, { useState, useEffect } from 'react';
import { setupDropdown, DarkModeToggle, logout, closeMenu } from "../../utils/helpers";
import icon from '../../assets/icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBarCom = ({tabs}) => {
    const nav = useNavigate();
    const activeLink = useLocation().pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
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
    });

    return (
        <div className='bg-white dark:bg-gray-900'>
            <nav className="bg-white dark:bg-gray-900 shadow-lg p-4 navbar sticky-nav">
                <div className="mx-auto flex justify-between items-center">
                    <button onClick={()=>{nav('/')}} className="flex items-center">
                        <img src={icon} alt="Logo" className="h-8 mr-2" />
                        <span className="dark:text-white font-bold text-lg md:text-xl lg:text-2xl text-black">
                            Address <span className="text-gray-500 dark:text-gray-400">Book</span>
                        </span>
                    </button>

                    <div className="hidden md:flex space-x-6">
                        {
                            tabs.map((tab) => {
                                return (<a key={tab.key} href={tab.href}
                                    className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink === tab.href ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>{tab.value}</a>);
                            })
                        }
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="dropdown relative">
                            <button id="dropdownButton" 
                                className={`p-0 ${activeLink === '/profile' ? 'text-blue-600 dark:text-blue-500 ' : 'text-black dark:text-white'}`}>
                                <svg className="w-6 h-6 fill-current mr-3" viewBox="0 0 418 512" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
                                </svg>
                            </button>
                        </div>
                        <button onClick={DarkModeToggle} className="text-gray-600 hover:text-blue-600 p-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current dark:fill-white" viewBox="0 0 512 512">
                                <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                            </svg>
                        </button>

                        <button id="mobile-menu-btn" className="md:hidden text-gray-600 dark:text-white p-0">
                            {/* TODO: icon change and dark light color set. */}
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="mobile-menu" className={`${isMobileMenuOpen ? 'flex' : 'hidden'} dark:bg-gray-900 flex-col items-center space-y-4 p-4 bg-white shadow-lg`}>
                    {
                        tabs.map((tab) => {
                            return (<a key={tab.key} href={tab.href}
                                className={`hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300 buttonStyle ${activeLink === tab.href ? ' text-blue-500 font-medium ' : ' dark:text-white '}`}>{tab.value}</a>);
                        })
                    }
                </div>
            </nav>

            <div id="settingsPanel" className="fixed inset-0 bg-black bg-opacity-50 hidden">
                <div className="absolute top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-full">
                    <div className="p-6 relative h-full">
                        <div className="absolute right-5 top-6 cursor-pointer">
                            <svg 
                                id="closeSettingsPanel"
                                fill="none"
                                stroke="currentColor"
                                className="w-6 h-6 text-red-700 hover:text-white hover:bg-red-700 rounded-lg"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>

                        <div className='text-xl font-bold mb-4 text-black dark:text-white'>Settings</div>

                        <button onClick={(e) =>{closeMenu(e); localStorage.setItem("prType", "default"); nav('/profile'); window.location.reload();}} className='mt-10 mb-2 py-3 w-full flex items-center p-2 rounded-md text-black dark:text-white hover:bg-blue-600 hover:text-white'>
                            <svg className='w-6 h-6 mr-2' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span>Profile</span>
                        </button>

                        <button onClick={(e) =>{closeMenu(e); localStorage.setItem("prType", "privacy"); nav('/profile'); window.location.reload();}} className='mb-2 py-3 w-full flex items-center p-2 rounded-md text-black dark:text-white hover:bg-blue-600 hover:text-white'>
                            <svg className='w-6 h-6 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                            </svg>                          
                            <span>Privacy</span>
                        </button>

                        <button onClick={(e) =>{closeMenu(e); localStorage.setItem("prType", "notification"); nav('/profile'); window.location.reload();}} 
                            className='mb-2 py-3 w-full flex items-center p-2 rounded-md text-black dark:text-white hover:bg-blue-600 hover:text-white'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                            <span>Notification</span>
                        </button>

                        <button onClick={(e) =>{closeMenu(e); localStorage.setItem("prType", "favorites"); nav('/profile'); window.location.reload();}} className='mb-2 py-3 w-full flex items-center p-2 rounded-md text-black dark:text-white hover:bg-blue-600 hover:text-white'>
                            <svg className='w-6 h-6 mr-2' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <span>Favorites</span>
                        </button>

                        <button onClick={logout} className='w-full flex justify-center p-2 hover:bg-red-700 text-red-700 hover:text-white rounded-md absolute bottom-3'>
                            <svg className='w-6 h-6 mr-2' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarCom;