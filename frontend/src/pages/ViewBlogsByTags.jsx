import React from 'react';
import { useLocation } from 'react-router-dom';
import { blogsDetails } from '../../utils/apiRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ViewBlogsByTags() {
    const navigate = useNavigate();
    const location = useLocation();
    const blogByTag = location.state?.blogByTag;
    const tag = location.state?.tag;



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


    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        }
        return content;
    };

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;

            // Navigate to the new page and pass blogDetails as state
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-3xl font-semibold mb-4 text-center content-center ">All Blogs Related to <span className="text-red-500">{tag}</span> Tag!</h2>

            {blogByTag && blogByTag.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogByTag.map((blog, index) => (
                        <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-md transition duration-300 hover:shadow-lg">
                            <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover mb-4 rounded transition duration-300 hover:opacity-80" />
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-gray-600">{truncateContent(blog.content, 150)}</p>
                            <p className="text-gray-500">Author: {blog.author}</p>
                            <div className="flex mt-4 space-x-2 flex-wrap">
                                {blog.tags.map((tag, tagIndex) => (
                                    <button
                                        key={tagIndex}
                                        className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out mb-2"
                                    >
                                        <span className="px-2 py-1 text-xs text-gray-700 rounded">
                                            {tag}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                                onClick={() => handleBlogsDetails(blog._id)}
                            >
                                Get Full Blog
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No blogs found for the specified tag.</p>
            )}
        </div>
    );
}

export default ViewBlogsByTags;
