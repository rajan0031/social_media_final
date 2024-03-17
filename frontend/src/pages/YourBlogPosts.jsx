import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBlogRoutes } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { blogsDetails } from '../../utils/apiRoutes';
import bin from "../assets/bin.png"
import edit from "../assets/edit-button.png"
import read from "../assets/read.png"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteBlog } from '../../utils/apiRoutes';




function YourBlogPosts() {



    // useState for popup models

    const [isModalOpen, setIsModalOpen] = useState(false);
    // no blogs condition 
    const [flag, setFlag] = useState(false);






    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();



    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await localStorage.getItem("blog-user");

                console.log(userDetails);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);



    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                if (!userDetails) {
                    navigate("/register");
                } else {
                    try {
                        const response = await axios.get(`${getBlogRoutes}/${userDetails._id}`);
                        const blogsData = response.data.blogs;
                        setBlogs(blogsData);
                        if (blogsData.length === 0) {
                            const message = "Hello ! You don't have any posts yet.  Start creating your first post now.";
                            navigate('/createblog', { state: { message } });
                        }
                    } catch (err) {
                        console.log("Error fetching blogs:", err);
                    }
                }
            } catch (err) {
                console.log("Error fetching user details:", err);
            }
        };
        fetchUserFromLocal();
    }, [navigate]);


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


    const handleBlogsEdit = async (id) => {
        console.log(id);

        try {

            const response = await axios.get(`${blogsDetails}/${id}`);

            console.log(response.data.blog);
            const blogDetails = response.data.blog;
            // console.log(response);

            navigate("/edit", { state: { blogDetails, id } })

        } catch (err) {
            console.log(err);
        }

    }


    // functions to handle the popups open and close buttons

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    // delete blogs code for the model

    const handleBlogDelete = async (blogId) => {

        // console.log(blogId);

        try {

            const response = await axios.post(`${deleteBlog}/${blogId}`, {
                blogId: blogId,
            });

            if (response.data.status == true) {
                toast.error(`${response.data.message}`);
            }

        } catch (err) {
            console.log(err)
        }






        closeModal();

    };




    return (
        <div className="container mx-auto mt-10">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map((blog, index) => (
                    <div key={index} className="border p-4 rounded bg-white shadow hover:shadow-lg transition duration-300">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-2">Author: {blog.author}</p>
                        <p className="text-gray-500">Category: {blog.category}</p>
                        <p className="text-gray-700 mt-2">{blog.content.slice(0, 15)}.......</p>
                        <div className="flex flex-wrap mt-2">
                            {blog.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="mr-2 text-green-500">{tag}</span>
                            ))}
                        </div>
                        {blog.featured && <p className="text-green-600 font-semibold mt-2">Featured</p>}
                        <div className='flex  justify-between items-center space-x-10 sm:space-x-2 md:space-x-4 lg:space-x-6'>
                            <button className="" onClick={() => handleBlogsDetails(blog._id)}>
                                <img src={read} alt="read" className="w-10 h-10 hover:opacity-80 transition duration-300 shadow-md" />
                            </button>
                            <button className="" onClick={() => handleBlogsEdit(blog._id)}>
                                <img src={edit} alt="edit" className="w-10 h-10 hover:opacity-80 transition duration-300 shadow-md" />
                            </button>
                            <button className="" onClick={openModal}>
                                <img src={bin} alt="bin" className="w-10 h-10 hover:opacity-80 transition duration-300 shadow-md" />
                            </button>
                        </div>

                        {/* my model popup code  start */}

                        {isModalOpen && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-4 rounded shadow-md">
                                    <p>Are you sure you want to delete this blog?</p>
                                    <div className="flex justify-end mt-2">
                                        <button className="bg-gray-300 px-4 py-2 mr-2 rounded" onClick={closeModal}>
                                            Cancel
                                        </button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleBlogDelete(blog._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* my popup model code end */}
                    </div>
                ))}
            </div>



            <ToastContainer />
        </div>
    );
}

export default YourBlogPosts;
