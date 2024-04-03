// here we are defining the host of the main api
export const host = 'http://localhost:8080';

// api routes for the registration of a user bro

export const registerRoute = `${host}/register`;


// api routes for the login of a user bro

export const loginRoute = `${host}/login`;

// api for the blogs routes;

export const addBlogRoutes = `${host}/addblog`;
// api for the blogs details
export const getBlogRoutes = `${host}/getblogs`;

// api for all the blogs from the database
export const getAllBlogRoutes = `${host}/getallblogs`;



// api for all the getting the full details of a blog  from the database
export const blogsDetails = `${host}/blogdetails`;

// api for the getting all the blogs related to a particular tags

export const allBlogsByTagName = `${host}/tag`;



// api for thegetting the all details of a blog

export const editBlog = `${host}/editblog`;





// api for thegetting the all details of a blog

export const deleteBlog = `${host}/deleteblog`;



// api for showing all the comments for a particular post;


export const addComments = `${host}/addcomments`;

// api routes for getting all the comments

export const getComments = `${host}/getcomments`;

// api for the edit comments in our blog page

export const editComments = `${host}/editcommets`;



// api for the  delete  omments in our blog page

export const deleteComment = `${host}/deletecomment`;

// making an api for transfering the data from the front end to backend


export const userProfile = `${host}/userprofile`;




// making an api for getting the user details from the database;



export const getUserProfile = `${host}/getuserprofile`;



// making an api for getting the user details from the database;



export const editUserProfile = `${host}/edituserprofile`;


// making api for the storing like counts of a particular post / blog post in the database;

export const addLikes = `${host}`;




// making api for the storing like counts of a particular post / blog post in the database;

export const getLikes = `${host}`;

// making a route for editing the like button
export const editLikes = `${host}`;


// api for the getting the general user profile

export const alluserProfile = `${host}/allusersprofiles`;

// apiroutes for sending direct message to the backend 

export const addMessage = `${host}/addmessage`;

// api fo the getting all messages;
export const getAllMessage = `${host}/getallmessage`;

// api routes for the likes of the blog post

// export const getAllMessage = `${host}/getallmessage`;


// this is my temporary way of getting all the  users from the data base api

export const getAllusers = `${host}/getallusers`;























