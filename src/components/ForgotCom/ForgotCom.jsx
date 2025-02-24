import React, { useState } from 'react'

const ForgotCom = () => {
    const [email, setEmail] = useState('');

    const reset = async (e) => {

        if (email == null) {
            alert("Please enter email address");
            return;
        }

        const response = await fetch(`http://localhost:1144/auth/sendCode?email=${email}`, {
            method: 'GET'
        });

        
        if (!response.ok) {
            const result = await response.json();
            alert(result.message);
            return;
        }
        
        localStorage.setItem("proces", true);
        localStorage.setItem("email", email);
        window.location.reload();
    }


  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Your Password</h2>
            <div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex items-center justify-center">
                    <button onClick={(e) => {reset(e);}} className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" 
                    type="button">
                        Send Reset Link
                    </button>
                </div>
            </div>
            <div className="mt-10 text-center">
                <a href="/login" className="text-white hover:text-gray-300 text-sm">Already have an account? Login</a>
            </div>
            <div className="mt-2 text-center">
                <a href="/register" className="text-white hover:text-gray-300 text-sm">Don't have an account? Register</a>
            </div>
        </div>
    </div>
  )
}

export default ForgotCom