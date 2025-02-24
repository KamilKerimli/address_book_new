import React, { useEffect, useState } from 'react';
import dfltImg from "../../../assets/defaultProfileImg.png";

const EditCom = () => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [addressList, setAddressList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [file, setFile] = useState(null); 

    useEffect(() => {
        const getUser = async () => {
            const localEmail = localStorage.getItem("email");
            const response = await fetch(`http://localhost:1144/users/?email=${localEmail}`, {
                method: 'GET'
            });
    
            const result = await response.json();
            
            if (!response.ok) {
                alert(result.message);
                return;
            }
    
            if (result.user) {
                setUser(JSON.parse(JSON.stringify(result.user)));
                setUsername(result.user.username || '');
                setFirstName(result.user.first_name || '');
                setLastName(result.user.last_name || '');
                setCountry(result.user.country || '');
                setLocation(result.user.location || '');
                setEmail(result.user.email || '');
                setPhone(result.user.phone || '');
                setBirthday(result.user.birthday || '');
            } else {
                console.warn('User data is empty:', result.user);
            }
        };
        const getAddresses = async () => {
            const localEmail = localStorage.getItem("email");
            const response = await fetch(`http://localhost:1144/address/getAddresses?email=${localEmail}`, {
                method: 'GET'
            });
    
            const result = await response.json();
            
            if (!response.ok) {
                alert(result.message);
                return;
            }
    
            if (result.address) {
                setAddressList(result.address);
                console.log(result.address);
            } else {
                console.warn('Address data is empty:', result.address);
            }
        };
    
        getUser();
        getAddresses();
    }, []);    

    const saveInfo = async() => {
        const response = await fetch(`http://localhost:1144/users/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file, 
                username,
                firstName,
                lastName,
                country,
                location,
                email,
                phone,
                birthday,
                addressList
            }),
        });
    
        if (!response.ok) {
            alert("Please check network. The problem occurred.");
            return;
        }
    
        const result = await response.json();
        // module run.
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
            if (allowedTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSelectedImage(reader.result);
                };
                reader.readAsDataURL(file);
                setFile(file);
            } else {
                alert('Yalnız .png, .jpeg və .webp formatlı fayllar qəbul olunur.');
            }
        }
    };

    const handleAddAddress = () => {
        const currentEmail = localStorage.getItem("email");
        const newAddress = { _id: null, email: currentEmail, addressType: '', shortAddress: '', realAddress: '' };
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

    return (
        <div className="mx-auto px-4 py-6 dark:bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white dark:bg-blue-600 text-black dark:text-white shadow-xl shadow-blue-400 rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                    <div className="flex flex-col items-center">
                        {selectedImage ? (
                            <img className="w-40 h-40 rounded-full mb-2" src={selectedImage} alt="Selected" />
                        ) : (
                            <img 
                                className="w-40 h-40 rounded-full mb-2" 
                                src={ user?.imgURL && user.imgURL !== "defaultProfileImg" ? user.imgURL : dfltImg } 
                                alt="Avatar" 
                            />
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
                            <input 
                                className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                id="inputUsername" type="text" placeholder="Enter your username" readOnly={true} disabled={true} 
                                value={user?.username || ''}/> 
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputFirstName">First Name</label>
                                <input 
                                    className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputFirstName" type="text" placeholder="Enter first name" 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={user?.first_name || ''}/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputLastName">Last Name</label>
                                <input 
                                    className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputLastName" type="text" placeholder="Enter last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={user?.last_name || ''}/>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputOrgName">Country</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputOrgName" type="text" placeholder="Enter country" 
                                    onChange={(e) => setCountry(e.target.value)}
                                    value={user?.country || ''}/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputLocation">Location</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputLocation" type="text" placeholder="Enter current location"
                                    onChange={(e) => setLocation(e.target.value)} 
                                    value={user?.location || ''}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputEmailAddress">Email</label>
                            <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                id="inputEmailAddress" type="email" placeholder="example@mail.com" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={user?.email || ''}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputPhone">Phone</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputPhone" type="tel" placeholder="(+994) 12 345 67 89" 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    value={user?.phoneNumber || ''}/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-white" htmlFor="inputBirthday">Birthday</label>
                                <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                                    id="inputBirthday" type="date" placeholder="01/01/2025"
                                    onChange={(e) => setBirthday(e.target.value)} 
                                    value={user?.birthday || ''} />
                            </div>
                        </div>
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

                    <button className="w-full bg-blue-500 text-white px-4 py-2 mt-6 rounded-lg dark:bg-white dark:text-blue-600 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white"
                        onClick={(e)=>{saveInfo();}}>Save Information</button>
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
                        type="text" placeholder="Home, Work, etc." 
                        value={localAddress?.addressType || ''} 
                        onChange={(e) => setLocalAddress({ ...localAddress, addressType: e.target.value })} readOnly={!isEditing}  />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-white">Short Name</label>
                    <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-500 dark:text-white dark:placeholder:text-gray-100" 
                        type="text" placeholder="Unique name" 
                        value={localAddress?.shortAddress || ''} 
                        onChange={(e) => setLocalAddress({ ...localAddress, shortAddress: e.target.value })}/>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-white">Full Address</label>
                    <input className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-500 dark:text-white dark:placeholder:text-gray-100" 
                        type="text" placeholder="Full address" 
                        value={localAddress?.realAddress || ''} 
                        onChange={(e) => setLocalAddress({ ...localAddress, realAddress: e.target.value })} readOnly={!isEditing} />
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