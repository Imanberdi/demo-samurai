import React from "react";
import styled from "styled-components";

const Post = (props) => {
  return (
    <div>
      <Item>
        <img
          src="https://storage.ws.pho.to/s2/9bfeebd64763112e93cbe439e88c3715f0e54104_m.jpg"
          alt=""
        />
        {props.message}
        <div><span>like</span>{props.likesCount} </div>
      </Item>
    </div>
  );
};

export default Post;

const Item = styled.div`
  &:last-child {
    color: #000;
  }
  & > img {
    width: 30px;
    border-radius: 30px;
  }
`;
