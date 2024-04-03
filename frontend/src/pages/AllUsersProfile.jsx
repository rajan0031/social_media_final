import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { alluserProfile } from "../../utils/apiRoutes";
import axios from 'axios';
import { following } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { useNavigate } from 'react-router-dom';
// import { followers } from "../../utils/follow_following_utils/apiFollowAndFollowingRoutes";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { followerDetails } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { Unfollowings } from '../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { io } from "socket.io-client";

import { host } from '../../utils/apiRoutes';







function AllUsersProfile() {


    const socket = useRef();


    const location = useLocation();
    const userId = location.state?.id;
    // const currentUserId = location.state?.currentUserId;
    const author = location.state?.author;
    // console.log(userId, author);
    const [currentUserDetails, setCurrentUserDetails] = useState();

    const [localStorageUser, setLocalStorageUser] = useState();
    // state fo the seeing following or not
    const [followingOrNot, setFollowingOrNot] = useState(false);


    const navigate = useNavigate();


    // getting the localstorage user from the storage

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                console.log("the local ::", userDetails._id);
                if (!userDetails) {
                    navigate("/register");
                }
                else {
                    setLocalStorageUser(userDetails);
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);

    // end of localstorage user

    // start yaha se mera current user from the local storage aa gaya

    useEffect(() => {
        if (localStorageUser) {
            socket.current = io(host);
            socket.current.emit("add-user", localStorageUser._id);
        }

        // Cleanup socket connection on unmount
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [localStorageUser]);




    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`${alluserProfile}/${userId}`);

            setCurrentUserDetails(response.data.response[0])
        }
        fetch();
    }, [])

    const handleDirectMessage = () => {
        navigate("/directmessage", {
            state: {
                from: localStorageUser._id,
                to: currentUserDetails.userId,
                fromName: localStorageUser.username,
                toName: author,

            },
        });
        console.log("the user name is :", currentUserDetails);
    }

    // handling the following
    const handleFollowing = async () => {
        setFollowingOrNot(true);
        // console.log(currentUserDetails.userId);
        // console.log(localStorageUser._id);
        try {
            const response = await axios.post(`${following}`, {
                from: localStorageUser._id,
                fromName: localStorageUser.username,
                to: currentUserDetails.userId,
                toName: author,
                following: true
            });
            if (response) {
                toast.success(`Congralutulations ! you have followed ${author} `);

            }
            // console.log(response.data.response.following);
        } catch (err) {
            console.log(err);
        }
    }

    // handle un follow

    const handleUnFollow = async () => {
        setFollowingOrNot(false);
        try {
            const response = await axios.post(`${Unfollowings}`, {
                from: localStorageUser._id,

                to: currentUserDetails.userId,
                following: false
            });
            // console.log(response.data.response.following);
            if (response) {
                toast.info(`  you have Unfollowed ${author} `);
                // setFollowingOrNot(flase)
            }

        } catch (err) {
            console.log(err);
        }
    }


    // get the followOrNot information 

    useEffect(() => {
        const fetch = async () => {

            try {

                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                try {

                    const response = await axios.post(`${followerDetails}`, {
                        from: userDetails._id,
                        to: userId,
                    });
                    console.log("the response is ", response.data.response);
                    setFollowingOrNot(response.data.response[0]?.following)
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }

        }
        fetch();

    }, [handleUnFollow, handleUnFollow]);


    // start of the handling the video call features

    const handleVideoCall = () => {
        // console.log("clicked");

        const callId = Math.floor((Math.random(5) * 100000000));
        // console.log(callId)

        navigate("/videocall", {
            state: {
                from: localStorageUser._id,
                to: userId,
                callId: callId

            }
        });
    }

    // end of the handling the video call feature





    return (
        <div>
            {currentUserDetails ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-4">{currentUserDetails.about}</h2>
                        <h1>
                            <p className="text-Red-600 mb-2">Account Type: @{author}</p>
                        </h1>
                        <p className="text-gray-600 mb-2">Account Type: {currentUserDetails.accountType}</p>
                        <p className="text-gray-600 mb-2">Country: {currentUserDetails.country}</p>
                        <p className="text-gray-600 mb-2">State: {currentUserDetails.state}</p>
                        <p className="text-gray-600 mb-2">District: {currentUserDetails.district}</p>
                        <p className="text-gray-600 mb-2">Village: {currentUserDetails.village}</p>
                        <p className="text-gray-600 mb-2">Profession: {currentUserDetails.profession}</p>
                        <p className="text-gray-600 mb-2">Phone Number: {currentUserDetails.phoneNumber}</p>
                        <p className="text-gray-600 mb-2">Pincode: {currentUserDetails.pincode}</p>

                        {/* Add more details as needed */}
                        {/* You can add social media links, buttons, or any other information here */}

                        <div className='px-4  mt-4 mb-4 flex justify-between'> <button
                            onClick={handleDirectMessage}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Message
                        </button>
                            <button
                                onClick={handleVideoCall}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Video
                            </button>
                            {
                                !followingOrNot ? (
                                    <button
                                        onClick={handleFollowing}
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Follow
                                    </button>
                                ) : (

                                    <button
                                        onClick={handleUnFollow}
                                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                    >
                                        UnFollow
                                    </button>

                                )
                            }
                        </div>

                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                        <p className="text-gray-600 mb-4">User has not set their profile !.</p>
                        <button disabled
                            onClick={handleDirectMessage}
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                        >
                            Message
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default AllUsersProfile
