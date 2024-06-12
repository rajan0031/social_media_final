// import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { allBlogsByTagName } from '../../utils/apiRoutes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComments } from '../../utils/apiRoutes';
import { getComments } from '../../utils/apiRoutes';
import { editComments } from '../../utils/apiRoutes';
import { deleteComment } from '../../utils/apiRoutes';
import { editLikes } from '../../utils/apiRoutes';
import unlike from "../assets/love.png";
import like from "../assets/heart.png";
import { addLikes } from "../../utils/apiRoutes"
import { getLikes } from '../../utils/apiRoutes';
import CommentsReply from '../components/CommentsReply/CommentsReply';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import chat from "../assets/chat.png";

import savedPost from "../assets/saved post.png";
import unsavedPost from "../assets/unsaved post.png";
import { AddPostsToProfile } from '../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';


function ViewBlogInDetails() {



    const [newComment, setNewComment] = useState('');
    const [writeComments, setWriteComments] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [postId, setPostId] = useState();
    const [currentUser, setCurrentUser] = useState("");
    // this is showing the current user name of the localstorage
    // find the user id of the post 
    const [userIdOfPost, setUserIdOfPost] = useState("");
    // finding the current userId from storage location
    const [currentUserId, setCurrentUserId] = useState();

    // tru false state for handle Edit;

    const [handleEdit, setHandleEdit] = useState(false);
    // making a state of set particular comment id

    const [particularCommentId, setParticularCommentId] = useState();

    // tracking a particular comment is edited or not 
    const [commentEdited, setCommentEdited] = useState(false);

    // like unlike toggelr button 
    // states for like and unlike toggler

    const [likeToggler, setLikeToggler] = useState(false);

    // likes and likes count
    const [likesCount, setLikesCount] = useState(0);
    const [likedOrNot, setLikedOrNot] = useState(false);

    // likes initial counts from the database

    const [likesCountFromDatabase, setLikesCountsFromDataBase] = useState(0);
    const [likesTogglersFromDatabase, setLikesTogglersFromDataBase] = useState(0);
    const [loadMoreComments, setLoadMoreComments] = useState(false);
    const [savedPostFlag, setSavedPostFlag] = useState(false);

    // this in new html to text conversion things
    const [htmlContent, setHtmlContent] = useState("set Dummy");

    // end of the html conversions things



    const navigate = useNavigate();

    const location = useLocation();
    const blogDetails = location.state?.blogDetails;


    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                console.log(userDetails._id);
                setCurrentUserId(userDetails._id);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);


    // useState for setting the postId form the location / useNavigate

    useEffect(() => {
        setPostId(blogDetails._id);// id of the particular post
        setUserIdOfPost(blogDetails.id);// id of the pwerson who have posted it

    }, []);






    //getting likes data from the database;

    useEffect(() => {
        const fetchData = async (postId) => {
            try {
                const response = await axios.post(`${getLikes}`, {
                    blogId: postId,
                    likesCount: 1,
                    likedOrNot: true
                });
                console.log(response, postId);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])


    // getting the cuurrent user from the local storage 

    useEffect(() => {



        const fetch = async () => {


            try {

                const localSystemUser = await JSON.parse(localStorage.getItem("blog-user"));
                // console.log(localSystemUser);

                setCurrentUser(localSystemUser.username);
                // setCurrentUserId(localSystemUser._id);



            } catch (err) {
                console.log(err);
            }


        };

        fetch();



    }, [])

















    const handleTags = async (tag) => {
        // console.log(tag, blog);

        try {

            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            // console.log(typeof response.data);
            const blogByTag = response.data.blog;


            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        }
        catch (err) {
            console.log(err)
        }


    }



    // codings for the comments sections code



    const handleCommentChange = async (e) => {
        setNewComment(e.target.value);
    };



    const handleAddComment = async () => {

        if (newComment.trim() !== '') {

            setNewComment('');
        }

        try {

            const localSystemUser = await JSON.parse(localStorage.getItem("blog-user"));
            // console.log(localSystemUser._id);

            try {
                const response = await axios.post(`${addComments}/${postId}`, {
                    id: postId,
                    author: localSystemUser.username,
                    comment: newComment,
                    date: new Date()
                });
                if (response.data.status === true) {
                    toast.success(`hello ${localSystemUser.username} your comment is posted successfully`);

                } else {
                    toast.error(`${response.data.message} try again`);
                }
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log(err);
        }


    };

    //    fetch get comments 



    // allComments



    // handling the handleComments

    const handleComments = () => {
        setWriteComments(!writeComments);
        setShowComments(true);
    }



    // function to edith the comments
    const handleEditComment = (comment, id) => {



        setHandleEdit(true);
        setNewComment(comment);
        setParticularCommentId(id);

    }

    // final function to edit the comments

    const handleFinalEdit = async (id) => {


        try {
            const response = await axios.post(`${editComments}/${id}`, {
                id: id,
                newComment: newComment,

            });

            if (response.data.status) {
                toast.success("Your Comment is Edited successfully");
                setNewComment('');
            }

        } catch (err) {
            console.log(err);
        }
        setHandleEdit(false);


    }



    // useEffect for the getting all the commentf from the database 

    useEffect(() => {
        const fetch = async () => {

            try {
                const response = await axios.get(`${getComments}/${blogDetails._id}`);

                setAllComments(response.data.comments.reverse());

            } catch (err) {
                console.log(err)
            }

        }
        fetch();
    }, [allComments, handleFinalEdit]);



    // functions to delete the comments
    const handleDeleteComment = async (id) => {
        // deleteComment
        console.log(id);

        const response = await axios.post(`${deleteComment}/${id}`, {
            id: id,
        });

        if (response.data.status) {
            toast.warn("Your comment is deleted !")
        }

    }

    // function to cncel the edit 

    const handleCancelEdit = () => {
        setNewComment('');
        setHandleEdit(false);
    }



    // handle likes button start


    // handle like button

    const handleLikes = async (blogId) => {
        // console.log(blogId);
        console.log("current user", currentUser);
        console.log(currentUserId);
        setLikeToggler((likesTogglersFromDatabase) => !likesTogglersFromDatabase)
        setLikesCount((likesCountFromDatabase) => (likesCountFromDatabase ? likesCountFromDatabase - 1 : likesCountFromDatabase + 1));


        if (!likeToggler) {
            try {
                const response = await axios.post(`${addLikes}`, {
                    currentUserId: currentUserId,
                    blogId: blogId,
                    likesCount: 1,
                    likeToggler: true,
                });

                console.log(response);
            } catch (err) {
                console.log(err);
            }

        }
        else {
            try {
                const response = await axios.post(`${editLikes}`, {
                    currentUserId: currentUserId,
                    blogId: blogId,
                    likesCount: 0,
                    likeToggler: false,
                });

                console.log(response);
            } catch (err) {
                console.log(err);
            }

        }

    }


    // handle likes button ends



    // retriving the likes infoormation from the Likes database start

    useState(() => {
        const fetch = async () => {
            // console.log(blogDetails._id);



            const CurrentPostId = blogDetails._id;
            console.log("the current user and post id", currentUserId);

            try {

                // local storage user id

                try {
                    const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                    console.log("the local:::", userDetails._id);
                    setCurrentUserId(userDetails._id);
                    const response = await axios.post(`${getLikes}`, {
                        blogId: CurrentPostId,
                        currentUserId: userDetails._id,
                    });
                    console.log(response.data.response)
                    if (response.data) {

                        setLikesCountsFromDataBase(response.data.response.likesCount);
                        setLikesTogglersFromDataBase(response.data.response.likeToggler);

                    }


                } catch (err) {
                    console.log(err);
                }





            } catch (err) {
                console.log(err);
            }

        }
        fetch();
    }, []);


    // retriving the likes infoormation from the Likes database end points








    // useState(() => {
    //     console.log(likesCount);
    // }, [handleLikes, likeToggler])


    // start of the load more commenys

    const hanldeLoadMoreComments = () => {
        console.log("clicked");
        setLoadMoreComments(true);
    }

    // eod of the load mor commesnt

    // start of the saving the post to user profile

    const handleSaveToUserProfile = async (blogDetails) => {
        try {
            const response = await axios.post(`${AddPostsToProfile}`, {

                userId: currentUserId,
                postDetails: blogDetails,
                savedStatus: true,

            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }

        // console.log(currentUserId);
    }

    //end of the saving the post to the user profile
    // Convert HTML content to plain text
    useEffect(() => {
        if (blogDetails.content) {
            const textContent = showContents(blogDetails.content);
            setHtmlContent(textContent);
        }
    }, [blogDetails.content]);

    // this is the function which will show my contents 

    const showContents = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // setHtml_contents(doc.body.textContent);
        return doc.body.textContent || "";
    };


    // end of the function which will show my contents 




    return (


        <div className='bg-slate-500'>


            <div className="container mx-auto mt-10">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                    <img src={blogDetails.imageUrl} alt={blogDetails.title} className="w-full h-64 object-cover mb-8 rounded" />
                    <h2 className="text-3xl font-bold mb-4">{blogDetails.title}</h2>
                    <span className="text-gray-600 text-sm">
                        Posted on {new Date(blogDetails.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,

                        })}
                    </span>


                    <p className="text-red-600 mb-4">{blogDetails.author}</p>
                    <p className="text-gray-500 mb-4">{blogDetails.category}</p>
                    <div className="flex mb-4 space-x-2">
                        {blogDetails.tags.map((tag, tagIndex) => (
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

                    <p className="text-gray-800"> {htmlContent} </p>



                    <div className=' flex justify-between'>
                        {/* Comment Button */}
                        <button className=" bg-white-100 bg-neutral-500   border-spacing-3 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => handleComments(blogDetails._id)}>
                            <img className='w-10 h-10' src={chat} alt="comments" />
                            <span className="ml-2">Add Comment</span>
                        </button>

                        {/*  start of the  thi sis button for the save the post to read for later */}

                        <button className="focus:outline-none">
                            <img onClick={() => handleSaveToUserProfile(blogDetails)} className="w-10 h-10 hover:opacity-75 transition duration-300" src={savedPost} alt="Save Post" />
                        </button>



                        {/* end of the  thi sis button for the save the post to read for later */}

                        {/* Like/Unlike Button */}
                        <button className={`mt-4 ${likeToggler || likesTogglersFromDatabase ? 'text-red-500' : 'text-gray-500'} font-bold flex items-center focus:outline-none`} onClick={() => handleLikes(blogDetails._id)}>
                            {likeToggler || likesTogglersFromDatabase ? (
                                <img className='h-10 w-10 text-red-500' src={like} alt="liked" />
                            ) : (
                                <img className='h-10 w-10 text-gray-500' src={unlike} alt="Disliked" />
                            )}
                            <span>{likesCount}</span>
                        </button>



                    </div>


                </div>
            </div>
            {/* // comments section code */}

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Hello ! {currentUser} Comment if the blog is helpful</h2>



                {/* Add Comment Form */}
                {
                    writeComments && (

                        <>


                            <form>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                                    rows="4"
                                    placeholder="Add your comment..."
                                    value={newComment}
                                    onChange={handleCommentChange}
                                ></textarea>
                                {/* // making the add comment button as a dynamic button 
                            for both editing and adding the comments
                             */}

                            </form>

                            {/* // handloing the form data from the outside */}


                            {handleEdit === true ? (
                                <>
                                    <button
                                        onClick={() => handleFinalEdit(particularCommentId)}
                                        type="submit"
                                        className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                    >
                                        Edit Comment
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="mt-2 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleAddComment}
                                    type="submit"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Add Comment
                                </button>
                            )}



                        </>

                    )
                }
            </div >
            {/* showing the comments sections  */}

            {
                showComments && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">All Comments</h2>

                        {/* //  thi sis the start section for the loading all the comments
 */}

                        <div className="mt-4 flex justify-center">
                            {
                                !loadMoreComments && (<>  <button
                                    onClick={hanldeLoadMoreComments}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                                >
                                    Load All Comments
                                </button></>)
                            }
                        </div>


                        {/*  this is the end of the  getting the all the comments from the thi spost */}

                        {!loadMoreComments && allComments.slice(0, 3).map((comment, index) => (
                            <div key={index} className="border p-4 mb-4 rounded">
                                <p className="text-lg font-bold mb-2">{comment.author}</p>
                                <p className="text-gray-800 mb-2">{comment.comment}</p>

                                <span className="text-gray-600 text-sm">
                                    {!commentEdited && (<span>Posted on </span>)}  {new Date(comment.date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,

                                    })}
                                </span>
                                <CommentsReply comment={comment} />



                                {
                                    currentUser === comment.author && (
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="text-blue-500 hover:underline" onClick={() => handleEditComment(comment.comment, comment._id)}>
                                                Edit Comment
                                            </button>
                                            <button className="text-red-500 hover:underline" onClick={() => handleDeleteComment(comment._id)}>
                                                Delete Comment
                                            </button>
                                        </div>


                                    )
                                }


                            </div>
                        ))}

                        {/* // al the comments start loadling function goes here */}

                        {loadMoreComments && allComments.map((comment, index) => (
                            <div key={index} className="border p-4 mb-4 rounded">
                                <p className="text-lg font-bold mb-2">{comment.author}</p>
                                <p className="text-gray-800 mb-2">{comment.comment}</p>

                                <span className="text-gray-600 text-sm">
                                    {!commentEdited && (<span>Posted on </span>)}  {new Date(comment.date).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,

                                    })}
                                </span>
                                <CommentsReply comment={comment} />



                                {
                                    currentUser === comment.author && (
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="text-blue-500 hover:underline" onClick={() => handleEditComment(comment.comment, comment._id)}>
                                                Edit Comment
                                            </button>
                                            <button className="text-red-500 hover:underline" onClick={() => handleDeleteComment(comment._id)}>
                                                Delete Comment
                                            </button>
                                        </div>


                                    )
                                }


                            </div>
                        ))}

                        {/* // al the comments ends loadling function goes here */}

                    </div >

                )
            }






            <ToastContainer />
        </div>
    );
}

export default ViewBlogInDetails;
