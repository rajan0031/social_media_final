import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
// import axios from 'axios';
import { addANewMemberToGroup } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function AddNewMembersToGroup({ group }) {
    // useState hooks for managing state
    const [AllusersFromDataBase, setAllUsersFromDataBase] = useState([]);

    const [AddUserFlag, setAddUserFlag] = useState([]);

    const [usersArray, setUsersArray] = useState([]);
    const [alreadyGroupsMembers, setAlreadyGroupsMembers] = useState([]);

    const [GroupData, setGroupData] = useState();

    const navigate = useNavigate();


    // useEffect to fetch users from the database
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






    // Function to handle adding new members
    const handleAddNewMember = (user, index) => {
        // Setting flag for the button
        const newFlags = [...AddUserFlag];
        newFlags[index] = true;
        setAddUserFlag(newFlags);

        // Adding the user to the usersArray
        setUsersArray(prev => [...prev, user]);

        console.log(usersArray);

    };

    // this is the start of the addaddMemberToGroup

    const addMemberToGroup = async () => {
        console.log("clicked");
        console.log(usersArray);

        try {

            const response = await axios.post(`${addANewMemberToGroup}`, {
                usersArray: usersArray,
                groupId: group._id,
            });
            // console.log(response);
            if (response) {
                toast.success("Member is added successfully");
            }

        } catch (err) {
            console.log(err);
        }
        navigate("/userprofile");

    }

    // this is the end of teh addMemberToGroup

    return (

        <>


            <div className="bg-gray-100 p-4">
                <h1 className="text-xl font-semibold mb-4">Add New Members to Group</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mapping over users and rendering user cards */}
                    {AllusersFromDataBase &&
                        AllusersFromDataBase.map((user, index) => (



                            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                                {/* Render user details here */}
                                <p className="font-semibold">{user.username}</p>
                                <div className="mt-2">
                                    {/* Conditional rendering of buttons */}
                                    {AddUserFlag[index] === true ? (
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Cancel</button>
                                    ) : (
                                        <button
                                            onClick={() => handleAddNewMember(user, index)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-md">
                <button onClick={addMemberToGroup} className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">Add members</button>
            </div>


        </>
    );
}

export default AddNewMembersToGroup;
