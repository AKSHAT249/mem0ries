
import PostMessage from "../models/postMessage.js";


export const getPosts = async (req, res)=> {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);


    }catch(error){
        console.log("error in getPosts route", error.message);
        res.status(500).json({error:error.message});
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
   try{
       await newPost.save();

       res.status(201).json(newPost);

   }catch(error){
       console.log("error in createPost controller", error.message);
       res.status(500).json({error:error.message});

   }

}


export const deletePost = async (req, res) => {
    const id = req.params["id"];
    
    try{

        const isExisted = await PostMessage.findOne({_id:id});
        if(isExisted){
            const response = await PostMessage.findOneAndDelete({_id:id});

            return res.status(200).json({message:"Memory deleted successfully"});
        }

    }catch(error){
        console.log("error in deletePost", error.message);
        return res.status(500).json({error:"Internal server error"});

    }
}


export const updatePost = async (req, res) => {
    const {id} = req.params;
    
    // console.log("id",id)
    // console.log(req.body);
    try{
        const isExisted = await PostMessage.findOne({_id:id});
        if(isExisted){
            console.log("isExisted", isExisted);
            const response = await PostMessage.findByIdAndUpdate({_id:id}, req.body);
            return res.status(200).json({message:`Memory with id:${id} is  updated successfully ${response.data}`});

        }
        

    }catch(err){
        console.log("error in updatePost", error.message);
    }
}