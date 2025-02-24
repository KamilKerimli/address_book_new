import React, { useState } from 'react'

const VerifyCom = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, setState] = useState(false);

    const checkCode = async(e) => {
        const email = localStorage.getItem("email");

        const response = await fetch(`http://localhost:1144/auth/getCode?email=${email}`, {
            method: 'GET'
        });

        const result = await response.json();
        console.log(result);
        
        if (!response.ok) {
            alert(result.message);
            return;
        }

        const tempCode = result.code;

        if (code != tempCode) {
            alert("Code not correct please check gmail address");
            return;
        }

        setState(!state);
    }

    const updatePass = async (e) => {
        if (confirmPassword != password) {
            alert("Please enter correct confirm code");
            return;
        }

        try {
            const email = localStorage.getItem("email");
            const response = await fetch(`http://localhost:1144/users/updatePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
        
            if (!response.ok) {
                alert("Please check network. The problem occurred.");
                return;
            }
        } catch (error) {
            alert("Server Error. Please check network.");
            return;
        }

        
        setState(!state);
        window.location.href = '/';
    }


  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div id="verifyArea" className={`bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96 ${state ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Confirm</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" type="email" onChange={(e) => setCode(e.target.value)} placeholder="Enter code" />
                </div>
                <div className="flex items-center justify-center">
                    <button id="verifyButton" 
                        className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" 
                        type="button"
                        onClick={(e) =>{
                            checkCode(e);
                        }}>
                        Verify Code
                    </button>
                </div>
            </form>
            <div className="mt-10 text-center">
                <button onClick={() => {
                        localStorage.setItem("proces", false);
                        window.location.href = '/verify';
                    }} className="text-white hover:text-gray-300 text-sm">&#8592; Go Back</button>
            </div>
        </div>

        <div id="changeArea" className={`bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96 ${state ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Reset Your Password</h2>
            <div>
                <div className="mb-1">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">New password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="newPassword" 
                        type="password" 
                        required 
                        minLength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Please enter new password" 
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-4 mt-3">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="confirmPassword" 
                        type="password" 
                        required 
                        minLength="8" 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Please again new password"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle" 
                        onClick={(e) =>{ updatePass(e); }}>
                        Reset
                    </button>
                </div>
            </div>
            <div className="mt-10 text-center">
                <a href="/verify" className="text-white hover:text-gray-300 text-sm">&#8592; Go Back</a>
            </div>
        </div>
    </div>
  )
}

export default VerifyCom