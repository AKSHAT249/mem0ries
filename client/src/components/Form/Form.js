import React, {useState, useEffect} from 'react';
import {Typography,Box, Grid, TextField, Button, Modal} from "@mui/material";

import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../store/slices/postSlice';
import { useSelector } from 'react-redux';
import axios from "axios";
import { toast } from 'react-hot-toast';


const url = "http://localhost:5000/posts";


const Form = ({currentId}) => {

  console.log("currentIdForm", currentId);
  const post = useSelector( (state) => currentId? state.postSlice.find((p) => p._id === currentId) : null);
  console.log("post", post);


  const dispatch = useDispatch();

  
  
  const [formData, setFormData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

    console.log("formdata", formData);


    useEffect(() => {
      if (post) {
        setFormData(post);
      }
    }, [post, currentId]);
  
  

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value}); 
  }
  


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  };




  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setFormData({...formData, [e.target.name]:base64});
  };


  const notify = () => toast.success('Memory created successfully');
  const updateNotify = () => toast.success('Memory updated successfully');

  


  const handleSubmit =async (e) => {
    // console.log("handleSubmit")
    if(currentId){

      console.log("sssssssssssss", currentId);
      const updateURL = url + `/${currentId}` 
      const res = await axios.put(updateURL, formData);
      console.log("updated successfully", res);
      
      dispatch(updatePost(formData));
      updateNotify();

      // console.log("filtered", allPosts.filter( (post) => post._id === currentId ));

      


    }
    else
    {

      const res =  await axios.post(url, formData);
      dispatch(createPost(res.data));
      notify();
      setFormData({
        creator:"",
        title:"",
        message:"",
        tags:"",
        selectedFile:""
      });
      document.getElementById("file-input").value = "";

    }
    
    
  };


  const handleClear = () => {
    setFormData({
      creator:"",
      title:"",
      message:"",
      tags:"",
      selectedFile:""
    });
    document.getElementById("file-input").value = "";
    

  }


  



  return (
    <Box boxShadow={2} spacing={20} sx={{border:"1px solid #003092", padding:"24px", borderRadius:"6px", gap:"20px"}}>
      <Grid container spacing={2} sx={{display:"flex", flexDirection:"column", padding:"8px"}}>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          {currentId ? <Typography>Edit Memory</Typography> :  <Typography>Create Memory</Typography>}
        </Grid>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          <TextField id="outlined-basic" label="Creator" name="creator" value={formData.creator} onChange={handleChange} variant="outlined" />
        </Grid>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          <TextField id="outlined-basic" label="Title" name="title" value={formData.title} onChange={handleChange} variant="outlined" />
        </Grid>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          <TextField id="outlined-basic" label="Message" name="message" value={formData.message} onChange={handleChange} variant="outlined" />
        </Grid>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          <TextField id="outlined-basic" label="Tags(separated by  ' , ' )" name="tags" value={formData.tags} onChange={handleChange} variant="outlined" />
        </Grid>
        <Grid item lg={12} md={12} xs={12} sx={{textAlign:"center"}}>
          <input 
            id="file-input" 
            label="Image"
            name="selectedFile"
            accept=".jpeg, .png, .jpg"
            type="file"
            onChange={(e) => handleFileUpload(e)}  
            variant="outlined" /> 

          
          
        </Grid>
        <Grid item lg={12} md={12} xs={12} fullWidth >
        <Button fullWidth variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
          </Grid>
        <Grid item lg={12} md={12} xs={12} fullWidth>
          <Button fullWidth variant="outlined" onClick={handleClear} color="error">Clear</Button>
        </Grid>
        
        
        
      </Grid>
      
    </Box>
  )
}

export default Form