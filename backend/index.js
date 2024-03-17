const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/comments");
const userProfileRoutes =
    require("./routes/userProfileRoutes");
const likesRoutes = require("./routes/blogLikesCount");
const messageRoutes = require("./routes/directMessage");
const followRoutes = require("./routes/follow Routes/followRoutes")

const messageEditAndDeleteRoute = require("./routes/message_edit_and_delete_routes/message_edit_and_delete_route")

app.use(cors());
app.use(express.json());
// Use express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));



require("dotenv").config();


// Adjust the registration route
app.use("/", userRoutes); // Change the route path to /api

// api for blogs routes;

app.use("/", blogRoutes);

// api for the comments in my blogs

app.use("/", commentRoutes);



// api for the useProfile in the system in my blogs

app.use("/", userProfileRoutes);


// api for the handling the likes of the and dislikes of the blog

app.use('/', likesRoutes);



// api for the handling the message between users
app.use('/', messageRoutes);

// api for handling the messages between two users

app.use('/', messageEditAndDeleteRoute);

// this is my followers routes

app.use('/', followRoutes)







// database connections 
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.LINK}`).then(() => {
    console.log("Database connected succesfully")
}).catch((err) => {
    console.log(err)
});

// database connection ended


app.get("/", (req, res) => {
    res.send("this is home page");
});


const PORT = 8080;  // specify the port number
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});

