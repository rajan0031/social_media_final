import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { addMessage } from '../../utils/apiRoutes';
import { toast } from 'react-toastify';
import { getAllMessage } from '../../utils/apiRoutes';
import { editMessage } from '../../utils/message_edit_and_delete_api_routes/messageEditDeleteApiRoutes';
import { deleteMessage } from '../../utils/message_edit_and_delete_api_routes/messageEditDeleteApiRoutes';
import { io } from "socket.io-client";
import deleteMessageIcons from "../assets/delete message.gif"
import EditMessageIcons from "../assets/editMessage.gif";

function DirectMessage() {
    const location = useLocation();
    const from = location.state?.from;
    const to = location.state?.to;
    const fromName = location.state?.fromName;
    const toName = location.state?.toName;
    const socketId = location.state?.socketId; // Retrieve socket ID from location state

    // Initialize socket using the received socket ID, if available
    const socket = useRef(socketId ? io(socketId) : null);
    const scrollRef = useRef();

    useState(() => {
        console.log(socketId)
    }, [])

    const [message, setMessage] = useState(''); // Changed from array to string
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messagesFromDataBase, setMessagesFromDatabase] = useState([]);
    const [messageId, setMessageId] = useState("");
    const [isEditingMessage, setIsEditingMessage] = useState(false);
    const [functionState1, setFunctionState1] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleInputmessage = (e) => {
        setMessage(e.target.value);
    }

    const handleMessageSend = async () => {
        setFunctionState1(true);
        setFlag(true);

        try {
            if (message.trim().length > 0) { // Trim message before checking length
                const response = await axios.post(`${addMessage}`, {
                    from: from,
                    to: to,
                    message: message,
                    fromName: fromName,
                    toName: toName,
                });


                if (response) {
                    toast.success("Message sent");
                }

                // const response1 = await axios.post(`${getAllMessage}`, {
                //     from: from,
                //     to: to,
                // });
                // setMessagesFromDatabase(response1.data.response);

            }
            else {
                console.log("Message is empty");
            }
        } catch (err) {
            console.log(err)
        }

        setMessage(""); // Clear message input after sending

        if (socket.current) {
            socket.current.emit("send-msg", {
                to: to,
                from: from,
                message: message,
            });
        } else {
            console.log("Socket object is NULL");
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (message) => {
                setArrivalMessage({
                    fromSelf: false,
                    message: message
                });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessagesFromDatabase(prevMessages => [...prevMessages, arrivalMessage]); // Update messagesFromDatabase
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesFromDataBase]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleMessageSend();
        }
    };

    const handleEdit = async (msg) => {
        setIsEditingMessage(true);
        setMessage(msg.message);
        setMessageId(msg._id);
    }

    const handleDelete = async (msg) => {
        console.log("delete", msg._id);
        try {
            const response = await axios.post(`${deleteMessage}`, {
                msgId: msg._id,
            });
            console.log(response);
            if (response) {
                toast.error("Your message is deleted"); // Corrected toast.error
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleMessageFinalEdit = async () => {
        try {
            const response = await axios.post(`${editMessage}`, {
                msgId: messageId,
                newMessage: message,
            });
            console.log(response);
            if (response) {
                toast.success("Your message is edited successfully");
            }
        } catch (err) {
            console.log(err);
        }
        // start of the testing fetch message

        // end of the testing the fetch message

        setMessage("");
        setIsEditingMessage(false);
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(`${getAllMessage}`, {
                    from: from,
                    to: to,
                });
                setMessagesFromDatabase(response.data.response);
            } catch (err) {
                console.log(err)
            }
        }
        fetchMessages();
    }, [messagesFromDataBase]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex-grow overflow-auto p-4">
                {messagesFromDataBase.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex justify-${msg.from === from ? 'end' : 'start'} mb-4`}
                    >
                        <div
                            className={`bg-${msg.from === from ? 'blue' : 'green'
                                }-500 text-white p-3 rounded max-w-3/4`}
                        >
                            <p className="mb-1">{msg.message}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs">
                                    {msg.from === from ? fromName : toName}
                                </span>
                                {msg.from === from && (
                                    <div className="flex space-x-2 justify-between">
                                        <button
                                            onClick={() => handleEdit(msg)}
                                            className="text-xs text-gray-300 hover:text-gray-500"
                                        >
                                            <img className='w-5 h-5' src={EditMessageIcons} alt="" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg)}
                                            className="text-xs text-red-500 hover:text-red-700"
                                        >
                                            <img className='w-5 h-5'
                                                src={deleteMessageIcons} alt="" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr className="my-4" />
            <div className="sticky-bottom bg-white p-4 rounded shadow-md flex items-center message_input_field">
                <input
                    onChange={handleInputmessage}
                    value={message}
                    type="text"
                    placeholder="Enter the message"
                    className="border p-2 rounded w-full mr-2"
                    onKeyDown={handleKeyDown}
                />
                {!isEditingMessage ? (
                    <button
                        onClick={handleMessageSend}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Send
                    </button>
                ) : (
                    <button
                        onClick={handleMessageFinalEdit}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    )
}

export default DirectMessage
