import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postsSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        storeAllPosts: (state, action)=> {
            state.posts = action.payload;
        },

        addPost: (state, action)=> {
            state.posts.push(action.payload);
        },

        updatePost: (state, action)=> {
            state.posts = state.posts.map((post)=> post.$id === action.payload.id ? action.payload.newPost : post);
        },

        deletePost: (state, action)=> {
            state.posts = state.posts.filter((post)=> post.$id !== action.payload.id);
        }
    }
});

export const {storeAllPosts, addPost, updatePost, deletePost} = postsSlice.actions;
export default postsSlice.reducer;