import Home from "@/pages/Page_Home";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import "@fontsource/raleway";
import React, { useEffect } from "react";
import { SET_AUTH_ERROR, SET_LOGIN } from "./store/slice/auth";
import { getProfile } from "./libs/api/call/profile";
import Search from "./pages/Page_Search";
import ForgotPassword from "./pages/Page_ForgotPassword";
import ResetPassword from "./pages/Page_ResetPassword";
import Page_Register from "./pages/Page_Register";
import Page_ThreadDetail from "./pages/Page_ThreadDetail";
import Page_Follow from "./pages/Page_Follow";
import Page_ProfileDetail from "./pages/Page_ProfileDetail";
import Page_MyProfile from "./pages/Page_MyProfile";
import { useDispatch } from "react-redux";
import Page_ThreadImageDetail from "./pages/Page_ThreadImageDetail";
import Page_Login from "./pages/Page_Login";
import Page_ImageDetail from "./pages/Page_ImageDetail";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await getProfile();
      dispatch(SET_LOGIN({ user: response.data.data, token }));
    } catch (error) {
      dispatch(SET_AUTH_ERROR());
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const IsLogin = () => {
    if (!localStorage.token) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  };

  const IsNotLogin = () => {
    if (localStorage.token) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<IsLogin />}>
        <Route path="/" element={<Layout isFull={true} />}>
          <Route index element={<Home />} />
          <Route path="detail/:threadId" element={<Page_ThreadDetail />} />
          <Route path="profile/:userId" element={<Page_ProfileDetail />} />
          <Route path="search" element={<Search />} />
          <Route path="follow" element={<Page_Follow />} />
        </Route>
        <Route path="/" element={<Layout isFull={false} />}>
          <Route path="my-profile" element={<Page_MyProfile />} />
        </Route>
        <Route path="image/:threadId" element={<Page_ThreadImageDetail />} />
        <Route path="detail/image/:threadId" element={<Page_ImageDetail />} />
      </Route>
      <Route path="/" element={<IsNotLogin />}>
        <Route path="login" element={<Page_Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="register" element={<Page_Register />} />
      </Route>
    </Routes>
  );
};

export default App;
