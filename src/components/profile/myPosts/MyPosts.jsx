import React, { useRef } from "react";
import styled from "styled-components";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../../../features/profile/profileSlice";
import { useForm } from "react-hook-form";
import { SpanError } from "../../login/Login";

const MyPosts = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.profilePage);
  const posts = state.posts;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const checkKeyDown = (e) => {
    // if (e.key === "Enter") onSubmit();
  };

  const onAddPost = (data) => {
    dispatch(addPost(data.addPost));
    reset();
  };

  return (
    <PostsBlock>
      my posts
      <div>
        <form onSubmit={handleSubmit(onAddPost)}>
          <textarea
            {...register("addPost", { required: "This filed is required" })}
            placeholder="Enter your post"
            onKeyDown={(e) => checkKeyDown(e)}
          ></textarea>
          {errors.addPost && <SpanError>{errors.addPost.message}</SpanError>}
          <div>
            <button type="submit" disabled={!isValid}>
              Add post
            </button>
          </div>
        </form>
      </div>
      <Posts>
        {posts.map((m) => (
          <Post
            key={m.id}
            id={m.id}
            message={m.message}
            likesCount={m.likesCount}
          />
        ))}

        <Post />
      </Posts>
    </PostsBlock>
  );
};

export default MyPosts;

const PostsBlock = styled.div`
  padding: 10px;
`;

const Posts = styled.div`
  margin-top: 10px;
`;
