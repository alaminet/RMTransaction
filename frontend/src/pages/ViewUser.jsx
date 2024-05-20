import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Table,
  message,
  Popconfirm,
  Modal,
  Radio,
  Flex,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
const ViewUser = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  const tblData = tbllist.filter((item) =>
    item.userID.toLowerCase().includes(search.toLowerCase())
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editID, setEditID] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleOk = async () => {
    setIsModalOpen(false);
    // console.log(editID, newRole);
    try {
      const userEdit = await axios.put(
        "http://localhost:8000/v1/api/auth/edituser",
        {
          userID: editID,
          role: newRole,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // modal

  const handleEdit = (item) => {
    setIsModalOpen(true);
    setEditID(item);
  };

  const handleDelete = async (item) => {
    try {
      const userDelete = await axios.put(
        "http://localhost:8000/v1/api/auth/dltuser",
        {
          userID: item,
        }
      );
      message.success("Deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleReset = async (e) => {
    try {
      const passReset = await axios.post(
        "http://localhost:8000/v1/api/auth/resetpass",
        {
          userID: e,
        }
      );
      message.success(`${passReset.data.userID} 's Password Reset`);
    } catch (error) {
      console.log(error);
    }
  };

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item) => (
        <>
          <Flex gap={16}>
            <Button type="primary" onClick={() => handleReset(item)}>
              Reset Pass
            </Button>
            <Button
              icon={<EditTwoTone />}
              onClick={() => handleEdit(item)}></Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(item)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <Button
                style={{ marginLeft: "10px" }}
                danger
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
            </Popconfirm>
          </Flex>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function getData() {
      const issueData = await axios.get(
        "http://localhost:8000/v1/api/auth/viewuser"
      );
      const tableData = [];
      issueData?.data?.map((item, i) => {
        tableData.push({
          sl: ++i,
          dataIndex: item._id,
          userID: item.userID,
          role: item.role,
          action: item._id,
        });

        setTbllist(tableData);
      });
    }

    getData();
  }, [handleEdit, handleDelete]);

  return (
    <>
      {user.role === "admin" && (
        <div>
          <div>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find by ID"
              variant="filled"
            />
            <Table
              style={{ width: "100%" }}
              dataSource={tblData}
              columns={columns}
            />
          </div>
          <div>
            <Modal
              title="Edit User Role"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <div>
                <Radio.Group onChange={(e) => setNewRole(e.target.value)}>
                  <Radio value="user">User</Radio>
                  <Radio value="LM">Line Manager</Radio>
                  <Radio value="checker">Checker</Radio>
                  <Radio value="admin">Admin</Radio>
                </Radio.Group>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
