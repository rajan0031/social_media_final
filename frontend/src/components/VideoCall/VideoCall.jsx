import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { registerCallRequest } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


function VideoCall() {

    const [callId, setCallId] = useState();
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from;
    const to = location.state?.to;

    useEffect(() => {
        setCallId(location.state?.callId);
    }, [])


    const handleJoin = async () => {
        console.log(from, to, callId);

        try {

            const response = await axios.post(`${registerCallRequest}`, {
                from: from,
                to: to,
                callId: callId,
            });



            if (response.data.status == false) {
                toast.info(response.data.message);

            }
            else {
                toast.success(response.data.message);
                navigate("/userrecentmessages")
            }

            // navigate("/videocallroom", {
            //     state: {
            //         roomId: callId.toString(),
            //     }
            // });




        } catch (err) {
            console.log(err);
        }




    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <input
                    onChange={(e) => setCallId(e.target.value)}
                    value={callId}
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
                    type="text"
                    placeholder="Enter your Room ID"
                />
                <button onClick={handleJoin}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
                    type="button"
                >
                    Join
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default VideoCall;
