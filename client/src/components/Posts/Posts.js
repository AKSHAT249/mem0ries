import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Post from "../Posts/Post/Post";
import {Grid} from '@mui/material';
import {createPost, fetchPost} from "../../store/slices/postSlice";


const Posts = ({setCurrentId}) => {

  const dispatch = useDispatch();

  const allPosts = useSelector( (state) => state.postSlice );
  console.log("allPosts", allPosts);

  // const [allPosts, setAllPosts] = useState(null);

  useEffect( () => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/posts/");
      // console.log("response", response);
      // setAllPosts(response.data);
      const data =  response.data;
      console.log("data",data);
      dispatch(fetchPost(response.data))

    }
    
    fetchPosts();

    

  }, [] )

  console.log("allPosts", allPosts);


  return (
    <div>
    <Grid container spacing={4}  >
      {
        allPosts && allPosts.map( (post) => {
          return (
            <Grid key={post._id} item sm={12} md={6} lg={4}>
              <Post  post={post} setCurrentId={setCurrentId} />
            </Grid>
            )
        } )
      }
      </Grid>
    </div>
  )
}

export default Posts