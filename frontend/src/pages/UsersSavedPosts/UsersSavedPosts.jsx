import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPostsOfProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';

import { blogsDetails } from '../../../utils/apiRoutes';
import { deleteUserSavedPostsFromUserProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';
import { AddPostsToProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';
import { useNavigate } from 'react-router-dom';

function UsersSavedPosts() {
    const [savedPostsFromDataBase, setSavedPostsFromDataBase] = useState([]);
    const [deleteButtonFlags, setDeleteButtonFlags] = useState([]); // Array of flags for each post

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localStorageUserDetails = JSON.parse(localStorage.getItem("blog-user"));
                const response = await axios.get(`${getPostsOfProfile}/${localStorageUserDetails._id}`);
                if (response.data && response.data.response) {
                    setSavedPostsFromDataBase(response.data.response);
                    // Initialize deleteButtonFlags with false for each post
                    // setDeleteButtonFlags(Array(response.data.response.length).fill(false));
                }
            } catch (err) {
                console.log("Error fetching saved posts:", err);
            }
        };
        fetchData();
    }, []);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId.postDetails._id}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemovePost = async (postIndex, postId) => {
        // Copy the current array of flags
        const newFlags = [...deleteButtonFlags];
        newFlags[postIndex] = true; // Set the flag for the clicked post to true
        setDeleteButtonFlags(newFlags); // Update the flags array

        try {
            const response = await axios.delete(`${deleteUserSavedPostsFromUserProfile}/${postId}`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    // this is the start of the handling the hanldeSavingPostAgain in the data undo system

    const hanldeSavingPostAgain = async (postIndex, post) => {
        // console.log("clicked", post);

        const { userId, postDetails, savedStatus } = post;

        console.log(userId, postDetails, savedStatus);

        const newFlags = [...deleteButtonFlags];
        newFlags[postIndex] = false;
        setDeleteButtonFlags(newFlags);


        try {

            const response = await axios.post(`${AddPostsToProfile}`, {
                userID: userId,
                postDetails: postDetails,
                savedStatus: savedStatus,
            });
            console.log(response);

        } catch (err) {
            console.log(err);
        }
    }


    // thi sis the end of the handling the hanldeSavingPostAgain in the data undo system





    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>
            {savedPostsFromDataBase.length > 0 ? (
                <div>
                    {savedPostsFromDataBase.map((post, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
                            <div className="flex items-center mb-4">
                                <img src={post.postDetails.imageUrl} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{post.postDetails.title}</h3>
                                    <p className="text-gray-600 mb-2">Author: {post.postDetails.author}</p>
                                    <p className="text-gray-600 mb-2">Date: {new Date(post.postDetails.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <button onClick={() => handleBlogsDetails(post)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Read More</button>
                                {deleteButtonFlags[index] ? (
                                    <div>
                                        <button
                                            onClick={() => hanldeSavingPostAgain(index, post)}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Undo</button>
                                    </div>

                                ) : (
                                    <button onClick={() => handleRemovePost(index, post._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Remove Post</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-800">No saved posts found.</p>
            )}
        </div>
    );
}

export default UsersSavedPosts;
