import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookiOption, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../middlewares/utility.js";

// Register API
const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "ab1c",
    url: "ab1c",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User Created");
};

// Login API
const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  console.log("Retrieved User:", user); // Check the retrieved user

  if (!user) {
    return next(new ErrorHandler("Invalid Username and Password", 404));
  }

  console.log("User password from DB:", user.password); // Log password from DB

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username and Password", 404));
  }

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});


// GetMyProfile API
const getMyProfile = TryCatch(async (req, res) => {

  const user =  await User.findById(req.user)
 
   res.status(200).json({
     sucess:true,
     user,
   })
 });

 const logout  = TryCatch(async (req, res) => {
    return res.status(200).cookie("chat-app"," ",{...cookiOption,maxAge:0}).json({
      sucess:true,
      message: "Logout Successfully"
    });
 });

const searchUser = TryCatch(async (req, res) => {
const {name} = req.query;
  return res.status(200).json({
    sucess:true,
    message: name
  });
});

export { login, newUser, getMyProfile,logout,searchUser };
