import "./App.css";
import { Layout } from "./components/layout/Layout";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import React, { Suspense } from "react";
const Profile = React.lazy(() => import("./components/profile/Profile"));
const Dialogs = React.lazy(() => import("./components/dialogs/Dialogs"));
import Users from "./components/users/Users";
import Authorize from "./components/auth/Authorize";
import Music from "./components/music/Music";
import Settings from "./components/profile/Settings";
import News from "./components/news/News";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeApp } from "./features/app/appSlice";
import { Preloader } from "./components/common/Preloader";

function App(props) {
  const initialized = useSelector((state) => state.app.initialized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!initialized) return <Preloader />; 

  return (
    <div className="app-wrapper">
      <Header />
      <Navbar color="red" />
      <WrapperContent>
        <Suspense
          fallback={
            <div>
              <Preloader />
            </div>
          }
        >
          <Routes>
            <Route path="/dialogs/*" element={<Dialogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/auth" element={<Authorize />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </WrapperContent>
    </div>
  );
}

export default App;

const WrapperContent = styled.div`
  grid-area: content;
  background-color: cornflowerblue;
`;
