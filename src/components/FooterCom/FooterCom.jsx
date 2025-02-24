import React from 'react'

const FooterCom = ({type="dflt"}) => {
  return (
    <footer className="bg-gray-100 text-blue-600 py-8
                   dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-900 dark:text-white">
        {type === 'dflt' ? (
        <section className="container mx-auto px-4">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <section className="text-center md:text-left">
                    <h2 className="text-xl font-bold mb-4">Address Book</h2>
                    <p className="text-sm to-gray-50">Your trusted digital address book for managing contacts efficiently.</p>
                </section>
                <section className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4">Pages</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="text-sm hover:text-gray-300 transition duration-300">Home</a></li>
                        <li><a href="/advsearch" className="text-sm hover:text-gray-300 transition duration-300">Advenced Search</a></li>
                        <li><a href="/about" className="text-sm hover:text-gray-300 transition duration-300">About</a></li>
                        <li><a href="/contactUs" className="text-sm hover:text-gray-300 transition duration-300">Contact Us</a></li>
                    </ul>
                </section>
                <section className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="https://react.dev/" className="text-sm hover:text-gray-300 transition duration-300">React</a></li>
                        <li><a href="https://nodejs.org/en" className="text-sm hover:text-gray-300 transition duration-300">Node JS</a></li>
                        <li><a href="https://expressjs.com/" className="text-sm hover:text-gray-300 transition duration-300">Express JS</a></li>
                        <li><a href="https://www.mongodb.com/" className="text-sm hover:text-gray-300 transition duration-300">Mongo Database</a></li>
                    </ul>
                </section>
                <section className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
                    <ul className="space-y-3">
                        <li className="text-sm">Github: <a href="https://github.com/KamilKerimli" className="hover:text-gray-300 transition duration-300">@KamilKerimli</a></li>
                        <li className="text-sm">Email: <a href="mailto:kamilmk-sp102@code.edu.az" className="hover:text-gray-300 transition duration-300">kamilmk-sp102@code.edu.az</a></li>
                        <li className="text-sm">Phone Number: (+994) 50 792 45 44</li>
                        <li className="text-sm">Azerbijan, Baku</li>
                    </ul>
                </section>
            </section>
            <section className="border-t border-t-white mt-8 pt-8 text-center">
                <p className="text-sm">Created by <a href="https://github.com/KamilKerimli" className="font-semibold hover:text-gray-300 transition duration-300">Kamil Karimli</a>. Powered by <a href="https://code.edu.az/" className="font-semibold hover:text-gray-300 transition duration-300">Code Academy</a> ©2025</p>
            </section>
        </section>) :(
            <div className='w-full text-center'>&copy; 2025 Admin Panel. All rights reserved.</div>
        )}
    </footer>
  )
}

export default FooterCom