import express from "express";
import notesRouter from "./routes/notesRouter.js"
import {connectDB}  from "./config/db.js";
import dotenv from 'dotenv';
import rateLimiter from "./middlelware/ratelimiter.js";
import cors from 'cors'

import path from 'path'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== 'production'){
    app.use(cors())
}

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", notesRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    
    app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))

})
}


connectDB().then(() => {

    app.listen(PORT, ()=> {
        console.log(`The server started on port : ${PORT}`);
    });
})







