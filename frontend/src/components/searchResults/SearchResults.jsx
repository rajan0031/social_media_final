import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchResults } from '../../../utils/searchResultsApis/searchResultsApis';
import read from "../../assets/read.png"
import { blogsDetails, allBlogsByTagName } from '../../../utils/apiRoutes';

function SearchResults() {
    const location = useLocation();
    const searchData = location.state?.searchData;
    const [searchResultsFromDataBase, setSearchResultsFromDataBase] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    const navigate = useNavigate(); // useNavigate hook




    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.post(`${searchResults}`, {
                    searchData: searchData,
                });
                if (response) {
                    setSearchResultsFromDataBase(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchResults();
    }, [searchData]);



    // start of  use effects to fetch the local user from the storage

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



    // end of getting the local  storage


    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    }

    const handleTags = async (tag) => {
        try {
            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            const blogByTag = response.data.blog;
            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        } catch (err) {
            console.log(err)
        }
    }

    const handleAuthorProfile = (blog) => {
        // Assuming currentUser is defined elsewhere or passed as a prop
        if (blog.id === currentUser._id) {
            navigate('/userprofile');
        } else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser._id,
                    author: blog.author,
                }
            });
        }
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResultsFromDataBase.map((result, index) => (
                    <div key={index * 2 + 1} className="border p-4 rounded bg-white shadow hover:shadow-lg transition duration-300">
                        <img src={result.imageUrl} alt={result.title} className="w-full h-32 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                        <button onClick={() => handleAuthorProfile(result)}>   <p className="text-gray-600 mb-2">{result.author}</p></button>
                        <p className="text-gray-500">{result.category}</p>
                        <div className="flex mt-4 space-x-2">
                            {result.tags.map((tag, tagIndex) => (
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
                        <div className="flex justify-between items-center ">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleBlogsDetails(result._id)}>
                                <img className='w-10 h-10' src={read} alt="read more" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;
