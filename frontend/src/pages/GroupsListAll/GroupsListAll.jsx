import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { getAllGroupsDetails } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';

import { useNavigate } from 'react-router-dom'



function GroupsListAll() {
    const location = useLocation();
    const user = location.state?.user;
    const [groupListFromDataBase, setGroupListFromDataBase] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        const fetchGroupList = async () => {
            try {
                const response = await axios.post(getAllGroupsDetails, {
                    GroupCreatorId: user._id,
                });
                if (response) {
                    setGroupListFromDataBase(response.data.response);
                    console.log(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching group list:', error);
            }
        };
        fetchGroupList();
    }, [user._id]);

    // start of the handling the group details and the group direct message

    const handleGroupDirectMessage = (group) => {
        console.log(group);
        navigate("/groupchatroom", {
            state: {
                group: group
            }
        })
    }

    // end of the handling the group direct messgae


    return (
        <div className="container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">All Groups</h1>
            <ul className="divide-y divide-gray-200">
                {groupListFromDataBase.map(group => (
                    <li onClick={() => handleGroupDirectMessage(group)} key={group._id} className="py-4 group-item">
                        <div className="flex items-center space-x-4 hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg p-4 shadow-md">
                            <img src={group.profileLink} alt="Group Profile" className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <p className="text-lg font-semibold">{group.groupName}</p>
                                <p className="text-gray-600">Created by: {group.admins}</p>
                                {/* Render other group details as needed */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroupsListAll;
