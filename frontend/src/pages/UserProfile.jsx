import { useEffect, useState } from 'react';
import axios from 'axios';
import { userProfile } from '../../utils/apiRoutes';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProfile } from '../../utils/apiRoutes';
import { editUserProfile } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import message from "../assets/message.png";

import AllUsers from '../components/AllUsers/AllUsers';
import accountsSettings from "../assets/accountSetting.png";
import savedPOst from "../assets/saved post.png";
import unsavedPost from "../assets/unsaved post.png";



function UserProfile() {
    const [user, setUser] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [userLoaded, setUserLoaded] = useState(false);
    const [currentUserProfile, setCurrentUserProfile] = useState();
    const [handleEdit, setHandleEdit] = useState(false);
    const [handleFinalEdit, setHandleFinalEdit] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [CreateGroupFlag, setCreateGroupFlag] = useState(false);



    const navigate = useNavigate();



    // making the useState for the collecting the form data;
    const [profileImage, setProfileImage] = useState("");
    const [village, setVillage] = useState("");
    const [districk, setDistrick] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [proffession, setProfession] = useState("");
    const [about, setAbout] = useState("");
    const [accountType, setAccountType] = useState('');


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






    // checking the user is existing in the database or not

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const localStorageUser = await JSON.parse(localStorage.getItem('blog-user'));
                if (localStorageUser) {

                    setUser(localStorageUser);

                }
                else {
                    toast.error("please register first");
                    navigate("/register");
                }
                // console.log(localStorageUser._id);

                try {

                    const response = await axios.get(`${getUserProfile}/${localStorageUser._id}`);
                    if (response.data.status) {

                        setCurrentUserProfile(response.data.response[0]);
                        // console.log("my user _id is", response.data.response[0].village);
                        setProfileCompleted(true);

                    }

                } catch (err) {
                    console.log(err);
                }

                setUserLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();


    }, []);



    const handleSubmitForm = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post(`${userProfile}`, {
                profileImage: profileImage,
                userId: user._id,
                village: village,
                districk: districk,
                pincode: pincode,
                state: state,
                country: country,
                phoneNumber: phoneNumber,
                proffession: proffession,
                about: about,
                accountType: accountType,
            });

            if (response.data.status) {
                toast.success("hello your profile is updated successfully");
                setProfileCompleted(true);
                setSubmit(true);
            }

        } catch (err) {
            console.log(err);
        }


    }

    // this below function is for the setting the account type of the user
    const handleAccountTypeChange = (value) => {
        setAccountType(value);
    };


    const handleEditProfile = () => {
        setProfileCompleted(false);
        setProfileImage(currentUserProfile.profileImage);
        setVillage(currentUserProfile.village);
        setDistrick(currentUserProfile.districk);
        setPincode(currentUserProfile.pincode);
        setState(currentUserProfile.state);
        setCountry(currentUserProfile.country);
        setPhoneNumber(currentUserProfile.phoneNumber);
        setProfession(currentUserProfile.proffession);
        setAbout(currentUserProfile.about);
        setAccountType(currentUserProfile.accountType);
        setHandleEdit(true);
    }


    // final edit function;

    const handleFinalEditProfile = async () => {


        try {
            const response = await axios.post(`${editUserProfile}`, {
                profileImage: profileImage,
                userId: user._id,
                village: village,
                districk: districk,
                pincode: pincode,
                state: state,
                country: country,
                phoneNumber: phoneNumber,
                proffession: proffession,
                about: about,
                accountType: accountType,
            });

            if (response.data.status) {
                setHandleFinalEdit(true);
                toast.info("your profile is updated successfully");
                setHandleEdit(false);

            }


        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {

        const fetchUser = async () => {
            try {
                const localStorageUser = await JSON.parse(localStorage.getItem('blog-user'));
                setUser(localStorageUser);
                // console.log(localStorageUser._id);

                try {

                    const response = await axios.get(`${getUserProfile}/${localStorageUser._id}`);
                    if (response.data.status) {

                        setCurrentUserProfile(response.data.response[0]);
                        // console.log("my user _id is", response.data.response[0].village);
                        setProfileCompleted(true);

                    }

                } catch (err) {
                    console.log(err);
                }

                setUserLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();


    }, [handleFinalEdit, submit, handleEdit]);


    // printing the current user


    // handling the my followers

    const handleFollowers = () => {
        navigate("/followers", {
            state: {
                user: user,
            }
        });

    }


    //   // handling the my followers

    const handleFollowings = () => {
        navigate("/followings", {
            state: {
                user: user,
            }
        });

    }


    // end of the  my followers

    // start of the recent message sections


    const handleRecentMessageOfAllUsers = () => {
        navigate("/userrecentmessages", {
            state: {
                user: user,
            }
        });
        // console.log(user._id);
    }

    // end of the recent message section


    // start of the handling all groups that i created 

    const handleMyGroupsLists = () => {
        navigate("/myallgroups", {
            state: {
                user: user,
            }
        })
    }

    // end of the handling all the groups i have created

    // start of the handling the group creations 

    const handleGroupCreations = () => {
        // console.log("Clicked");
        setCreateGroupFlag(true);
    }

    // end of the handling teh group creations ''


    // start of the saving the post in the users profile

    const handleMySavedPosts = () => {
        // console.log("clicked");
        navigate("/mysavedposts");
    }

    // end of the saving the post in the user profile








    return (

        <div>

            {/* // infor of the user for the current time  */}







            {/* // rendering the form for the uncompleted profiled user  */}



            {
                profileCompleted === true ? (<>  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white p-10 rounded shadow-md max-w-xxl">
                        <div className="text-center mb-6">
                            <img
                                src={currentUserProfile?.profileImage}
                                alt="Profile"
                                className="rounded-full w-20 h-20 mx-auto mb-4 object-cover"
                            />
                            <h2 className="text-3xl font-bold text-blue-700">{user?.username}  Profile</h2>
                            <p className="text-gray-500">User ID: {currentUserProfile?.userId}</p>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                                <p className="text-gray-700">
                                    <span className="font-medium">Village:</span> {currentUserProfile?.village}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">District:</span> {currentUserProfile?.districk}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Pincode:</span> {currentUserProfile?.pincode}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">State:</span> {currentUserProfile?.state}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Country:</span> {currentUserProfile?.country}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Phone Number:</span> {currentUserProfile?.phoneNumber}
                                </p>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Professional Information</h3>
                                <p className="text-gray-700">
                                    <span className="font-medium">Profession:</span> {currentUserProfile?.proffession}
                                </p>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">About Me</h3>
                                <p className="text-gray-700">{currentUserProfile?.about}</p>
                                <div className='flex justify-between space-x-4'>




                                    <button
                                        className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                        onClick={handleEditProfile}
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                        onClick={handleFollowers}
                                    >
                                        Followers
                                    </button>
                                    <button
                                        className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                        onClick={handleFollowings}
                                    >
                                        Followings
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-gray-200 pt-4">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Account Type</h3>
                                <p className={`text-lg ${currentUserProfile?.accountType === 'public' ? 'text-green-500' : 'text-red-500'}`}>
                                    {currentUserProfile?.accountType}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between space-x-4'>
                            <button
                                className="bg-blue-500   hover:bg-blue-600  text-gray-50 text-font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 flex items-center justify-center"
                                onClick={handleRecentMessageOfAllUsers}
                            >
                                <img className='  text-gray-50 w-5 h-5 mr-2' src={message} alt="Message" />
                                <span className="  text-gray-50">Message</span>
                            </button>

                            <button
                                className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                onClick={handleMySavedPosts}
                            >Saved Posts
                            </button>

                            <button
                                className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                onClick={handleMyGroupsLists}
                            >
                                Groups
                            </button>


                        </div>
                    </div>
                </div>

                    {
                        !CreateGroupFlag && (<>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                                    Click below to create groups
                                </h3>
                                <button
                                    onClick={handleGroupCreations}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    Create Groups
                                </button>
                            </div>
                        </>)
                    }

                </>) : (
                    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">

                        <h2 className="text-2xl font-semibold mb-6">Dear  <span className='text-blue-700'>{`@${user?.username}`}</span> please complete your profile </h2>
                        <form >

                            <div className="mb-4">
                                <label htmlFor="village" className="block text-sm font-medium text-gray-600">
                                    profile Image Link
                                </label>
                                <input
                                    value={profileImage}

                                    onChange={(e) => {
                                        setProfileImage(e.target.value);

                                    }} type="text" id="village" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="village" className="block text-sm font-medium text-gray-600">
                                    Village
                                </label>
                                <input onChange={(e) => {
                                    setVillage(e.target.value);

                                }} type="text" value={village} id="village" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="district" className="block text-sm font-medium text-gray-600">
                                    District
                                </label>
                                <input onChange={(e) => {
                                    setDistrick(e.target.value);

                                }} type="text" value={districk} id="district" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">
                                    Pincode
                                </label>
                                <input onChange={(e) => {
                                    setPincode(e.target.value);

                                }} type="text" value={pincode} id="pincode" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-600">
                                    State
                                </label>
                                <input onChange={(e) => {
                                    setState(e.target.value);

                                }} type="text" value={state} id="state" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                                    Country
                                </label>
                                <input onChange={(e) => {
                                    setCountry(e.target.value);

                                }} type="text" value={country} id="country" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                                    Phone Number
                                </label>
                                <input onChange={(e) => {
                                    setPhoneNumber(e.target.value);

                                }} type="tel" value={phoneNumber} id="phone" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="profession" className="block text-sm font-medium text-gray-600">
                                    Profession
                                </label>
                                <input onChange={(e) => {
                                    setProfession(e.target.value);

                                }} type="text" value={proffession} id="profession" className="mt-1 p-2 w-full border rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-600">
                                    About
                                </label>
                                <textarea onChange={(e) => {
                                    setAbout(e.target.value);

                                }} id="about" value={about} className="mt-1 p-2 w-full border rounded-md" rows="3"></textarea>
                            </div>

                            {/* //  showing the user profile base don the private and public choose 
                     */}


                            <div className="mb-4">
                                <label htmlFor="public" className="block text-sm font-medium text-gray-600 mb-2">
                                    Account Type:
                                </label>

                                <div>
                                    <label className="inline-flex items-center mr-4">
                                        <input

                                            type="radio"
                                            id="public"
                                            value={accountType}
                                            checked={accountType === 'public'}
                                            onChange={() => handleAccountTypeChange('public')}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Public</span>
                                    </label>

                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            id="private"
                                            value="private"

                                            onChange={() => handleAccountTypeChange('private')}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Private</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                        {
                            handleEdit === true ? (<>  <button onClick={handleFinalEditProfile}
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                save it
                            </button></>) : (<>  <button onClick={handleSubmitForm}
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button></>)
                        }
                    </div>)
            }





            {/* <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"

            >
                Click to Chat
            </button> */}


            {/* this i have done to for the more good looks of my page */}

            {
                CreateGroupFlag && <AllUsers />
            }



            <ToastContainer />


        </div >


    );
}

export default UserProfile;
