import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Table, message, Popconfirm, Modal, Radio, Typography } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ViewLot = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  const tblData = tbllist?.filter((item) =>
    item?.lot?.toLowerCase().includes(search?.toLowerCase())
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editID, setEditID] = useState("");
  const [editField, setEditField] = useState("");
  const [editData, setEditData] = useState("");

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const userEdit = await axios.put(
        "http://localhost:8000/v1/api/item/editlot",
        {
          id: editID,
          filed: editField,
          data: editData,
        }
      );
      message.success(userEdit.data.message);
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
      const lotDelete = await axios.put(
        "http://localhost:8000/v1/api/item/dltlot",
        {
          id: item,
        }
      );
      message.warning(lotDelete.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Lot Info",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item) =>
        user.role === "admin" && (
          <>
            <Button
              icon={<EditTwoTone />}
              onClick={() => handleEdit(item)}
            ></Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this Item?"
              onConfirm={() => handleDelete(item)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ marginLeft: "10px" }}
                danger
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
              ></Button>
            </Popconfirm>
          </>
        ),
    },
  ];

  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        "http://localhost:8000/v1/api/item/viewLot"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          sl: ++i,
          model: item.model,
          lot: item.lot,
          action: item._id,
        });
        setTbllist(tableData);
      });
    }
    getData();
  }, [handleEdit, handleDelete]);

  return (
    <>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            View Lot Details
          </Typography.Title>
          <div>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find by Code"
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
              onCancel={handleCancel}
            >
              <div>
                <Radio.Group onChange={(e) => setEditField(e.target.value)}>
                  <Radio value="model">Model</Radio>
                  <Radio value="lot">Lot Info</Radio>
                </Radio.Group>
                <Input onChange={(e) => setEditData(e.target.value)} />
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <p>lm</p>
      )}
    </>
  );
};

export default ViewLot;
