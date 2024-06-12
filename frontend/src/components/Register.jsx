import { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';





function Register() {

    // using use navigate 

    const navigate = useNavigate();


    // State variables
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [password, setpassword] = useState("");
    const [conform_password, setconform_password] = useState("");

    const handleformdata = async (e) => {
        e.preventDefault();

        if (username.length == 0 || email.length == 0 || password.length == 0 || conform_password.length == 0) {
            toast.error("all fields are required!");
            return;
        }

        else if (username.length < 3) {
            toast.error("username must be of at least 3 character")
        }

        else if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Invalid email format");
        }

        else if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
        }

        else if (password !== conform_password) {
            toast.error("Passwords do not match");
        }

        // Validation: Password must contain at least one uppercase letter
        else if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
        }

        // Validation: Password must contain at least one digit
        else if (!/\d/.test(password)) {
            toast.error("Password must contain at least one digit");
        }

        // Validation: Password must contain at least one special character
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error("Password must contain at least one special character");
        }

        else {
            try {
                const response = await axios.post(`${registerRoute}`, {
                    username: username,
                    email: email,
                    password: password,
                });

                console.log(response.data);
                if (response.data.status == false) {
                    toast.error(`${response.data.message}`);

                }
                else if (response.data.status == true) {
                    navigate("/login");
                    toast.success(`Account created successfully`);

                }
            } catch (err) {
                console.log(err)
            }
        }

    }







    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form onSubmit={handleformdata} className="space-y-4 md:space-y-6">

                                {/* // user name  sections*/}
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your User name</label>
                                    <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your user name" onChange={((e) => {
                                        setusername(e.target.value)
                                    })} required />
                                </div>
                                {/* email sections */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username@company.com" onChange={((e) => {
                                        setemail(e.target.value)
                                    })} required />
                                </div>


                                {/* password section  */}

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={((e) => {
                                        setpassword(e.target.value)
                                    })} required />

                                </div>


                                {/* conform password sections */}


                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                        onChange={((e) => {
                                            setconform_password(e.target.value)
                                        })} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>



                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?<Link className='className="font-medium text-primary-600 hover:underline dark:text-primary-500"' to="/login">Login </Link>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default Register;
