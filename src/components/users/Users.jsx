import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import userPhoto from "../../assets/images/userPhoto.jpg";
import {
  follow,
  UnFollow,
  requestUsers,
  setCurrentPage,
} from "../../features/user/userSlice";
import { useEffect } from "react";
import { Preloader } from "../common/Preloader";
import Paginator from "./Paginator";
import User from "./User";

const Users = (props) => {
  let users = useSelector((state) => state.usersPage.users);
  let page = useSelector((state) => state.usersPage.page);
  let isFetching = useSelector((state) => state.usersPage.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestUsers(page));
  }, [page]);

  const onPageChange = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
  };

  return (
    <>
      {isFetching && <Preloader />}
      <div>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            userPhoto={userPhoto}
            follow={follow}
            UnFollow={UnFollow}
          />
        ))}
        <Paginator onPageChange={onPageChange} />
      </div>
    </>
  );
};

export default Users;

