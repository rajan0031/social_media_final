import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { getAllBlogRoutes } from "../../../utils/apiRoutes";
import { blogsDetails } from "../../../utils/apiRoutes";
import { useNavigate } from "react-router-dom";

const SliderHome = () => {
    const [allPostsFromDataBase, setAllPostsFromDataBase] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(getAllBlogRoutes);
                setAllPostsFromDataBase(response.data.blogs);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // thi sis the start of the getting the blogs details

    const handleViewFullPost = async (post) => {
        try {
            const response = await axios.get(`${blogsDetails}/${post._id}`);
            const blogDetails = response.data.blog;

            // Navigate to the new page and pass blogDetails as state
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }

    }

    // this the end of the getting the blogs betails

    return (
        <div className="w-full bg-purple-400 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">The Trending Posts of Today</h1>
                <Slider {...settings}>
                    {allPostsFromDataBase.slice(0, 5).map((post) => (
                        <div onClick={() => handleViewFullPost(post)}
                            key={post.id} className="px-4 transition-transform duration-300 ease-in-out hover:cursor-pointer transform hover:-translate-y-1 shadow-purple">
                            <div className="bg-white rounded-lg shadow-md p-8 transition duration-300 hover:shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">{post.title.substring(0, 20)}.......</h3>
                                <p className="text-gray-600">{post.content.substring(0, 25)}..........</p>
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-lg" />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SliderHome;
