import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import ViewBlogInDetails from './ViewBlogInDetails';
import { blogsDetails } from '../../utils/apiRoutes';
import { allBlogsByTagName } from '../../utils/apiRoutes';
import chat from "../assets/chat.png";
import read from "../assets/read.png";
import unlike from "../assets/love.png";
import like from "../assets/heart.png";
import { addLikes } from "../../utils/apiRoutes";
import SliderHome from './SliderHome/SliderHome';

// import { getLikes } from '../../utils/apiRoutes';



function Home() {
    const [blogs, setBlogs] = useState([]);
    const [likesMap, setLikesMap] = useState({}); // Map to store likes for each blog
    const [likeCountMap, setLikeCountMap] = useState({}); // Map to store like counts for each blog
    const [currentUser, setCurrentUser] = useState();

    const [postId, setPostId] = useState();

    const navigate = useNavigate();

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


    //  get post likes dislikes informations from the databases






    const getAllBlogs = async () => {
        try {
            const response = await axios.get(`${getAllBlogRoutes}`);
            const blogsData = response.data.blogs;
            setBlogs(blogsData);

            // // Initialize state maps for likes and like counts for each blog
            // const initialLikesMap = {};
            // const initialLikeCountMap = {};
            // blogsData.forEach(blog => {
            //     initialLikesMap[blog._id] = false;
            //     initialLikeCountMap[blog._id] = 0;

            // });
            // setLikesMap(initialLikesMap);
            // setLikeCountMap(initialLikeCountMap);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, [])

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

    const handleComments = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;

            // Navigate to the new page and pass blogDetails as state
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    }

    const handleTags = async (tag) => {
        try {
            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            const blogByTag = response.data.blog;
            // console.log(blogByTag[0]);

            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        } catch (err) {
            console.log(err)
        }
    }

    const handleLikes = (blogId) => {
        setPostId(blogId)
        setLikesMap(prevLikesMap => {
            const newLikesMap = { ...prevLikesMap };
            newLikesMap[blogId] = !newLikesMap[blogId];
            return newLikesMap;
        });

        setLikeCountMap(prevLikeCountMap => {
            const newLikeCountMap = { ...prevLikeCountMap };
            newLikeCountMap[blogId] = likesMap[blogId] ? newLikeCountMap[blogId] - 1 : newLikeCountMap[blogId] + 1;
            return newLikeCountMap;
        });




    };

    // useEffect(() => {
    //     console.log(likesMap, likeCountMap);
    //     const LikesCountData = async () => {
    //         try {
    //             const response = await axios.post(`${addLikes}`, {
    //                 blogId: postId,
    //                 likesCount: likeCountMap[postId],
    //                 LikedOrNot: likesMap[postId],
    //             });
    //             console.log(response);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     LikesCountData();
    // }, [handleLikes]);


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


    // start of the getting all the blogs posts

    const hanldeAllblogsPosts = () => {
        console.log("clicked");
        navigate("/allblogsposts");
    }

    //end of the getting teh all the blogs posts






    return (
        
        <div className="container bg-slate-500 mx-auto">
            <SliderHome />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.slice(0, 6).map((blog, index) => (
                    <div key={index * 2 + 1} className="border p-4 rounded bg-white shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
                        <img src={blog.imageUrl} alt={blog.title} className="w-full h-32 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                        <button onClick={() => handleAuthorProfile(blog)}>
                            <p className="text-gray-600 mb-2">{blog.author}</p>
                        </button>
                        <p className="text-gray-500">{blog.category}</p>
                        <div className="flex mt-4 space-x-2">
                            {blog.tags.map((tag, tagIndex) => (
                                <button onClick={() => handleTags(tag)}
                                    key={tagIndex + 1}
                                    className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out"
                                >
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

            <div className="flex justify-center mt-8">
                <button onClick={hanldeAllblogsPosts} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                    All Blogs
                </button>
            </div>


        </div>
    );

}

export default Home;
