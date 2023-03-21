import { createSlice } from "@reduxjs/toolkit";

const initialState = { // setting up global state as light mode
    mode: "light",
    user: null,
    token: null,
    posts: [],
    bucketlist: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.posts = [];
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
        state.posts = [];
        state.loginError = false;
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post['_id'] === action.payload.postId)
          {
            return action.payload.post[0];
          }
          return post;
        });
        state.posts = updatedPosts;
      },
      setBucketlist: (state, action) => {
        state.bucketlist = action.payload.bucketlist;
      },
      setBucketlistItem: (state, action) => {
        const updatedBucketlist = state.bucketlist.map((item) => {
          if (item['_id'] === action.payload.itemId)
          {
            return action.payload.item;
          }
          return item;
        });
        state.bucketlist = updatedBucketlist;
      }
    },
  });

  export const { setMode, setLogin, setLogout, setPosts, setPost, setBucketlist, setBucketlistItem } = authSlice.actions;

  export default authSlice.reducer;