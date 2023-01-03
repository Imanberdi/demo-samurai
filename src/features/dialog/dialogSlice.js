import { createSlice } from "@reduxjs/toolkit";

const NumId = 7;
let initialState = {
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" },
  ],
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ],
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    // updateNewMessage: (state, action) => {
    //   return {
    //     ...state,
    //     newMessageBody: action.payload,
    //   };
    // },
    sendMessage: (state, action) => {
      let body = action.payload;
      return {
        ...state,
        messages: [...state.messages, { id: 8, message: body }],
      };
    },
  },
});

export const { updateNewMessage, sendMessage } = dialogSlice.actions;
export default dialogSlice.reducer;
