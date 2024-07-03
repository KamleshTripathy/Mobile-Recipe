const express = require("express");

const {
  addUser,
  loginUser,
  updateUser,
  getUsersDetails,
} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/signup", addUser);
userRouter.post("/signin", loginUser);
userRouter.get("/:id", getUsersDetails);
userRouter.put("/:id", updateUser);

module.exports = userRouter;
