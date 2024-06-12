import React, { useState } from 'react';
import GroupChatRoom from '../../components/GroupChatRoom/GroupChatRoom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addGroupChatRoomMessage } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';

function GroupDetailsForm({ addedUsers, localStorageUser }) {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [admins, setAdmins] = useState('');
    const [isAdminOnlyMessage, setIsAdminOnlyMessage] = useState(false);

    // using the  navigation system here

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();


        // console.log(localStorageUser);

        // console.log("Group Name:", groupName);
        // console.log("Group Description:", groupDescription);
        // console.log("Profile Link:", profileLink);
        // console.log("Admins:", admins);
        // console.log("isAdminOnlyMessage:", isAdminOnlyMessage);

        // // start f the  now sending the entered data from the frontend to the backend

        const response = await axios.post(`${addGroupChatRoomMessage}`, {
            groupName: groupName,
            groupDescription: groupDescription,
            profileLink: profileLink,
            admins: admins,
            isAdminOnlyMessage: isAdminOnlyMessage,
            allMembersDetails: addedUsers,
            GroupCreatorId: localStorageUser._id,
        });

        console.log(response);

        // End of the f the  now sending the entered data from the frontend to the backend


        if (response) {


            navigate("/groupchatroom", {
                state: {
                    groupName: groupName,
                    groupDescription: groupDescription,
                    profileLink: profileLink,
                    admins: admins,
                    isAdminOnlyMessage: isAdminOnlyMessage,
                    allMembersDetails: addedUsers,

                }
            })
        }
    }

    // trying to print the user 

    useState(() => {
        console.log("thi sis the GroupDetails form ::", typeof addedUsers);
    }, [])

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center py-4 bg-blue-500 text-white rounded-t-lg">Group Details Form</h2>
            <form className="p-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Enter the Group Name</label>
                    <input type="text" id="groupName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-700">Add Group Description</label>
                    <textarea id="groupDescription" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="profileLink" className="block text-sm font-medium text-gray-700">Add Profile Link</label>
                    <input type="text" id="profileLink" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={profileLink} onChange={(e) => setProfileLink(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="admins" className="block text-sm font-medium text-gray-700">Write the Admin's Username</label>
                    <input id="admins" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" value={admins} onChange={(e) => setAdmins(e.target.value)} />
                </div>
                <div className="mb-4 flex items-center">
                    <input type="checkbox" id="isAdminOnlyMessage" className="mr-2 rounded focus:ring-blue-500 text-blue-500" checked={isAdminOnlyMessage} onChange={(e) => setIsAdminOnlyMessage(e.target.checked)} />
                    <label htmlFor="isAdminOnlyMessage" className="text-sm font-medium text-gray-700">Only Admin Can Send Messages</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">Create Group</button>
                </div>
            </form>
        </div>
    );

}

export default GroupDetailsForm;
