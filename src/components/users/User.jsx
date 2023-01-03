import React from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const User = ({ user, userPhoto, follow, UnFollow }) => {

    const dispatch = useDispatch();
  return (    
      <div>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <Image
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              alt="avatar"
            />
          </NavLink>
          {user.followed ? (
            <Button
              variant="contained"
              onClick={() => {
                dispatch(UnFollow(user.id));
              }}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                dispatch(follow(user.id));
              }}
            >
              Follow
            </Button>
          )}
        </div>
        <div>
          <div>{user.name}</div>
          <div>{user.status} </div>
        </div>
      </div>
  );
};

export default User;


const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
`;
