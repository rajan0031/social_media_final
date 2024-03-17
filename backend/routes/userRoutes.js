const { register, login } = require("../Controllers/userControllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the registration route
router.post("/register", register);  

// adjust the login route
router.post("/login", login);



module.exports = router;
