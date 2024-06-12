const { register, login, getAllusers } = require("../Controllers/userControllers");
// this is not a default export so i have to take it like that bro 


// ab ek express ka router banawo bhai


const router = require("express").Router();

// Adjust the registration route
router.post("/register", register);

// adjust the login route
router.post("/login", login);

router.get("/getallusers", getAllusers);






module.exports = router;




// const: Keyword in JavaScript for declaring constants.
// router: Variable name referring to an instance of the Express router.
// require("express").Router(): Imports the Express module and accesses its Router function to create a new router object.
// So, in summary:

// Creates a constant named router.
// Sets it to an instance of the Express router created using the Router() function from the Express module.
