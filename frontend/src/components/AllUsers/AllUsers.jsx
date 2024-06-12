import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"; // Import io from socket.io-client
import { host } from '../../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import addUser from "../.././assets/add user.png";
import userAdded from "../../assets/user added.png";
import GroupDetailsForm from '../../pages/GroupDetailsForm/GroupDetailsForm';
function AllUsers() {
    const socket = useState(null); // Initialize socket state

    const [allUsersfromDataBase, setAllUsersFromDataBase] = useState([]);
    // const [socket, newSocket] = useState(null);
    const [localStorageUser, setLocalStorageUser] = useState();

    // added user in the objects
    const [addedUsers, setAddedUsers] = useState({});


    const [addUserFlag, setAddUserFlag] = useState(false);
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

    // start of the add user button in the making group

    const handleUserAddButton = (user) => {

        // console.log(user);
        setAddedUsers(prevState => ({
            ...prevState, // Spread previous state to keep existing users
            [user._id]: user // Add the new user using its _id as the key
        }));

        // console.log("this is my added users data bhai !", addedUsers);
        toast.success(`hello dear ${user.username} is added succesfully to your group`);
    }

    // useEffect to update addUserFlag immediately after addedUsers state changes
    useEffect(() => {

    }, [addedUsers]);

    // start of the add user button in the making of the group

    // start of the add user button in the making group

    const handleRemoveUser = (user) => {
        console.log(user);
        setAddUserFlag(true);
    }

    // start of the add user button in the making of the group


    // this is start of the creating the group

    const handleCreateGroupButton = () => {
        setAddUserFlag(true);
    }

    // this is end of the creating the group


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-8">All Users</h1>
            {allUsersfromDataBase.length > 0 ? (
                <>


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
                                    <div className=' flex space-x-4 justify-between'>

                                        <button
                                            onClick={() => handleDirectMessage(user)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                                        >
                                            Message {user.username}
                                        </button>
                                        <button onClick={() => handleUserAddButton(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <img src={addUser} alt="adduser button" className='w-5 h-5' />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}




                    </div>

                    {
                        addUserFlag == false ? (<> <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                            <h4 className="text-lg font-semibold mb-4">Click to create a new Group</h4>
                            <button onClick={handleCreateGroupButton} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Click</button>
                        </div></>) : (<></>)
                    }




                    <div>
                        {
                            addUserFlag == true ? (

                                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                                    <h2 className="text-2xl font-semibold text-center mb-8">Create a New Group</h2>

                                    {/* GroupDetailsForm component */}
                                    <GroupDetailsForm addedUsers={addedUsers} localStorageUser={localStorageUser} />
                                </div>
                            ) : (<><p className="text-lg text-center text-gray-700">Add users to create a group together!</p>
                            </>)
                        }

                    </div>
                </>
            ) : (
                <p>No users found.</p>
            )}
            <ToastContainer />
        </div>
    );
}

export default AllUsers;
