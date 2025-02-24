import React, { useState } from 'react';

const FavoritesCom = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", profileImg: "https://via.placeholder.com/40", status: "Liked", isFavorite: false, timestamp: new Date("2023-10-01") },
        { id: 2, name: "Jane Smith", profileImg: "https://via.placeholder.com/40", status: "Disliked", isFavorite: false, timestamp: new Date("2023-10-02") },
        { id: 3, name: "Alice Johnson", profileImg: "https://via.placeholder.com/40", status: "Liked", isFavorite: true, timestamp: new Date("2023-10-03") },
        { id: 4, name: "Bob Brown", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", isFavorite: true, timestamp: new Date("2023-10-04") },
        { id: 5, name: "Charlie Davis", profileImg: "https://via.placeholder.com/40", status: "Liked", isFavorite: false, timestamp: new Date("2023-10-05") },
        { id: 6, name: "Eve White", profileImg: "https://via.placeholder.com/40", status: "Disliked", isFavorite: false, timestamp: new Date("2023-10-06") },
        { id: 7, name: "Frank Wilson", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", isFavorite: true, timestamp: new Date("2023-10-07") },
        { id: 8, name: "Grace Lee", profileImg: "https://via.placeholder.com/40", status: "Liked", isFavorite: false, timestamp: new Date("2023-10-08") },
        { id: 9, name: "Hank Green", profileImg: "https://via.placeholder.com/40", status: "Disliked", isFavorite: false, timestamp: new Date("2023-10-09") },
        { id: 10, name: "Ivy Hall", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", isFavorite: true, timestamp: new Date("2023-10-10") },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5); // Hər səhifədə 5 istifadəçi göstər

    const toggleFavorite = (userId) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user
        ));
    };

    const sortedUsers = [...users].sort((a, b) => b.timestamp - a.timestamp);

    // Pagination üçün hesablamalar
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mx-auto p-4 dark:text-white">
            <h1 className="text-2xl font-bold w-full text-center mt-5 mb-8">Favorites</h1>

            {/* Table View (Desktop) */}
            <div className="users-table bg-white dark:bg-blue-400 rounded-lg shadow-md overflow-x-auto hidden md:block">
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-blue-400">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Profile</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-blue-300 divide-y divide-gray-200">
                        {currentUsers.map(user => (
                            <tr key={user.id} className='bg-'>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={user.profileImg} alt={user.name} className="w-10 h-10 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.status}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <a href={`/user/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Details</a>
                                        <button onClick={() => toggleFavorite(user.id)} className="ml-2 focus:outline-none">
                                            <img src={user.isFavorite ? 'https://img.icons8.com/color/48/000000/hearts.png' : 'https://img.icons8.com/ios/50/000000/hearts.png'} alt="heart" className="w-6 h-6" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card View (Mobile) */}
            <div className="users-cards md:hidden">
                {currentUsers.map(user => (
                    <div key={user.id} className="bg-white dark:bg-blue-300 shadow-md p-4 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <img src={user.profileImg} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.status}</div>
                                </div>
                            </div>
                            <button onClick={() => toggleFavorite(user.id)} className="ml-2 focus:outline-none">
                                <img src={user.isFavorite ? 'https://img.icons8.com/color/48/000000/hearts.png' : 'https://img.icons8.com/ios/50/000000/hearts.png'} alt="heart" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 items-center space-x-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>

                <span className="text-lg font-medium">
                    {currentPage} / {Math.ceil(sortedUsers.length / usersPerPage)}
                </span>

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(sortedUsers.length / usersPerPage)}
                    className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(sortedUsers.length / usersPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FavoritesCom;
