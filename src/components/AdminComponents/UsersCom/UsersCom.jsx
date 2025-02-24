import { useState, useEffect } from 'react';
import icon from "../../../assets/defaultProfileImg.png";

const UsersCom = () => {
  const emptyAddress = { _id: null, email: '', addressType: '', shortAddress: '', realAddress: '' };
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:1144/users/getUsers");
      const data = await response.json();
      
      if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error("Users data is not an array", data);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = Array.isArray(users) ? users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : [];

  const handleEditClick = async (user) => {
    setSelectedUser(user);
  
    const initialEditUser = user ? { ...user, addresses: user.addresses || [] } : { ...emptyAddress, addresses: [] };
    setEditUser(initialEditUser);
  
    const response = await fetch(`http://localhost:1144/address/getAddresses?email=${user.email}`);
    const addressesData = await response.json();
  
    // Check if addressesData contains address array and map over it
    if (addressesData && Array.isArray(addressesData.address)) {
      const cleanedAddresses = addressesData.address.map(address => ({
        _id: address._id,  // Ensure the _id is included here
        email: user.email, 
        addressType: address.addressType,
        shortAddress: address.shortAddress,
        realAddress: address.realAddress
      }));
  
      setEditUser(prevState => ({
        ...prevState,
        addresses: cleanedAddresses
      }));
    } else {
      console.error('Invalid address data:', addressesData);
    }
  };
  

  const handleSave = async () => {
    if (!editUser || !editUser.username || !editUser.email) {
      alert('Please fill in all the required fields.');
      return;
    }

    const emailOld = localStorage.getItem("email"); 
    const emailNew = editUser.email;
    const usernameNew = editUser.username;
    const addressList = editUser.addresses;

    const token = localStorage.getItem("token");
    const headers = {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    };

    console.log(JSON.stringify({
      emailOld,
      emailNew,
      usernameNew,
      addressList
    }, null, 2));

    const response = await fetch('http://localhost:1144/admin/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ emailOld, emailNew, usernameNew, addressList }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('User updated successfully!');
      setUsers(prev => prev.map(u => (u.id === editUser.id ? editUser : u)));
      setSelectedUser(null);
    } else {
      alert(data.message || 'Error updating user.');
    }
  };

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedUser(null);
  };

  const handleAddressChange = (index, key, value) => {
    const updatedAddresses = [...editUser.addresses];
    updatedAddresses[index][key] = value;
    setEditUser({ ...editUser, addresses: updatedAddresses });
  };

  const handleAddAddress = () => {
    setEditUser({ ...editUser, addresses: [...editUser.addresses, emptyAddress] });
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = editUser.addresses.filter((_, i) => i !== index);
    setEditUser({ ...editUser, addresses: updatedAddresses });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map(user => (
          <div key={user.id || user.username} className="bg-white dark:bg-blue-500 shadow-lg rounded-lg overflow-hidden">
            <img 
              src={user?.imgURL && user.imgURL !== "defaultProfileImg" ? user.imgURL : icon} 
              alt={user.username} 
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{user.username}</h3>
              <p>{user.email}</p>
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => handleEditClick(user)}>Edit</button>
              <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded disabled:opacity-50" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
        <span>{currentPage} / {totalPages}</span>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>

      {selectedUser && (
        <div className="bg-white dark:bg-blue-500 shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Edit User</h2>
          <input
            className="mb-4 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
            value={editUser.username}
            onChange={e => setEditUser({ ...editUser, username: e.target.value })}
            placeholder="Username"
          />
          <input
            className="mb-4 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
            value={editUser.email}
            onChange={e => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
            {editUser.addresses?.map((address, index) => (
              <div key={index} className="border p-4 rounded mb-2">
                <input
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
                  value={address.addressType}
                  onChange={(e) => handleAddressChange(index, 'addressType', e.target.value)}
                  placeholder="Address Type"
                />
                <input
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
                  value={address.shortAddress}
                  onChange={(e) => handleAddressChange(index, 'shortAddress', e.target.value)}
                  placeholder="Short Name (Unique)"
                />
                <input
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
                  value={address.realAddress}
                  onChange={(e) => handleAddressChange(index, 'realAddress', e.target.value)}
                  placeholder="Full Address"
                />
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDeleteAddress(index)}
                >
                  Delete Address
                </button>
              </div>
            ))}
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddAddress}
            >
              Add Address
            </button>
          </div>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={() => setSelectedUser(null)}>Cancel</button>
          <button className="mt-4 bg-blue-400 dark:bg-white text-white dark:text-blue-500 px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white ml-5" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UsersCom;
