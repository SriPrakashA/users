const express = require("express");
const { registerUser, loginUser, getUsers } = require("./controller/userController");
const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/users",getUsers);


module.exports = router;