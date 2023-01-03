import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthUserData } from "../auth/authSlice";

export const initializeApp = createAsyncThunk(
  "app/initializeApp",
  function (_, { rejectWithValue, dispatch }) {
    dispatch(getAuthUserData());
    // console.log(promise);
    // promise.then(() => {
    //   dispatch(initSuccess());
    // });
  }
);

let initialState = {
  initialized: false,
};

// const setError = () => {
//   state.status = "rejected";
//   state.error = action.payload;
// };

export const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initSuccess: (state, action) => {
      return {
        ...state,
        initialized: true,
      };
    },
  },
  extraReducers: {
    // [initializeApp.pending]: (state, action) => {
    //   state.initialized = true;
    // },
    [initializeApp.fulfilled]: (state, action) => {
      state.initialized = true;
    },
  },
});

export const { initSuccess } = authSlice.actions;
export default authSlice.reducer;
