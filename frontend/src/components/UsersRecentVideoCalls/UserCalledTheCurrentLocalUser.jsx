import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allCallLogsFromOthers, deleteRecentCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';

import { useNavigate } from 'react-router-dom';

function UserCalledTheCurrentLocalUser({ user }) {
    const [allCallLogsFromOtherUsers, setAllCallLogsFromOtherUsers] = useState([]);


    const navigate = useNavigate();


    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.post(allCallLogsFromOthers, {
                    userId: user._id,
                });
                if (response) {
                    setAllCallLogsFromOtherUsers(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCallLogs();
    }, []);


    // start of the handling the join call

    const handleJoinCall = (callLog) => {
        // console.log(callLog);
        navigate("/videocallroom", {
            state: {
                roomId: callLog.callId.toString(),
            }
        });
        console.log("this is the common call id", callLog.callId);
    }

    // end of the handling the join call

    // start of the handling the delete call logs 

    const handleLeaveCall = async (callLog) => {
        console.log(callLog);

        try {

            const response = await axios.post(deleteRecentCallLogs, {
                meetId: callLog.from,
                callLog: callLog,
            });

            console.log(response);

        } catch (err) {
            console.log(err);
        }

    }
    // end of the handling the delete call logs 


    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Users Who Called You</h1>
            {allCallLogsFromOtherUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allCallLogsFromOtherUsers.map(callLog => (
                        <div key={callLog._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
                            <p className="text-lg font-semibold text-gray-800">Call ID: {callLog._id}</p>
                            <p className="text-gray-600">Caller ID: {callLog.from}</p>
                            <p className="text-gray-600">Receiver ID: {callLog.to}</p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleJoinCall(callLog)}

                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Join Call
                                </button>
                                <button onClick={() => handleLeaveCall(callLog)}

                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Leave Call
                                </button>
                            </div>


                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No users called you</p>
            )}
        </div>
    );
}

export default UserCalledTheCurrentLocalUser;
