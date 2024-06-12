import React, { useEffect, useState } from 'react';
import { json, useLocation } from 'react-router-dom';
import groupSettings from "../../assets/group settings.png"
import AllUsers from '../../components/AllUsers/AllUsers';
import AddNewMembersToGroup from '../AddNewMembersToGroup/AddNewMembersToGroup';
import deleteUser from "../../assets/bin.png"
import { removeUserFromGroup } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';
import axios from 'axios';

function GroupInformation() {
    const location = useLocation();
    const group = location.state?.group;
    const [addMembersFlags, setAddMembersFlags] = useState(false);
    const [localStorageUser, setLocalStorageUser] = useState();

    // start of the opening and closing the model code 

    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
    };

    //end of the opening and closing the model code


    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('blog-user'));
        setLocalStorageUser(localUser);
    }, []);



    // start of the adding a group member in the group

    const handleAddNewUserToGroup = (group) => {
        setAddMembersFlags(true);
        // console.log(group);
    }

    // end of the adding a member to the group

    // this is the start of the removeal of the user from the group

    const handleRemoveMemberFromGroup = async (member) => {

        try {

            const response = await axios.post(`${removeUserFromGroup}`, {
                groupId: group._id,
                memberId: member._id,
            });

            console.log(response);


        } catch (err) {
            console.log(err);
        }

        // console.log(member);

    }

    // this is the emd of the user removeal from the group


    // start of the function for handling the group settings

    const handleGroupSettings = () => {
        console.log("clicked")

    }

    //end of the function for handling the group settings

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4 flex items-center justify-center">
                    <img
                        src={group.profileLink}
                        alt="Group Profile"
                        className="h-32 w-auto object-cover rounded-md"
                    />
                </div>
                <div className="p-0">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{group.groupName}</h2>
                    <p className="text-sm text-gray-600 mb-4">{group.groupDescription}</p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Members</h3>
                    <ul>
                        <div className="flex items-center justify-start p-4 bg-gray-100 rounded shadow-md">
                            <p className="text-lg font-medium text-gray-700 mr-2">
                                Click here to change settings
                            </p>
                            <button
                                onClick={toggleModal}

                                // {isOpen && (
                                //     <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={closeModal}></div>
                                // )}

                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                                <img className="w-5 h-5" src={groupSettings} alt="Group Settings" />
                            </button>
                        </div>
                        {Object.values(group.allMembersDetails).map(member => (
                            <li key={member._id} className="flex items-center py-2">

                                {
                                    group.admins.includes(member.username) ? (
                                        <div className="flex items-center">
                                            <span className="bg-green-400 text-white px-2 py-1 rounded-full text-xs mr-2">Admin</span>
                                            <p className="text-gray-800 hover:text-blue-500 cursor-pointer" /* Add hover effect here */>{member.username}</p>
                                        </div>

                                    ) : (
                                        <p className="text-gray-800">{member.username}</p>
                                    )
                                }




                                <div className="ml-auto flex items-center"> {/* Added ml-auto */}
                                    <div className="flex space-x-9">

                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm ">
                                            View Profile
                                        </button>
                                        {
                                            group?.admins === localStorageUser?.username ? (<> <button onClick={() => handleRemoveMemberFromGroup(member)}>
                                                <img className='h-5 w-5' src={deleteUser} alt="" />
                                            </button></>) : (<></>)
                                        }

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4 bg-gray-200 rounded-md shadow-md">


                {
                    addMembersFlags == true ? (<><AddNewMembersToGroup group={group} /></>) : (<>  <h2>Click on add members to add a new users</h2>
                        <button
                            onClick={() => handleAddNewUserToGroup(group)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Members
                        </button></>)
                }



            </div>

        </div>
    );
}

export default GroupInformation;
