import React, { useState } from 'react';

const EditCom = () => {
    const [user, setUser] = useState(null);
    const [addressList, setAddressList] = useState([]);
    const [isVerificationStep, setIsVerificationStep] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Seçilən şəkli saxlamaq üçün state

    // Şəkil seçildikdə işləyəcək funksiya
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Fayl tipini yoxlamaq
            const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
            if (allowedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedImage(reader.result); // Şəkli base64 formatında saxla
                };
                reader.readAsDataURL(file);
            } else {
                alert('Yalnız .png, .jpeg və .webp formatlı fayllar qəbul olunur.');
            }
        }
    };

    const handleAddAddress = () => {
        const newAddress = { type: '', shortName: '', fullAddress: '' };
        setAddressList([...addressList, newAddress]);
    };

    const handleSaveAddress = (index, updatedAddress) => {
        const updatedList = [...addressList];
        updatedList[index] = updatedAddress;
        setAddressList(updatedList);
    };

    const handleDeleteAddress = (index) => {
        const updatedList = addressList.filter((_, i) => i !== index);
        setAddressList(updatedList);
    };

    const handleGetCode = () => {
        if (!isVerificationStep) {
            setIsVerificationStep(true);
            setShowPasswordForm(false);
            const id = setTimeout(() => {
                setIsVerificationStep(false);
            }, 60000);
            setTimeoutId(id);
        } else {
            clearTimeout(timeoutId);
            setIsVerificationStep(false);
            setShowPasswordForm(true);
        }
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        console.log("Password changed");
    };

    return (
        <div className="mx-auto px-4 py-6 dark:bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white dark:bg-blue-600 text-black dark:text-white shadow-xl shadow-blue-400 rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                    <div className="flex flex-col items-center">
                        {selectedImage ? (
                            <img className="w-40 h-40 rounded-full mb-2" src={selectedImage} alt="Selected" />
                        ) : user ? (
                            <img className="w-40 h-40 rounded-full mb-2" src={user.ImgURL} alt="Avatar" />
                        ) : (
                            <svg className="w-40 h-40 rounded-full my-4 text-gray-600 dark:text-white bg-transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 1.2c-3 0-9 1.5-9 4.5v1.5c0 .6.3.9.9.9h16.2c.6 0 .9-.3.9-.9V17.7c0-3-6-4.5-9-4.5z" />
                            </svg>
                        )}
                        <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">JPG, PNG, or WEBP no larger than 5 MB</p>
                        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white cursor-pointer">
                            Upload new image
                            <input type="file" className="hidden" accept=".png, .jpeg, .webp" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div className="md:col-span-2 shadow-xl shadow-blue-400 rounded-lg p-4 dark:bg-blue-600 dark:text-white">
                    <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                    <form>
                        <div className="mb-3">
                            <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputUsername">Username</label>
                            <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputUsername" type="text" placeholder="Enter your username" readOnly={true} disabled={true} /> {/* readonly ve disabled gelen requeste gore teyin olunsun (email-de)*/}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputFirstName">First Name</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputFirstName" type="text" placeholder="Enter first name" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputLastName">Last Name</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputLastName" type="text" placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputOrgName">Country</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputOrgName" type="text" placeholder="Enter country" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputLocation">Location</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputLocation" type="text" placeholder="Enter current location" value="Azerbaijan, Baku" onChange={(e) => console.log("Location changed")} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputEmailAddress">Email</label>
                            <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputEmailAddress" type="email" placeholder="example@mail.com" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputPhone">Phone</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputPhone" type="tel" placeholder="(+994) 12 345 67 89" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputBirthday">Birthday</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputBirthday" type="date" placeholder="01/01/2025" />
                            </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white">Save Information</button>
                    </form>

                    <h2 className="text-lg font-semibold mb-4 mt-8">Addresses</h2>
                    <div id="addressContainer">
                        {addressList.map((address, index) => (
                            <AddressSection
                                key={index}
                                address={address}
                                onSave={(updatedAddress) => handleSaveAddress(index, updatedAddress)}
                                onDelete={() => handleDeleteAddress(index)}
                            />
                        ))}
                        <div className="flex justify-center">
                            <button onClick={handleAddAddress} className="bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white">+ Add Address</button>
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold mb-4 mt-8">Change Password</h2>
                    <div id="verifyArea" className="w-80 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className={`w-full p-2 mr-4 ${isVerificationStep ? '' : 'hidden'} border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100`} id="verifyInput" type="text" placeholder="Enter mail code" />
                        <button onClick={handleGetCode} className="w-36 bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white">{isVerificationStep ? 'Verify' : 'Get Code'}</button>
                    </div>
                    <form id="changeArea" className={`${showPasswordForm ? '' : 'hidden'}`} onSubmit={handleSavePassword}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputNewPass">New Password</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputNewPass" type="password" placeholder="Enter new password" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputConfirmPass">Confirm Password</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" id="inputConfirmPass" type="password" placeholder="Enter confirm password" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white">Save Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AddressSection = ({ address, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(true);
    const [localAddress, setLocalAddress] = useState(address);

    const handleSave = (e) => {
        e.preventDefault();
        onSave(localAddress);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="bg-gray-200 dark:bg-blue-400 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-white">Address Type</label>
                    <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-500 dark:text-white dark:placeholder:text-gray-100" 
                        type="text" placeholder="Home, Work, etc." value={localAddress.type} onChange={(e) => setLocalAddress({ ...localAddress, type: e.target.value })} readOnly={!isEditing}  />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-white">Short Name</label>
                    <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-500 dark:text-white dark:placeholder:text-gray-100" 
                        type="text" placeholder="Unique name" value={localAddress.shortName} onChange={(e) => setLocalAddress({ ...localAddress, shortName: e.target.value })}/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-white">Full Address</label>
                    <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-500 dark:text-white dark:placeholder:text-gray-100" 
                        type="text" placeholder="Full address" value={localAddress.fullAddress} onChange={(e) => setLocalAddress({ ...localAddress, fullAddress: e.target.value })} readOnly={!isEditing} />
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2">Delete</button>
                {isEditing ? (
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
                ) : (
                    <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit</button>
                )}
            </div>
        </div>
    );
};

export default EditCom;