import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const withAuthRedirect = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const RedirectComponent = (Component) => {
    if (!isAuth) return <Navigate to={"/login"} />;
    return <Component {...props} />;
  };

  return RedirectComponent;
};
