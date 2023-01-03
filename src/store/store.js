import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../features/app/appSlice";
import authSlice from "../features/auth/authSlice";
import dialogSlice from "../features/dialog/dialogSlice";
import profileSlice from "../features/profile/profileSlice";
import userSlice from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    dialogsPage: dialogSlice,
    profilePage: profileSlice,
    usersPage: userSlice,
    auth: authSlice,
    app: appSlice,
  },
});

window.store = store;
