import { createSlice } from "@reduxjs/toolkit";

const initialState = { // setting up global state as light mode
    mode: "light",
    user: null,
    token: null,
    posts: [],
    searchStr: ''
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
      setLoginError: (state, action) => {
        state.loginError = true;
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
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
      setSearchStr: (state, action) => {
        state.searchStr = action.payload.searchStr;
      }
    },
  });

  export const { setMode, setLogin, setLogout, setPosts, setPost, setLoginError, setSearchStr } = authSlice.actions;

  export default authSlice.reducer;