import React, { useEffect } from 'react'
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dark from "../assets/black.png"
import light from "../assets/light.png"



function NavBar() {

    // a state for the dark mode and light mode 

    const [mode, setMode] = useState(false);
    const [searchData, setSearchData] = useState("");

    const navigate = useNavigate();

    // State to manage the visibility of the mobile menu
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




    // set user data

    const [currentUser, setCurrentUser] = useState();

    // Function to toggle the mobile menu state
    const toggleMobileMenu = () => {
        console.log("Toggling mobile menu"); // Add this line
        setMobileMenuOpen(!mobileMenuOpen);
        console.log("clicked");
    };
    // applying the logout functionality here

    const handleLogout = async () => {
        // console.log("logout");
        try {
            const response = await localStorage.removeItem('blog-user');
            console.log(response);
            navigate("/register");
        } catch (err) {
            console.log(err)
        }
    }

    // handling the logout functionality by the useEffect 

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                // console.log(userDetails);
                if (!userDetails) {
                    navigate("/register");
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

    // setting the light mode and dark mode

    const handleModeChange = (e) => {
        setMode(!mode);
        console.log(e.target);
    }
    // 

    // start of the getting the inputs from the search box

    const handleSearchInputs = (e) => {
        // console.log(e.target.value);
        setSearchData(e.target.value);
    }

    // end of the getting the data from the search box

    // handle the search from the blogs on the page

    const handleSearchBlog = () => {

        console.log(searchData);
        setSearchData("");
        navigate("/searchresults", {
            state: {
                searchData: searchData
            }
        });

    }

    // handle the search from the blogs on the page


    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={mobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
                        </button>
                        {/* Dropdown menu */}
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Rajan</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">ray@gmail.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"></Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </li>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    dark mode
                                </button>

                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page" >Home</Link>
                            </li>
                            <li>
                                <Link to="/myblogs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Your Blogs posts</Link>
                            </li>
                            <li>
                                <Link to="/createblog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Blogs</Link>
                            </li>
                            <li>
                                <Link to="/userprofile" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Account</Link>
                            </li>
                            <li>
                                <a onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</a>
                            </li>
                            <div className="flex items-center">
                                {mode ? (
                                    <button onClick={handleModeChange} className="mode-button">
                                        <img className="bg-gray-50 h-5 w-5" src={light} alt="Light Mode" />
                                    </button>
                                ) : (
                                    <button onClick={handleModeChange} className="mode-button">
                                        <img className="h-5 w-5" src={dark} alt="Dark Mode" />
                                    </button>
                                )}
                                <input value={searchData} onChange={handleSearchInputs} type="text" className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg outline-none ml-2" />
                                <button onClick={handleSearchBlog}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Search</button>
                            </div>

                        </ul>

                    </div>


                </div>

            </nav >
        </div >
    )
}

export default NavBar
