import   jwt  from "jsonwebtoken";
import { TryCatch } from "./error.js";
import { ErrorHandler } from "./utility.js";
import { de } from "@faker-js/faker";

const isAuthenticated = (req,res,next) =>{
    const token = req.cookies["chat-app"];
    if(!token){
        return next(new ErrorHandler("Please Login to access this route",401))
    }
    const decodedDate = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decodedDate._id;
     
    next();    
}

export {isAuthenticated}