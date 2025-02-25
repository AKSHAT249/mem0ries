import { createSlice } from "@reduxjs/toolkit";



export const postSlice = createSlice({
    name:"postSlice",
    initialState:[],
    reducers:{
        
        createPost: (state,action) => {
            console.log("createPostState", state)
            state = [...state, action.payload]
            console.log("afterCreatePost", state)
            return state
            
        },
        fetchPost: (state,action) => {
            state = action.payload;
            return state
            

        },
        deletePost: (state, action)=> {
            const id = action.payload._id;
            console.log("deletePostSlice", id)
            state = state.filter( (post) => post._id!==id );
            return state
            
        },
        updatePost: (state,action) => {
            // const id = action.payload;
            // console.log("aaaaaaaaaaaa",action.payload)
            const index = state.findIndex((p) => p._id === action.payload._id);
            if(index !== -1){
                state[index] = action.payload
            }

            return state

        }

        
        

    }
});


export default postSlice.reducer;
export const { createPost, fetchPost, deletePost, updatePost} = postSlice.actions;



