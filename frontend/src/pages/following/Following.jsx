import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { followings } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';

import { Unfollowings } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { useLocation } from 'react-router-dom';
import { deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function Following() {
    const [followingLists, setFollowingsLists] = useState([]);



    const location = useLocation();
    const user = location.state?.user;




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
                toast.info("follower is removed ");
            }

        } catch (err) {
            console.log(err)
        }

    }




    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await axios.post(`${followings}`, {
                    from: user._id,
                });

                setFollowingsLists(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFollowings();
    }, [handleRemove]);






    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Following</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {followingLists.map((followingUser) => (
                    <div key={followingUser._id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300">
                        <img
                            src={followingUser.profilePicture}
                            alt={`${followingUser.toName}'s Profile`}
                            className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
                        />
                        <p className="text-lg font-bold text-center mb-2">{followingUser.toName}</p>
                        <p className="text-sm text-gray-500 text-center">{followingUser.bio}</p>
                        {/* Add more details or actions if needed */}
                        <button onClick={() => handleRemove(followingUser.from, followingUser.to)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
                            Unfollow
                        </button>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Following;
