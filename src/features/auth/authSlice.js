import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../../api/api";

export const getAuthUserData = createAsyncThunk(
  "auth/getAuthUserData",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const res = await authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setAuthUserData(res.data.data));
        }
      });
      if (res.status !== 200) {
        throw new Error("Cannot add user-profile. Server error");
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async function (data, { rejectWithValue, dispatch }) {
    let { email, password, rememberMe } = data;
    try {
      const res = await authAPI
        .login(email, password, rememberMe)
        .then((res) => {
          if (res.data.resultCode == 0) {
            dispatch(getAuthUserData());
          }
        });
      if (res.status !== 200) {
        throw new Error("Cannot login. Server error");
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async function (_, { rejectWithValue, dispatch }) {
    let purification = { id: null, login: null, email: null, isAuth: false };
    try {
      const res = await authAPI.logout().then((res) => {
        if (res.data.resultCode == 0) {
          dispatch(dispatch(deleteAuthUserData(purification)));
        }
      });
      if (res.status !== 200) {
        throw new Error("Cannot logout. Server error");
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

let initialState = {
  email: null,
  id: null,
  login: null,
  isAuth: false,
};

// const setError = () => {
//   state.status = "rejected";
//   state.error = action.payload;
// };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    },
    deleteAuthUserData: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuth: false,
      };
    },
  },
  // extraReducers: {
  //   [getAuthUserData.rejected]: setError,
  // },
});

export const { setAuthUserData, deleteAuthUserData } = authSlice.actions;
export default authSlice.reducer;
