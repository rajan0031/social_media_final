import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { blogsDetails } from '../../../utils/apiRoutes';
import { allBlogsByTagName } from '../../../utils/apiRoutes';

function AllBlogsPosts() {
    const [allPostsFromDataBase, setAllPostsFromDataBase] = useState([]);
    const [currentUser, setCurrentUser] = useState();


    const navigate = useNavigate();


    // this is the start oof the getting the user from the database


    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                // console.log(userDetails);
                if (!userDetails) {
                    navigate("/");
                }
                else {
                    setCurrentUser(userDetails);
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);



    // ethis is teh end of teh getting the useer from the data base



    // start of the getting the all the blogs
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${getAllBlogRoutes}`);
                setAllPostsFromDataBase(response.data.blogs);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    // Function to handle clicking on "Read More" button

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);

            const blogDetails = response.data.blog;

            // Navigate to the new page and pass blogDetails as state
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    }


    // end of the handling the Read more functionality



    // Function to handle clicking on author's profile

    const handleAuthorProfile = (blog) => {
        if (blog.id == currentUser._id) {
            navigate('/userprofile');
        }
        else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser._id,
                    author: blog.author,
                }
            });

        }


        console.log("this is suther::", blog.author, currentUser._id);
    }


    // end of the function to handle the user profile 

    // this is the start of the handling the tags from the databse

    const handleTags = async (tag) => {
        try {
            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            const blogByTag = response.data.blog;
            // console.log(blogByTag[0]);

            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        } catch (err) {
            console.log(err);
        }
    }

    // this is the end of the handling the tags from the databse



    return (
        <div className=" container mx-auto px-4 bg-slate-500 ">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allPostsFromDataBase.map((blog, index) => (
                    <div key={index * 2 + 1} className="border p-4 rounded bg-white shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <button onClick={() => handleAuthorProfile(blog)}>
                            <p className="text-gray-600 mb-2">{blog.author}</p>
                        </button>
                        <p className="text-gray-500">{blog.category}</p>
                        <div className="flex mt-4 space-x-2">
                            {blog.tags.map((tag, tagIndex) => (
                                <button onClick={() => handleTags(tag)} key={tagIndex + 1} className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out">
                                    <span key={tagIndex} className="px-2 py-1 text-xs text-gray-700 rounded">
                                        {tag}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleBlogsDetails(blog._id)}>
                                Read More
                            </button>
                            <button className="text-white font-bold py-2 px-4 rounded" onClick={() => handleLikes(blog._id)}>
                                Like
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}

export default AllBlogsPosts;
