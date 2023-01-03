import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus,
  updateStatus,
} from "../../../features/profile/profileSlice";
import { useForm } from "react-hook-form";

const ProfileStatus = (props) => {
  const { register, handleSubmit } = useForm();
  const statusProfile = useSelector((state) => state.profilePage.status);
  const dispatch = useDispatch();
  let [editMode, setEditMode] = useState(false);
  let userId = props.userId;

  useEffect(() => {
    dispatch(getStatus(userId));
  }, []);

  const activateEditMode = () => {
    setEditMode(true)
  };

  const onSubmit = (data) => {
    dispatch(updateStatus(data.status));
    setEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!editMode ? (
        <div>
          <span onClick={activateEditMode}>{statusProfile}</span>
        </div>
      ) : (
        <div>
          <input
            {...register("status")}
            defaultValue={statusProfile}
            autoFocus
          />
        </div>
      )}
      <input type="submit" />
    </form>
  );
};

export default ProfileStatus;
