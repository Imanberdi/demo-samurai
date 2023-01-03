import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../features/auth/authSlice";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderContainer>
      <div>
        <HeaderImg
          src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
          alt=""
        />
      </div>

      <LoginBlock>
        {isAuth ? (
          <div>
            <span>{login}</span>
            <button onClick={onLogout}>logout</button>
          </div>
        ) : (
          <NavLink to={"/auth"}>Login</NavLink>
        )}
      </LoginBlock>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  grid-area: header;
  display: grid;
  grid-template-columns: 1fr 4fr;
  background-color: green;
  & span{
    padding-right: 10px;
  }
  & > img {
    width: 20px;
  }
`;

const HeaderImg = styled.img`
  max-width: 100px;
`;
const LoginBlock = styled.div`
  grid-column-start: 4;
  padding: 10px;
`;
