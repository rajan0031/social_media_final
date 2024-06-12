import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addGroupMessageToDataBase } from '../../../utils/GroupMessagesApiRoutes/GroupMessagesApiRoutes';
import axios from 'axios';

import { getGroupMessageToDataBase } from '../../../utils/GroupMessagesApiRoutes/GroupMessagesApiRoutes';
import { characterColors } from '../../Data/ColorData/ColorData';

import { useNavigate } from 'react-router-dom';




function GroupChatRoom() {

    const location = useLocation();
    const group = location.state?.group;

    const [message, setMessage] = useState("");
    const [messagesFromDataBase, setMessagesFromDataBase] = useState([]);
    const [localStorageUser, setLocalStorageUser] = useState();

    const navigate = useNavigate();


    useState(() => {
        const localUser = JSON.parse(localStorage.getItem('blog-user'));
        setLocalStorageUser(localUser);
        console.log(localUser);
    }, []);

    // use Effects for the checking the map working

    useEffect(() => {

        console.log(characterColors.get('a'));

    }, [])

    //end oof the checking the map working


    // Handle sending a message
    const handleSendMessage = async () => {
        try {


            const response = await axios.post(`${addGroupMessageToDataBase}`, {
                groupId: group._id,
                currentUserId: localStorageUser._id,
                currentUserName: localStorageUser.username,
                messageData: message,
                date: new Date().toLocaleString('en-US'),
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        setMessage("");
    };




    // Fetch messages from the database
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${getGroupMessageToDataBase}?groupId=${group._id}`);
                if (response.data.response) {
                    setMessagesFromDataBase(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, [group._id, message, messagesFromDataBase]);


    // start of the handle edit functionality

    const handleEdit = () => {

    }

    // end of the handle edit functionality

    // start of the handle Delete functionality

    const handleDelete = () => {

    }

    // end of the handle delete functionality

    // start of the handling the group information handling

    const handleGroupInformation = () => {
        // console.log("clicked");
        navigate("/groupinformation", {
            state: {
                group: group,
            }
        })
    }

    // end of the handling the group information handling





    return (
        <div className="flex flex-col h-screen">
            <div onClick={handleGroupInformation} className="bg-gray-800 text-white p-4 flex items-center cursor-pointer">
                <img
                    src={group.profileLink}
                    alt="Group Profile"
                    className="h-10 w-10 rounded-full mr-2"
                />
                <h1 className="text-2xl font-bold">{group.groupName}</h1>
                <div>
                    <p className=" text-xs ml-2">Tap here for group info</p>
                </div>
            </div>
            <div className="flex-grow bg-gray-200 p-4 overflow-y-auto">
                <div className="custom-scrollbar">
                    {messagesFromDataBase.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex justify-${((msg.currentUserId === localStorageUser._id) || (msg.currentUserName === localStorageUser.username)) ? 'end' : 'start'} mb-4`}
                        >
                            <div
                                className={`bg-${msg.currentUserId === localStorageUser._id ? 'blue' : 'green'
                                    }-500 text-white p-3 rounded max-w-3/4`}
                            >
                                <p className="mb-1">{msg.messageData}</p>
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs text-${characterColors.get(msg.currentUserName[0])}-700`}>
                                        {msg.currentUserId === localStorageUser._id ? (<><span className={`text-${characterColors.get(msg.currentUserName[0])}-700`}>{localStorageUser.username}</span></>) : (<><span className={`text-${characterColors.get(localStorageUser.username[0])}-700`}>{msg.currentUserName}</span></>)}
                                    </span>

                                    {msg.currentUserId === localStorageUser._id && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(msg)}
                                                className="text-xs text-gray-300 hover:text-gray-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(msg)}
                                                className="text-xs text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-gray-800 p-4 flex items-center">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    placeholder="Enter your message"
                    className="flex-grow p-2 rounded border border-gray-300 mr-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div >
    );
}

export default GroupChatRoom;
