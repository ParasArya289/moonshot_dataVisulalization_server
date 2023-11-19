const express = require("express");
const userRouter = express.Router();
const {signupController,loginController} = require("../Controllers/user.controllers.js");
const {checkForUserExistence,checkForToken} = require("../Middlewares/user.middleware.js");

userRouter.post("/signup",checkForUserExistence,signupController);
userRouter.post("/login",loginController);

module.exports=userRouter;