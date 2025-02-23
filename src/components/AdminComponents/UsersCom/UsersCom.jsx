import React, { useState, useEffect } from 'react';

const UsersCom = () => {
  const emptyAddress = { type: '', shortName: '', fullAddress: '' };
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    // Test üçün istifadəçi məlumatları
    const fetchedUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      username: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      addresses: [
        { type: 'Home', shortName: 'H1', fullAddress: '123 Main St' },
        { type: 'Work', shortName: 'W1', fullAddress: '456 Office Blvd' }
      ]
    }));
    setUsers(fetchedUsers);
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditUser({ ...user, addresses: [...user.addresses] });
    setSelectedUser(user);
    setEditUser({ ...user });
  };

  const handleSave = () => {
    const isUniqueShortName = editUser.addresses.every((addr, index, self) => self.findIndex(a => a.shortName === addr.shortName) === index);
    if (!isUniqueShortName) {
      alert('Address short names must be unique.');
      return;
    }
    setUsers(prev => prev.map(u => (u.id === editUser.id ? editUser : u)));
    setSelectedUser(null);
  };

  const handleDelete = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedUsers.map(user => (
          <div key={user.id} className="bg-white dark:bg-blue-500 shadow-lg rounded-lg overflow-hidden">
            <img src={user.image} alt={user.username} className="w-full h-80 object-cover" />
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
            value={editUser.username} onChange={e => setEditUser({ ...editUser, username: e.target.value })} placeholder="Username"/>
          <input 
            className="mb-4 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
            value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} placeholder="Email" />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Addresses</h3>
            {editUser.addresses.map((address, index) => (
              <div key={index} className="border p-4 rounded mb-2">
                <input 
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                  value={address.type} onChange={e => {
                    const updatedAddresses = [...editUser.addresses];
                    updatedAddresses[index].type = e.target.value;
                    setEditUser({ ...editUser, addresses: updatedAddresses });
                  }} placeholder="Address Type" />
                <input 
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                  value={address.shortName} onChange={e => {
                    const updatedAddresses = [...editUser.addresses];
                    updatedAddresses[index].shortName = e.target.value;
                    setEditUser({ ...editUser, addresses: updatedAddresses });
                  }} placeholder="Short Name (Unique)" />
                <input 
                  className="mb-2 w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100" 
                  value={address.fullAddress} onChange={e => {
                    const updatedAddresses = [...editUser.addresses];
                    updatedAddresses[index].fullAddress = e.target.value;
                    setEditUser({ ...editUser, addresses: updatedAddresses });
                  }} placeholder="Full Address" />
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => {
                  const updatedAddresses = editUser.addresses.filter((_, i) => i !== index);
                  setEditUser({ ...editUser, addresses: updatedAddresses });
                }}>Delete Address</button>
              </div>
            ))}
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setEditUser({ ...editUser, addresses: [...editUser.addresses, emptyAddress] })}>Add Address</button>
          </div>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={() => setSelectedUser(null)}>Cancel</button>
          <button className="mt-4 bg-blue-400 dark:bg-white text-white dark:text-blue-500 px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white ml-5" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UsersCom;