import React from "react";
import Menubar from "../components/Menubar";
import { Flex } from "antd";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Menubar />
      <div style={{ marginTop: "20px" }}>
        <Flex justify="center">
          <Outlet />
        </Flex>
      </div>
    </>
  );
};

export default Home;
