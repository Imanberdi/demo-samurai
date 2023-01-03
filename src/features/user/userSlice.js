import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../../api/api";

export const requestUsers = createAsyncThunk(
  "user/requestUsers",
  async function (page, { rejectWithValue, dispatch }) {
    try {
      const res = await usersAPI.getUsers(page);
      if (res.status !== 200) {
        throw new Error("Cannot add users. Server error");
      }
      dispatch(setUsers(res.data.items));
      dispatch(setTotalUsersCount(res.data.totalCount));
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

export const follow = createAsyncThunk(
  "user/follow",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      const res = await usersAPI.follow(userId);
      if (res.data.resultCode == 0) {
        dispatch(toggleFollow(userId));
      }
      if (res.status !== 200) {
        throw new Error("Cannot toggle. Server error");
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);
export const UnFollow = createAsyncThunk(
  "user/unfollow",
  async function (userId, { rejectWithValue, dispatch }) {
    try {
      const res = await usersAPI.unFollow(userId);
      if (res.data.resultCode == 0) {
        dispatch(toggleFollow(userId));
      }
      if (res.status !== 200) {
        throw new Error("Cannot toggle. Server error");
      }
    } catch (error) {
      return rejectWithValue(error.messages);
    }
  }
);

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  page: 1,
  isFetching: false,
};

const setError = () => {
  state.status = "rejected";
  state.error = action.payload;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFollow: (state, action) => {
      const toggleItem = state.users.find((user) => user.id === action.payload);
      toggleItem.followed = !toggleItem.followed;
    },
    setUsers: (state, action) => {
      return {
        ...state,
        users: [...action.payload],
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    setTotalUsersCount: (state, action) => {
      return {
        ...state,
        totalUsersCount: action.payload,
      };
    },
    toggleIsFetching: (state, action) => {
      return {
        ...state,
        isFetching: action.payload,
      };
    },
  },
  extraReducers: {
    [requestUsers.pending]: (state, action) => {
      state.isFetching = true;
    },
    [requestUsers.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [requestUsers.rejected]: setError,

    [follow.rejected]: setError,

    [UnFollow.rejected]: setError,
  },
});
export const {
  toggleFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
} = userSlice.actions;
export default userSlice.reducer;
