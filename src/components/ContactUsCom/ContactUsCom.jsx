import React from 'react'

const ContactUsCom = () => {
  return (
    <div class="container mx-auto px-4 py-8 ">
        <h1 class="text-3xl font-bold text-center mb-8 dark:text-white">Welcome Contact Us page ;)</h1>
        <div class="bg-white dark:bg-blue-600 dark:text-white rounded-lg p-6 overflow-hidden shadow-xl shadow-blue-400">
            <form>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="name">Name</label>
                    <input class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" id="name" type="text" placeholder="Your Name" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="email">Email</label>
                    <input class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" id="email" type="email" placeholder="Your Email" />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-white" for="message">Message</label>
                    <textarea class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" id="message" rows="4" placeholder="Your Message"></textarea>
                </div>
                <button class="w-full px-4 py-2 rounded-lg bg-blue-500 text-white dark:text-blue-600 dark:bg-white hover:bg-blue-400 dark:hover:bg-blue-400 dark:hover:text-white">Send Message</button>
            </form>
            <div class="mt-6">
                <h2 class="text-xl font-bold mb-2">Our Location</h2>
                <div class="bg-gray-200 p-4 rounded-lg">
                    <p class="text-gray-700">123 Main Street, Baku, Azerbaijan</p>
                    <iframe 
                        class="w-full h-48 mt-4 rounded-lg"
                        title='Code Academy' 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.424674579816!2d49.85175631535429!3d40.37719087936983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0xc20aa51a5f0b5e01!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1622549400000!5m2!1sen!2s" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUsCom