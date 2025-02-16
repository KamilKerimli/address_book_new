import React from 'react'

const RegisterCom = () => {
  return (
    <div class="flex items-center justify-center h-screen">
        <div class="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
            <h2 class="text-2xl font-bold mb-6 text-center text-white">Create Your Account</h2>
            <form>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="name">Name</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="name" type="text" placeholder="Enter your name" />
                </div>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" required placeholder="Enter your email" />
                </div>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="phone">Phone Number</label>
                    <div class="flex">
                        <div class="relative w-1/3 mr-2">
                            <select class="block appearance-none w-full bg-white text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline">
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+49">+49</option>
                                <option value="+994">+994</option>
                                <option value="+90">+90</option>
                                <option value="+7">+7</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                </svg>
                            </div>
                        </div>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="phone" 
                            type="text" 
                            placeholder="Enter your phone number"
                            pattern="\d*"
                            inputmode="numeric"
                            maxlength="19" />
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password"
                        required 
                        minlength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Enter your password" />
                </div>
                <div class="mb-6">
                    <label class="block text-white text-sm font-bold mb-2" for="confirm-password">Confirm Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        required 
                        minlength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Enter your password" /> 
                </div>
                <div class="flex items-center justify-center">
                    <button title="Qeydiyyatdan keç" class="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" type="submit">
                        SIGN UP
                    </button>
                </div>
            </form>
            <div class="mt-6 text-center">
                <a href="/login" class="text-white hover:text-gray-300 text-sm">Already have an account? Login</a>
            </div>
            <div class="mt-2 text-center">
                <a href="/forgot" class="text-white hover:text-gray-300 text-sm">Forgot your password!</a>
            </div>
        </div>
    </div>
  )
}

export default RegisterCom