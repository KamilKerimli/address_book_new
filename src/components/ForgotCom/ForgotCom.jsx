import React from 'react'
/* import { useNavigate } from 'react-router-dom' */

const ForgotCom = () => {
/*     const nav = useNavigate(); */
  return (
    <div class="bg-gray-100 flex items-center justify-center h-screen">
        <div class="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
            <h2 class="text-2xl font-bold mb-6 text-center text-white">Reset Your Password</h2>
            <div>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" placeholder="Enter your email" />
                </div>
                <div class="flex items-center justify-center">
                    <button onClick={() => {
                        localStorage.setItem("proces", true);
                        window.location.reload();
                    }} title="Qeydiyyatdan keç" class="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" type="button">
                        Send Reset Link
                    </button>
                </div>
            </div>
            <div class="mt-10 text-center">
                <a href="/login" class="text-white hover:text-gray-300 text-sm">Already have an account? Login</a>
            </div>
            <div class="mt-2 text-center">
                <a href="/register" class="text-white hover:text-gray-300 text-sm">Don't have an account? Register</a>
            </div>
        </div>
    </div>
  )
}

export default ForgotCom