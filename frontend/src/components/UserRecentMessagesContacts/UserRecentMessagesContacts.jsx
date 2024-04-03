import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { recentMessage } from '../../../utils/RecentMessages/RecentMessages';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

import UsersRecentVideoCalls from '../UsersRecentVideoCalls/UsersRecentVideoCalls';

import UserCalledTheCurrentLocalUser from '../UsersRecentVideoCalls/UserCalledTheCurrentLocalUser';

function UserRecentMessagesContacts() {

    const [recentUsersMessages, setRecentUsersMessages] = useState([]);



    const location = useLocation();

    const user = location.state?.user;

    const navigate = useNavigate();


    useEffect(() => {
        // console.log(user._id);

        const fetch = async () => {
            try {
                const response = await axios.post(`${recentMessage}`, {
                    userId: user._id,
                });
                if (response) {
                    setRecentUsersMessages(response.data.response);
                    console.log(typeof response.data.response);
                }
            } catch (err) {
                console.log(err);
            }

        }
        fetch();
    }, [])


    // start of the hnadling handleDirectMessageTouser 

    const handleDirectMessageToUser = (user) => {
        navigate("/directmessage", {
            state: {
                from: user.from,
                to: user.to,
                fromName: user.fromName,
                toName: user.toName,
            },
        });

    }


    // end of the handling the direct message

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Recent Conversations</h1>
            {recentUsersMessages.length > 0 ? (recentUsersMessages.map((user, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <button
                        onClick={() => handleDirectMessageToUser(user)}
                        className="text-blue-500 font-semibold hover:underline mb-2"
                    >
                        {user?.fromName ? user.toName : user.to}
                    </button>
                    <p className="text-gray-600">{user.message}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        {new Date(user.timestamp).toLocaleString()}
                    </p>
                </div>
            ))) : (<>no recent messages</>)}

            <div>
                This the section for the recent Video calls from the users for you
                <UsersRecentVideoCalls />
            </div>

            <div>
                the different users have called the current local user

                <UserCalledTheCurrentLocalUser user={user} />
            </div>
        </div>
    )
}

export default UserRecentMessagesContacts;
