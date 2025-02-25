import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();





app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use("/posts", postRoutes);


const CONNECTION_URL=process.env.CONNECTION_URL;

const PORT = process.env.PORT;


// , {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(CONNECTION_URL)
.then( () => { app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)}) } )
.catch( (error) => {
    console.log("errrr",error.message)
} );

// mongoose.set('useFindAndModify', false);






// console.log(process.env.MONGODB_PASSWORD)



