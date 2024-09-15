import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  LogoutOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../Slice/UserSlice";

const Menubar = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    // console.log("click ", e);
    if (e.key === "logout") {
      message.warning("logout");
      localStorage.removeItem("user");
      dispatch(Loginuser(null));
      navigate("/");
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
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
          type: "station",
          label: "Station Master",
          key: "station",
          children: [
            {
              label: "Add Station",
              key: "addstation",
            },
            {
              label: "Station Details",
              key: "stationdtls",
            },
          ],
        },
        {
          type: "location",
          label: "Location Master",
          key: "location",
          children: [
            {
              label: "Add Location",
              key: "addlocation",
            },
            {
              label: "Location Details",
              key: "locdetails",
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
              label: "Add BOM Item",
              key: "addbomitem",
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
            {
              label: "Item Wise Receive Details",
              key: "itemrevdtls",
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
              label: "Part Wise Transaction",
              key: "partTnx",
            },
            {
              label: "Lot Wise Stock",
              key: "lotstock",
            },
            {
              label: "On-Hand Stock",
              key: "onhandstock",
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
        {
          type: "Task",
          label: "Task",
          key: "alltaskadmin",
        },
      ],
    },
    {
      label: "Password Changed",
      key: "passcng",
      icon: <RetweetOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
    },
    // {
    //   label: (
    //     <a href="#" target="_blank" rel="noopener noreferrer">
    //       Navigation Four - Link
    //     </a>
    //   ),
    //   key: "alipay",
    // },
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
          type: "station",
          label: "Station Master",
          key: "station",
          children: [
            {
              label: "Add Station",
              key: "addstation",
            },
            {
              label: "Station Details",
              key: "stationdtls",
            },
          ],
        },
        {
          type: "location",
          label: "Location Master",
          key: "location",
          children: [
            {
              label: "Add Location",
              key: "addlocation",
            },
            {
              label: "Location Details",
              key: "locdetails",
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
              label: "Add BOM Item",
              key: "addbomitem",
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
            {
              label: "Item Wise Receive Details",
              key: "itemrevdtls",
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
              label: "Part Wise Transaction",
              key: "partTnx",
            },
            {
              label: "Lot Wise Stock",
              key: "lotstock",
            },
            {
              label: "On-Hand Stock",
              key: "onhandstock",
            },
          ],
        },
      ],
    },
    {
      label: "Password Changed",
      key: "passcng",
      icon: <RetweetOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
    },
    // {
    //   label: (
    //     <a href="#" target="_blank" rel="noopener noreferrer">
    //       Navigation Four - Link
    //     </a>
    //   ),
    //   key: "alipay",
    // },
  ];
  const checker = [
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
      label: "Password Changed",
      key: "passcng",
      icon: <RetweetOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];
  const regular = [
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
      ],
    },
    {
      label: "Password Changed",
      key: "passcng",
      icon: <RetweetOutlined />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
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
          (user.role === "LM" && LMitems) ||
          (user.role === "checker" && checker) ||
          (user.role === "user" && regular)
        }
      />
    </>
  );
};

export default Menubar;
