

import React, {useState} from "react";
import {Grid, Box,Typography, Button, Modal} from "@mui/material";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useDispatch } from "react-redux";
import { deletePost } from "../../../store/slices/postSlice";

const url = "http://localhost:5000/posts";


const Post = ({post, setCurrentId}) => {

  const dispatch = useDispatch();
  const tags = post.tags[0].split(",")
  // console.log(tags);

  const handleDelete = async () => {
    const id = post._id;
    let particularURL = url + `/${id}`;
    const response = await axios.delete(particularURL);
    console.log("deleted successfullt", response.data);
    toast.success(`Memory with id:${post._id} is successfully deleted`);
    dispatch(deletePost({_id:id}));

  }





  return(
    <Box boxShadow={3} sx={{borderRadius:"10px", padding:"16px"}}>
      <Grid container  sx={{display:"flex", flexDirection:"column", alignItems:"flex-start", flexWrap:"wrap", gap:"10px"}}>
        <Grid item  lg={12} sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", padding:"16px"}}>
          <img src={post.selectedFile} width="200px"    />
        </Grid>
        <Grid item sx={{display:"flex", flexDirection:"row", gap:"20px", paddingLeft:"16px"}} >
          {
            tags.map( (tag, index) => {
              return(
                <div key={index}>
                <p key={tag} style={{fontSize:"16px", color:"#758694"}} >#{tag}</p>
                </div>
              )
            })
          }
        </Grid>
        <Grid item sx={{paddingLeft:"16px"}}>
          <Typography variant="h4" sx={{fontWeight:"600"}}>
            {post.title}
          </Typography>
          
        </Grid>
        <Grid item sx={{paddingLeft:"16px"}}>
          <Typography variant="body1" sx={{color:"#758694"}}>
            {post.message}
          </Typography>
        </Grid>
        <Grid item sx={{display:"flex", flexDirection:"row", paddingLeft:"16px", justifyContent:"space-around", gap:"20px"}}>
          <Button variant="contained" sx={{fontWeight:"400"}} onClick={() => setCurrentId(post._id)}>Edit</Button>
          <Button variant="contained"color="error" sx={{fontWeight:"400"}} onClick={handleDelete} >Delete</Button>
        </Grid>


      </Grid>
    </Box>
  )
}

export default Post;

