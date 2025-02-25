import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";


const app = express();




app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use("/posts", postRoutes);


const CONNECTION_URL='mongodb+srv://akshs2937:O3LjaG9tRjC71pB6@cluster0.3afys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 5000;

// , {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(CONNECTION_URL)
.then( () => { app.listen(5000, () => {console.log(`Server running on port ${PORT}`)}) } )
.catch( (error) => {
    console.log("errrr",error.message)
} );

// mongoose.set('useFindAndModify', false);






// console.log(process.env.MONGODB_PASSWORD)



