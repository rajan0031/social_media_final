import React, { useState } from 'react'
import axios from 'axios';

import { addReplyToComment } from '../../../utils/CommentsReplyApiRoutes/CommentsReplyApiRoutes';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ReplyForReply from '../ReplyForReply/ReplyForReply';

function CommentsReply({ comment }) {

    const [replyFlag, setReplyFlag] = useState(false);
    const [reply, setReply] = useState("");



    // reply input 

    const handleReplyInput = (e) => {

        setReply(e.target.value);
    }


    // start of the function for comment repy

    const handleCommentsReply = () => {

        console.log("cliked");
        setReplyFlag(true);
        console.log(comment);
        console.log(reply);

    }

    // end of the function for the comments reply




    const handleReplyOnComments = async () => {

        setReply("");
        setReplyFlag(false);

        // Get the current date
        const currentDate = new Date();

        // Format the date in the local time zone
        const formattedDate = currentDate.toLocaleString();

        try {

            if (reply.length > 0) {

                const response = await axios.post(`${addReplyToComment}`, {
                    replyId: comment._id,
                    reply: reply,
                    author: comment.author,
                    date: formattedDate,
                });
                console.log(response);
                if (response) {
                    toast.success("hey ! your Reply is added successfully");
                    setReplyFlag(false);
                }

            }

        }
        catch (err) {
            console.log(err);
        }

    }


    return (


        <div className="p-4">
            <ReplyForReply comment={comment} />
            {replyFlag == false ? (<button onClick={handleCommentsReply}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md">
                Reply
            </button>) : (<><div className="p-4">
                <input
                    value={reply}
                    onChange={handleReplyInput}
                    className="border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Enter your text here..."
                />
                <button onClick={handleReplyOnComments} className="bg-green-500 hover:bg-green-600 text-white mt-2  font-bold py-2 px-4 rounded shadow-md">
                    Reply
                </button>
            </div></>)}
            <ToastContainer />
        </div >
    )
}

export default CommentsReply;
