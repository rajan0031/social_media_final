import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { followers } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';

import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';


function Followers() {
    const location = useLocation();
    const user = location.state?.user;
    const [followerList, setFollowerList] = useState([]);


    // handle the follower from your followers list

    const handleRemove = async (from, to) => {
        console.log("clicked", from, to);

        try {

            const response = await axios.post(`${deleteFollower}`, {
                from: from,
                to: to,
            });
            console.log(response);
            if (response) {
                toast.success("follower is removed ");
            }

        } catch (err) {
            console.log(err)
        }

    }

    // rendering the data of the followers list


    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.post(`${followers}`, {
                    to: user._id,
                });
                console.log("this is my follow response", response);
                setFollowerList(response.data.response); // Assuming the followers data is in the response
            } catch (err) {
                console.log(err);
            }
        };

        fetchFollowers();
    }, [handleRemove]);



    return (

        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Hello, {user.username}!</h1>
            <h3 className="text-xl font-semibold mb-4">People who have followed you:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {followerList.map((follower) => (
                    <div key={follower._id} className="bg-white p-4 rounded shadow-md">
                        <p className="text-lg font-semibold">{follower.fromName}</p>
                        <p className="text-gray-600">{follower.from}</p>
                        {/* Add more information or actions as needed */}
                        <button onClick={() => handleRemove(follower.from, follower.to)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div >
    );
}

export default Followers;
