import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllReplyForComment } from '../../../utils/CommentsReplyApiRoutes/CommentsReplyApiRoutes';
import { FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import ReplyForReplies from '../sub_ReplyForReply/ReplyForReplies';
import { addReplyToReply } from '../../../utils/ReplyForReplyRoutes/ReplyForReplyRoutes';

import { getAllReplyForReply } from '../../../utils/ReplyForReplyRoutes/ReplyForReplyRoutes';

function ReplyForReply({ comment }) {
    const [viewReplyFlag, setViewReplyFlag] = useState(false);
    const [replyFormDataBase, setReplyFormDataBase] = useState([]);
    const [replyFlag, setReplyFlag] = useState(false);
    const [replyInput, setReplyInput] = useState("");
    const [placeHolder, setPlaceHolder] = useState("Enter your reply ! ");
    const [replyData, setReplyData] = useState();

    const [viewReplyForReplyFlag, setViewReplyForReplyFlag] = useState(false);



    const handleViewReply = () => {
        setViewReplyFlag(true);
    }

    // this is start of the handle reply for the reply

    const handleViewAllReply = async (reply) => {
        setReplyFlag(true);
        setViewReplyForReplyFlag(true);

        console.log(reply);

        try {

            const reosponse = await axios.post(`${getAllReplyForReply}`, {
                replyIdTo: reply._id,
            });

        } catch (err) {
            console.log(err);
        }

    }

    // this is end for the function handleReplyToReply

    // start of the add new reply for a reply

    const handleReplyForReply = (reply) => {
        setReplyFlag(true);
        console.log(reply);
        setPlaceHolder(reply.reply)
        setReplyData(reply);
    }

    // end of the add reply for a reply

    // start of the handle reply input

    const handleReplyInput = (e) => {
        setReplyInput(e.target.value);
    }

    // end of the handle reply input

    // start of the handle reply on Reply

    const handleReplyOnComments = async () => {
        // console.log(replyData);
        const localUser = JSON.parse(localStorage.getItem('blog-user'));
        console.log(localUser);

        try {

            const response = await axios.post(`${addReplyToReply}`, {

                replyIdTo: replyData._id,
                replyIdFrom: localUser._id,
                reply: replyInput,
                author: localUser.username,

            });

            console.log(response);



        } catch (err) {
            console.log(err);
        }

        setReplyInput("");


    }

    // end of the handle reply on reply

    // start of the handle cancell reply

    const handleCancelReply = () => {
        setReplyFlag(false);
    }

    // end of the handle cancel reply


    useEffect(() => {
        const fetchReplyData = async () => {
            try {
                const response = await axios.post(getAllReplyForComment, {
                    commentId: comment._id,
                });
                if (response) {
                    setReplyFormDataBase(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchReplyData();
    }, [replyFormDataBase]);



    return (
        <div className="mt-4">
            {!viewReplyFlag ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleViewReply}>
                    <FaReply className="inline-block mr-2" /> View Replies
                </button>
            ) : (
                <div className="mt-4">
                    <h2 className="text-lg font-bold mb-2">Replies:</h2>

                    {
                        replyFlag == true ? (<><div className="p-4">
                            <input
                                value={replyInput}
                                onChange={handleReplyInput}
                                className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                type="text"
                                placeholder={`Replying for: ${placeHolder}`}
                            />
                            <div className='flex justify-between'>
                                <button onClick={handleReplyOnComments} className="bg-green-500 hover:bg-green-600 text-white mt-2  font-bold py-2 px-4 rounded shadow-md">
                                    Reply
                                </button>
                                <button onClick={handleCancelReply} className="bg-red-500 hover:bg-red-600 text-white mt-2  font-bold py-2 px-4 rounded shadow-md">
                                    cancel
                                </button>
                            </div>
                        </div></>) : (<></>)
                    }


                    {replyFormDataBase.map((reply, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded mb-2 flex items-center justify-between">

                            <p className="text-gray-800">{reply.reply}</p>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleViewAllReply(reply)}
                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"><FaReply /></button>
                                <button
                                    onClick={() => handleReplyForReply(reply)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline">
                                    <FaPlus />
                                </button>
                                <button className="text-yellow-500 hover:text-yellow-700 focus:outline-none"><FaEdit /></button>
                                <button className="text-red-500 hover:text-red-700 focus:outline-none"><FaTrash /></button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ReplyForReply;
