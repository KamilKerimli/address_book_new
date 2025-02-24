import React, { useState, useEffect } from 'react';

const Notifications = () => {
    const [usersData, setUsersDate] = useState([
        { id: 1, name: "John Doe", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-01") },
        { id: 2, name: "Jane Smith", profileImg: "https://via.placeholder.com/40", status: "Disliked", timestamp: new Date("2023-10-02") },
        { id: 3, name: "Alice Johnson", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-03") },
        { id: 4, name: "Bob Brown", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", timestamp: new Date("2023-10-04") },
        { id: 5, name: "Charlie Davis", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-05") },
        { id: 6, name: "Eve White", profileImg: "https://via.placeholder.com/40", status: "Disliked", timestamp: new Date("2023-10-06") },
        { id: 7, name: "Frank Wilson", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", timestamp: new Date("2023-10-07") },
        { id: 8, name: "Grace Lee", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-08") },
        { id: 9, name: "Hank Green", profileImg: "https://via.placeholder.com/40", status: "Disliked", timestamp: new Date("2023-10-09") },
        { id: 10, name: "Ivy Hall", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", timestamp: new Date("2023-10-10") },
        { id: 11, name: "Jack King", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-11") },
        { id: 12, name: "Karen Hill", profileImg: "https://via.placeholder.com/40", status: "Disliked", timestamp: new Date("2023-10-12") },
        { id: 13, name: "Leo Adams", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-13") },
        { id: 14, name: "Mona Scott", profileImg: "https://via.placeholder.com/40", status: "AddFavorite", timestamp: new Date("2023-10-14") },
        { id: 15, name: "Nina Patel", profileImg: "https://via.placeholder.com/40", status: "Liked", timestamp: new Date("2023-10-15") },
    ]);

    const [users, setUsers] = useState(usersData);
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;


    useEffect(() => {
        let filteredUsers = usersData;

        if (filter === "liked") {
            filteredUsers = usersData.filter(user => user.status === "Liked");
        } else if (filter === "disliked") {
            filteredUsers = usersData.filter(user => user.status === "Disliked");
        } else if (filter === "favorite") {
            filteredUsers = usersData.filter(user => user.status === "AddFavorite");
        }

        filteredUsers.sort((a, b) => b.timestamp - a.timestamp);
        setUsers(filteredUsers);
        setCurrentPage(1);
    }, [filter]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <div className="flex items-center space-x-4">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)} 
                        className="p-2 border border-gray-300 dark:border-blue-600 rounded-md dark:bg-blue-600">
                        <option value="all">All</option>
                        <option value="liked">Liked</option>
                        <option value="disliked">Disliked</option>
                        <option value="favorite">AddFavorite</option>
                    </select>
                </div>
            </div>

            {/* Desktop: Table View */}
            <div className="hidden md:block">
                <table className="min-w-full bg-white dark:bg-blue-500 rounded-lg shadow-md">
                    <thead className="bg-gray-50 dark:bg-blue-400">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase">Profile & Username</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentUsers.map(user => (
                            <tr key={user.id} >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <img src={user.profileImg} alt={user.name} className="w-10 h-10 rounded-full" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-300">{user.status}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile: Card View */}
            <div className="md:hidden">
                {currentUsers.map(user => (
                    <div key={user.id} className="bg-white dark:bg-blue-500 shadow-md p-4">
                        <div className="flex items-center">
                            <img src={user.profileImg} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-300">{user.status}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 mb-10 flex justify-center items-center space-x-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Notifications;
