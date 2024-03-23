const mongoose = require("mongoose");
// this is the search model it have beeen prepared if it can be used in the future


const Search = require("../../Models/searchResultsModel/searchResultsModel");
// importing the blog model from the model folder

const Blog = require("../../Models/blogModel");



// start of getting blogs/posts  from the database;


module.exports.searchResults = async (req, res) => {

    try {
        const query = req.body.searchData.toString(); // Convert to string explicitly

        const response = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search in title
                { author: { $regex: query, $options: 'i' } }, // Case-insensitive regex search in Autohr
                { category: { $regex: query, $options: 'i' } }, // Case-insensitive regex search in category
                { content: { $regex: query, $options: 'i' } }, // Case-insensitive regex search in content
                { tags: { $regex: query, $options: 'i' } } // Case-insensitive regex search in tags
            ]
        });

        res.json({
            response: response,
            status: true,
            message: "Here are all your blogs matching the query.",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

// end of the getting blogs from the database;



