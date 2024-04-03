import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"; // Import io from socket.io-client
import { host } from '../../../utils/apiRoutes';

function AllUsers() {
    const socket = useState(null); // Initialize socket state

    const [allUsersfromDataBase, setAllUsersFromDataBase] = useState([]);
    // const [socket, newSocket] = useState(null);
    const [localStorageUser, setLocalStorageUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(getAllusers);
                console.log(response);
                setAllUsersFromDataBase(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                console.log("the local ::", userDetails._id);
                if (!userDetails) {
                    navigate("/register");
                } else {
                    setLocalStorageUser(userDetails);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);

    // Establish socket connection when localStorageUser is set
    useEffect(() => {
        if (localStorageUser) {
            const newSocket = io(host); // Initialize socket connection
            newSocket.on('connect', () => {
                console.log('Socket connected'); // Log when socket is connected
                newSocket.emit("add-user", localStorageUser._id);
            });
            // setSocket(newSocket); // Set the socket in state
        }
    }, [localStorageUser]);

    const handleDirectMessage = (user) => {

        // console.log(socket);
        navigate("/directmessage", {
            state: {
                from: localStorageUser._id,
                to: user._id,
                fromName: localStorageUser.username,
                toName: user.username,
                socketId: socket.id, // Use socket id from state
            },
        });
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-8">All Users</h1>
            {allUsersfromDataBase.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allUsersfromDataBase.map((user, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="p-6">
                                <div className="text-3xl font-bold text-center mb-4">
                                    {user.username}
                                </div>
                                <button
                                    onClick={() => handleDirectMessage(user)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                                >
                                    Message {user.username}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default AllUsers;
