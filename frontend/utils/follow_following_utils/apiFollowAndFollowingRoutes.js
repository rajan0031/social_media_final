// here we are defining the host of the main api
export const host = 'http://localhost:8080';

// api routes for the adding a follower in the database 

export const following = `${host}/allusersprofiles`;

// api routes for the getting the all followers for a particular user 

export const followers = `${host}/followers`;

// api routes for the getting the follower or not booolean value

export const followerDetails = `${host}/followdetails`;

// 
// api routes for the getting the all followers for a particular user 

export const followings = `${host}/followings`;


// route for the unfollowing the particular user



export const Unfollowings = `${host}/unfollowings`;


// route for deleting a follower

export const deleteFollower = `${host}/deletefollower`;




