import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';

import { deleteRecentCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';

import { useNavigate } from 'react-router-dom';

function UsersRecentVideoCalls() {
    const [allCallLogsFromDataBase, setAllCallLogsFromDataBase] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const localUser = await JSON.parse(localStorage.getItem('blog-user'));
                const response = await axios.post(allCallLogs, {
                    userId: localUser?._id
                });
                setAllCallLogsFromDataBase(response.data.response);
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
                meetId: callLog.to,
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
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Recent Video Calls which i have done</h1>
            {allCallLogsFromDataBase.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allCallLogsFromDataBase.map(callLog => (
                        <div key={callLog._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out">
                            <p className="text-lg font-semibold text-blue-800">Call ID: {callLog._id}</p>
                            <p className="text-gray-600">Caller ID: {callLog.from}</p>
                            <p className="text-gray-600">Receiver ID: {callLog.to}</p>
                            <div className="flex space-x-4">
                                <button onClick={() => handleJoinCall(callLog)}

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
                <p className="text-gray-600">No recent video calls</p>
            )}
        </div>
    );
}

export default UsersRecentVideoCalls;
