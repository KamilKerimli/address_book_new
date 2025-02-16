import React from 'react'

const LoginCom = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <div class="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
            <h2 class="text-2xl font-bold mb-6 text-center text-white">SignIn Your Account</h2>
            <form>
                <div class="mb-4">
                    <label class="block text-white text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" required placeholder="Enter your email" />
                </div>
                <div class="mb-6">
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
                <div class="flex items-center justify-center">
                    <button title="Daxil ol" class="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" type="submit">
                        LOGIN
                    </button>
                </div>
            </form>
            <div class="mt-6 text-center">
                <a href="/register" class="text-white hover:text-gray-300 text-sm">Don't have an account? Register</a>
            </div>
            <div class="mt-2 text-center">
                <a href="/forgot" class="text-white hover:text-gray-300 text-sm">Forgot your password!</a>
            </div>
        </div>
    </div>
  )
}

export default LoginCom