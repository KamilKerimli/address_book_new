import React, { useState, useEffect, useRef } from "react";

const usersData = [
  { id: 1, name: "John Doe", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: false },
  { id: 2, name: "Jane Smith", profileImg: "https://via.placeholder.com/40", isActive: false, isAdmin: true },
  { id: 3, name: "Alice Johnson", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: false },
  { id: 4, name: "Bob Brown", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: false },
  { id: 5, name: "Charlie Davis", profileImg: "https://via.placeholder.com/40", isActive: false, isAdmin: false },
  { id: 6, name: "Eve White", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: true },
  { id: 7, name: "Frank Wilson", profileImg: "https://via.placeholder.com/40", isActive: false, isAdmin: false },
  { id: 8, name: "Grace Lee", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: false },
  { id: 9, name: "Hank Green", profileImg: "https://via.placeholder.com/40", isActive: true, isAdmin: false },
  { id: 10, name: "Ivy Hall", profileImg: "https://via.placeholder.com/40", isActive: false, isAdmin: false },
];

const RolesCom = () => {
  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const displayUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const deleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const toggleAdmin = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user => user.id === id ? { ...user, isAdmin: !user.isAdmin } : user)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <SearchBar setSearchTerm={setSearchTerm} />

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-blue-500">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-white">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-blue-400 divide-y divide-gray-200">
            {displayUsers.map(user => (
              <UserRow key={user.id} user={user} deleteUser={deleteUser} toggleAdmin={toggleAdmin} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

const UserRow = ({ user, deleteUser, toggleAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleAdmin = () => {
    toggleAdmin(user.id);
    setIsMenuOpen(false); // Seçim edildikdə menyunu bağla
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={user.profileImg} alt={user.name} className="w-10 h-10 rounded-full" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap"><p className="w-full texte-center">{user.name}</p></td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-sm rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="relative inline-block text-left" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button onClick={handleToggleAdmin} className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {user.isAdmin ? 'Set as User' : 'Set as Admin'}
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const SearchBar = ({ setSearchTerm }) => (
  <div className="mb-4">
    <input
      type="text"
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search users..."
      className="w-full p-2 border border-black dark:border-blue-400 rounded-lg focus:ring dark:focus:ring-blue-300 focus:ring-black dark:bg-blue-400 dark:text-white dark:placeholder:text-gray-100"
    />
  </div>
);

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="mt-4 flex justify-center items-center">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
    >Previous</button>
    <span className="text-sm text-gray-700 dark:text-white mx-4">Page {currentPage} of {totalPages}</span>
    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
    >Next</button>
  </div>
);

export default RolesCom;