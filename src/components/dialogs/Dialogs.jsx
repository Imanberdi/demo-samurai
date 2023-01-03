import React from "react";
import styled from "styled-components";
import DialogItem from "./DialogItem";
import Message from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage
} from "../../features/dialog/dialogSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Dialogs = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.dialogsPage);
  const isAuth = useSelector((state) => state.auth.isAuth);
  let messages = state.messages;
  let newMessageBody = state.newMessageBody;
  let dialogs = state.dialogs;

  const { register, handleSubmit, reset } = useForm();

  const addNewMessage = (data) => {
    dispatch(sendMessage(data.newMessage));
    reset()
  };

  if (!isAuth) return <Navigate to={"/login"} />;

  return (
    <DialogsContainer>
      <DialogsItem>
        {dialogs.map((d) => (
          <DialogItem key={d.id} name={d.name} id={d.id} />
        ))}
      </DialogsItem>
      <Messages>
        {messages.map((m) => (
          <Message
            store={props.store}
            newMessageBody={newMessageBody}
            key={m.id}
            message={m.message}
            id={m.id}
          />
        ))}
        <div>
          <form onSubmit={handleSubmit(addNewMessage)}>
            <textarea
              {...register("newMessage")}
              placeholder="Enter your message"
            ></textarea>
            <div>
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </Messages>
    </DialogsContainer>
  );
};

export default Dialogs;

const DialogsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;
const DialogsItem = styled.div`
  padding: 10px;
`;

const Messages = styled.div`
  padding: 10px;
`;
