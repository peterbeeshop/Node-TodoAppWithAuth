const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

userRoute.get("/signup", userController.signupUser_get);

userRoute.get("/login", userController.loginUser_get);

userRoute.post("/login", userController.loginUser_post);

userRoute.post("/signup", userController.signupUser_post);
userRoute.post("/logout", userController.logoutUser_post);

module.exports = userRoute;
