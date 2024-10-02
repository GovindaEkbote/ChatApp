import mongoose, { connect } from "mongoose";
import jwt from 'jsonwebtoken';
const cookiOption = {
    mxAge:15 *24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly:true,
    secure:true,
}

const connectDB = () =>{
    mongoose.connect('mongodb://localhost:27017',{dbName:"ChatApp"})
    .then((data)=>{console.log(`Connected to DB: ${data.connection.host}`)})
    .catch((err) =>{
        throw err;
    })
}

const sendToken = (res,user,code, message) =>{
    const token = jwt.sign(
        {_id:user._id },
        process.env.JWT_SECRET
   );
   console.log(token);

    return res.status(code).cookie("chat-app",token,cookiOption).json({
        success: true,
        message,
    });
};

const emitEvent = (req,event,user,data) =>{
    console.log("Emitting Events",event);
    
}
export {connectDB,sendToken,cookiOption,emitEvent}