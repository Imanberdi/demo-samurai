import MyPosts from "./myPosts/MyPosts";
import ProfilInfo from "./ProfileInfo/ProfilInfo";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../features/profile/profileSlice";

const Profile = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const authUserId = useSelector((state) => state.auth.id);
  console.log(authUserId);
  const dispatch = useDispatch();
  let { userId } = useParams();
  if (!userId) {
    userId = authUserId;
  }
  if (userId) {
    useEffect(() => {
      dispatch(getUserProfile(userId));
    }, [userId]);
  }

  if (!isAuth) return <Navigate to={"/login"} replace />;
  return (
    <div>
      <ProfilInfo userId={userId} />
      <MyPosts />
    </div>
  );
};

export default Profile;
