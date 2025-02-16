import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyCom = () => {
    const nav = useNavigate();
    const [state, setState] = useState(false);


  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div id="verifyArea" className={`bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96 ${state ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Confirm</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" for="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex items-center justify-center">
                    <button id="verifyButton" 
                        className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" 
                        type="button"
                        onClick={() =>{
                            setState(!state);
                        }}>
                        Verify Code
                    </button>
                </div>
            </form>
            <div className="mt-10 text-center">
                <button onClick={() => {
                        localStorage.setItem("proces", false);
                        window.location.reload();
                    }} className="text-white hover:text-gray-300 text-sm">&#8592; Go Back</button>
            </div>
        </div>

        <div id="changeArea" className={`bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96 ${state ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Your Password</h2>
            <form>
                <div className="mb-1">
                    <label className="block text-white text-sm font-bold mb-2" for="newPassword">New password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="newPassword" 
                        type="password" 
                        required 
                        minlength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Please enter new password" />
                </div>
                <div className="mb-4 mt-3">
                    <label className="block text-white text-sm font-bold mb-2" for="confirmPassword">Confirm password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="confirmPassword" 
                        type="password" 
                        required 
                        minlength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Please again new password" />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        title="Qeydiyyatdan keç" 
                        className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" 
                        type="submit"
                        onClick={() =>{
                            nav('/login');
                        }}>
                        Reset
                    </button>
                </div>
            </form>
            <div className="mt-10 text-center">
                <a href="/verify" className="text-white hover:text-gray-300 text-sm">&#8592; Go Back</a>
            </div>
        </div>
    </div>
  )
}

export default VerifyCom