import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <Nav>

      {/* <Item>
        <NavLink to="/login">Login</NavLink>
      </Item> */}
      <Item>
        <NavLink to="/profile">Profile</NavLink>
      </Item>
      <Item>
        <NavLink to="/dialogs">Messages</NavLink>
      </Item>
      <Item>
        <NavLink to="/users">Users</NavLink>
      </Item>
      <Item>
        <NavLink to="/news">News</NavLink>
      </Item>
      <Item>
        <NavLink to="/music">Music</NavLink>
      </Item>
      <Item>
        <NavLink to="/settings">Settings</NavLink>
      </Item>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  grid-area: nav;
  background-color: burlywood;
  padding: 20px;
`;

const Item = styled.div`
  & > a.active {
    color: gold;
  }
  & > a {
    color: white;
  }
`;
