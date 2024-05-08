import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Login from "../pages/Login";

const LoginUserRouter = () => {
  const user = useSelector((user) => user.loginSlice.login);
  return user ? <Outlet /> : <Login />;
};

export default LoginUserRouter;
