import React, { useEffect, useState } from 'react';

const RegisterCom = () => {
    const [codes, setCodes] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberCode, setPhoneNumberCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSelectChange = (event) => {
        setPhoneNumberCode(event.target.value);
    };

    const register = async (e) => {
        e.preventDefault(); 

        if (confirmPassword != password) {
            alert("Please enter correct confirm passsword");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1144/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    phoneNumber: (phoneNumberCode + phoneNumber),
                    password: password
                }),
            });
        
            if (!response.ok) {
                alert("Please check network. The problem occurred.");
                return;
            }
        
            const result = await response.json();
            
            window.location.href = result.redirect;
        
        } catch (error) {
            alert("Server error. Please try again. ");
        }
        
    };

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const response = await fetch(`http://localhost:1144/data/getPhoneCodes`, {
                    method: 'GET'
                });

                if (!response.ok) {
                    console.error(`Error: ${response.status}`);
                    return;
                }

                const result = await response.json();
                result.sort((a, b) => a.country.localeCompare(b.country));
                setCodes(result);

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchCodes();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-blue-700 p-8 rounded-lg shadow-lg shadow-cyan-500/50 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Your Account</h2>
                <form onSubmit={register}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Username</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="name" 
                            type="text" 
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="email" 
                            type="email" 
                            required 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                        <div className="flex">
                            <div className="relative w-1/3 mr-2">
                                <select 
                                    onChange={handleSelectChange} 
                                    value={phoneNumberCode} 
                                    className="block appearance-none w-full bg-white text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    {codes.map((code, index) => (
                                        <option key={index} value={code.code}>
                                            {code.code}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                                    </svg>
                                </div>
                            </div>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="phone" 
                                type="text" 
                                placeholder="Enter your phone number"
                                pattern="\d*"
                                inputMode="numeric"
                                maxLength="19"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" 
                            type="password"
                            required 
                            minLength="8" 
                            pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                            title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                            placeholder="Enter your password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="confirm-password" 
                            type="password" 
                            required 
                            minLength="8" 
                            pattern="^(?=.*\d{4,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                            title="The password must contain at least 4 numbers, 1 lowercase letter, 1 uppercase letter, and 1 special character."
                            placeholder="Enter your password"
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            type="submit"
                            title="Qeydiyyatdan keç" 
                            className="bg-white text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline publicButtonStyle"
                        >
                            SIGN UP
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <a href="/login" className="text-white hover:text-gray-300 text-sm">Already have an account? Login</a>
                </div>
                <div className="mt-2 text-center">
                    <a href="/forgot" className="text-white hover:text-gray-300 text-sm">Forgot your password!</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterCom;