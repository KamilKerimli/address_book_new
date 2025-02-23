import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const LoginCom = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const nav = useNavigate();

    const handleInputChange = (event, tag) => {
        if (tag === 'email') {
            setEmail(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    };

    // const validateInput = (value, regex) => {
    //     if (!value) {
    //     //   setError('PLease enter value');
    //       return false;
    //     }
    //     if (!regex.test(value)) {
    //     //   setError('Please correct format set.');
    //       return false;
    //     }
    //     return true;
    //   };

  const checkUser = async () => {
    try {
        const response = await fetch(`http://localhost:1144/users/?email=${email}&password=${password}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const result = await response.json();

        if (!response.ok) {
          console.log(result.message);
          return;
        }
    
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);


        window.location.href = '/';
      } catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">SignIn Your Account</h2>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" for="email">Email</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        value={email}
                        onChange={(e)=>{
                            handleInputChange(e, 'email')
                        }}
                        type="email" 
                        required 
                        placeholder="Enter your email" />
                </div>
                <div className="mb-6">
                    <label className="block text-white text-sm font-bold mb-2" for="password">Password</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        value={password}
                        onChange={(e)=>{
                            handleInputChange(e, 'password')
                        }}
                        type="password" 
                        required 
                        minLength={8} 
                        pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                        title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                        placeholder="Enter your password" />
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        title="Daxil ol" 
                        className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle"
                        onClick={checkUser}>
                        LOGIN
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <a href="/register" className="text-white hover:text-gray-300 text-sm">Don't have an account? Register</a>
            </div>
            <div className="mt-2 text-center">
                <a href="/forgot" className="text-white hover:text-gray-300 text-sm">Forgot your password!</a>
            </div>
        </div>
    </div>
  )
}

export default LoginCom