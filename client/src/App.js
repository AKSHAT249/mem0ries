import React, {useState} from 'react';
import { Container, AppBar, } from "@material-ui/core";
import memoriesImage from "./images/memories.png";
import {Box, Typography, Grow, Grid } from '@mui/material';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {

  const [currentId, setCurrentId] = useState(null)
  

  return (
    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"100%", justifyContent:"center", margin:"24px"}}>
      <Toaster />
      <Grid boxShadow={2} lg={12} md={12} sm={12} sx={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"24px", width:"80%", borderRadius:"6px", padding:"8px"}}>
        <Typography variant="h3" sx={{fontSize:"xl", color:"#003092", fontFamily:"montserrat"}} >Memories</Typography>
        <img src={memoriesImage} alt="memories" height="60" />
      </Grid>
      <Grid container  sx={{display:"flex", flexDirection:"row", justifyContent:"space-around", marginTop:"32px"}}>
        <Grid item lg={7} sm={12}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item lg={3} sm={12}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>

      </Grid>
       
      
    </Box>
  )
}

export default App;