import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileAPI, usersAPI } from "../../api/api";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      const res = await usersAPI.getProfile(userId);
      if (res.status !== 200) {
        throw new Error("Cannot add users. Server error");
      }
      dispatch(setUserProfile(res.data));
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

export const getStatus = createAsyncThunk(
  "profile/getStatus",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileAPI.getStatus(userId);
      dispatch(setStatus(res.data));
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "profile/updateStatus",
  async (status, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileAPI.updateStatus(status);
      if (res.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  profile: null,
  status: "",
};

const setError = () => {
  state.status = "rejected";
  state.error = action.payload;
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addPost: (state, action) => {
      let newPost = {
        id: 5,
        message: action.payload,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    },
    setUserProfile: (state, action) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    setStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
  // extraReducers: {
  //   [fetchUserProfile.pending]: (state, action) => {
  //     state.isFetching = true;
  //   },
  //   [fetchUserProfile.fulfilled]: (state, action) => {
  //     state.isFetching = false;
  //   },
  //   [fetchUserProfile.rejected]: setError,
  // },
});

export const { updateNewPost, addPost, setUserProfile, setStatus } =
  profileSlice.actions;
export default profileSlice.reducer;
