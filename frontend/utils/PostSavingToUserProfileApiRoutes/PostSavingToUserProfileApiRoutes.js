// here we are defining the host of the main api
export const host = 'http://localhost:8080';

// this is the apir outef for the sending the for the frontend data to the backedn
// saving the ppost to the user profile

export const AddPostsToProfile = `${host}/addpoststoprofile`;

// this is the api routes for the getting the 

export const getPostsOfProfile = `${host}/getpostsofprofile`;

// this is the frontend api routes for the deleting of a post

export const deleteUserSavedPostsFromUserProfile = `${host}/deleteusersavedpostfromUserprofile`;