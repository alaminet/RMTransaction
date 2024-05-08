import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, DiffOutlined } from "@ant-design/icons";

const Menubar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };

  // Menu List
  const items = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Transaction",
      key: "SubMenu1",
      icon: <DiffOutlined />,
      children: [
        {
          type: "Report",
          label: "Report",
          children: [
            {
              label: "Daily Transaction",
              key: "dailyTnx",
            },
            {
              label: "Lot Wise Stock",
              key: "lotstock",
            },
            {
              label: "Model Wise Stock",
              key: "modelstock",
            },
          ],
        },
        {
          type: "Issue",
          label: "Issue",
          children: [
            {
              label: "RAW Material",
              key: "rmissue",
            },
            {
              label: "Buffer",
              key: "bufferissue",
            },
          ],
        },
        {
          type: "Receive",
          label: "Receive",
          children: [
            {
              label: "RAW Material",
              key: "rmreceive",
            },
            {
              label: "Buffer",
              key: "bufferreceive",
            },
          ],
        },
        {
          type: "Checklist",
          label: "Checklist",
          children: [
            {
              label: "RAW Material",
              key: "rmcheck",
            },
            {
              label: "Buffer",
              key: "buffercheck",
            },
          ],
        },
      ],
    },
    {
      label: "Admin",
      key: "SubMenu2",
      icon: <DiffOutlined />,
      children: [
        {
          type: "User",
          label: "User",
          children: [
            {
              label: "Add User",
              key: "adduser",
            },
            {
              label: "User List",
              key: "userlist",
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="#" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: "alipay",
    },
  ];
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Menubar;
