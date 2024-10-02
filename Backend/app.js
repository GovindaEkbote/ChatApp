import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv';
import { errorMiddle } from "./middlewares/error.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js'; 
import chatRoutes from './routes/chat.js'; 
import { createUser } from "./seeders/user.js";

const app = express();
app.use(express.json());
app.use(cookieParser())

dotenv.config({
    path:'./.env',
})
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI)
// createUser(10)

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

app.get('/',(req,res) =>{
    res.send("Hello World default page");
})

app.use(errorMiddle )

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
