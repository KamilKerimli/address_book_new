import React, { useEffect, useState } from 'react';
import dfltImg from "../../assets/defaultProfileImg.png";

const AdvencedSearchCom = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`http://localhost:1144/users/getUsers`, {
          method: 'GET'
      });

      const result = await response.json();

      if (!response.ok) {
          alert(result.message);
          return;
      }

      const emailFromStorage = localStorage.getItem("email");

      const updatedUsers = result.users
          .filter(user => user.email === emailFromStorage)
          .map(user => ({
              ...user,
              isFavorited: false
          }));

      setUsers(updatedUsers);
    };

    getUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const paginatedUsers = filteredUsers.slice(start, end);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const toggleFavorite = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, isFavorited: !user.isFavorited } : user
    ));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold w-full text-center my-6">Welcome search tab </h1>
      </div>

      <div className="mb-4 bg-white dark:bg-blue-600 rounded-lg shadow-md p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username, or phone..."
          className="w-full p-2 border border-gray-300 dark:border-blue-600 dark:bg-blue-400 dark:text-white dark:placeholder:text-white rounded-md"
        />
      </div>

      <div className="adv-users-table bg-white dark:bg-gray-700 rounded shadow-md overflow-x-auto">
        <div className="overflow-hidden rounded-lg border border-transparent dark:border-gray-700">
          <table className="min-w-full">
            <thead className="bg-gray-200 w-full dark:bg-blue-500 rounded-t-lg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-blue-600 divide-y divide-gray-300 rounded-b-lg">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="text-gray-500 dark:text-white">No users found.</p>
                  </td>
                </tr>
              ) : (
                paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={user.profileImg === "defaultProfileImg" ? user.imgURL : dfltImg} alt={user.username} className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{user.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button onClick={() => toggleFavorite(user.id)} className="ml-2 focus:outline-none">
                          <img
                            src={user.isFavorited ? 'https://img.icons8.com/color/48/000000/hearts.png' : 'https://img.icons8.com/ios/50/000000/hearts.png'}
                            alt="heart"
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div id="usersCards" className="adv-users-cards">
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : 
        (paginatedUsers.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={user.imgURL === "defaultProfileImg" ? user.imgURL : dfltImg} alt={user.username} className="w-10 h-10 rounded-full" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.phoneNumber}</div>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => toggleFavorite(user.id)} className="ml-2 focus:outline-none">
                  <img
                    src={user.isFavorited ? 'https://img.icons8.com/color/48/000000/hearts.png' : 'https://img.icons8.com/ios/50/000000/hearts.png'}
                    alt="heart"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        )))}
      </div>

      {
        paginatedUsers.length === 0 ? null : (
          <div className="mt-4 flex justify-center items-center">
            <button onClick={prevPage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Previous</button>
            <span className="text-sm text-gray-700 mx-4">Page {currentPage} of {totalPages}</span>
            <button onClick={nextPage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Next</button>
          </div>
        )
      }
    </div>
  );
};

export default AdvencedSearchCom;
