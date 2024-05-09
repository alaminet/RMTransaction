import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, DiffOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Menubar = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };

  // Menu List
  const Adminitems = [
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
          type: "stock",
          label: "Stock",
          children: [
            {
              label: "Part Wise",
              key: "partstock",
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
      label: "Line Manager",
      key: "SubMenu2",
      icon: <DiffOutlined />,
      children: [
        {
          type: "item",
          label: "Item Master",
          key: "item",
          children: [
            {
              label: "Add Item",
              key: "additem",
            },
            {
              label: "Item List",
              key: "itemlist",
            },
          ],
        },
        {
          type: "lot",
          label: "Lot Master",
          key: "lot",
          children: [
            {
              label: "Add Lot",
              key: "addlot",
            },
            {
              label: "Lot Details",
              key: "lotdetails",
            },
          ],
        },
        {
          type: "bom",
          label: "BOM Master",
          key: "bom",
          children: [
            {
              label: "Add BOM",
              key: "addbom",
            },
            {
              label: "BOM Details",
              key: "bomdetails",
            },
          ],
        },
        {
          type: "receive",
          label: "Receive",
          key: "receive",
          children: [
            {
              label: "New Receive",
              key: "newreceive",
            },
            {
              label: "Receive Details",
              key: "receivedetails",
            },
          ],
        },
        {
          type: "movement",
          label: "Movement Master",
          key: "movement",
          children: [
            {
              label: "Location Transfer",
              key: "loctransfer",
            },
            {
              label: "Stock Transfer",
              key: "stocktransfer",
            },
          ],
        },
        {
          type: "report",
          label: "Report",
          key: "report",
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
      ],
    },
    {
      label: "Admin",
      key: "SubMenu3",
      icon: <DiffOutlined />,
      children: [
        {
          type: "User",
          label: "User",
          key: "user",
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

  const LMitems = [
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
        items={
          (user.role === "admin" && Adminitems) ||
          (user.role === "LM" && LMitems)
        }
      />
    </>
  );
};

export default Menubar;
