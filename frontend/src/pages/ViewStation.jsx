import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Table, message, Popconfirm, Modal, Radio } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ViewStation = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  const tblData = tbllist?.filter((item) =>
    item?.station?.toLowerCase().includes(search?.toLowerCase())
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editID, setEditID] = useState("");
  const [editData, setEditData] = useState("");

  const handleOk = async (e) => {
    setIsModalOpen(false);
    try {
      const stationEdit = await axios.put(
        "http://localhost:8000/v1/api/item/editstation",
        {
          id: editID.action,
          data: editData,
        }
      );
      message.success(stationEdit.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // modal

  const handleEdit = (item, record) => {
    setIsModalOpen(true);
    setEditID(record);
  };

  const handleDelete = async (item) => {
    try {
      const lotDelete = await axios.put(
        "http://localhost:8000/v1/api/item/deletestation",
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
      title: "Station",
      dataIndex: "station",
      key: "station",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item, record) =>
        user.role === "admin" && (
          <>
            <Button
              icon={<EditTwoTone />}
              onClick={() => handleEdit(item, record)}></Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this Item?"
              onConfirm={() => handleDelete(item)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No">
              <Button
                style={{ marginLeft: "10px" }}
                danger
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
            </Popconfirm>
          </>
        ),
    },
  ];

  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        "http://localhost:8000/v1/api/item/viewstation"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          sl: ++i,
          station: item.station,
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
          <div>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find by Station"
              variant="filled"
            />
            <Table
              style={{ width: "100%" }}
              dataSource={tblData}
              columns={columns}
              // rowKey={(record) => console.log(record)}
            />
          </div>
          <div>
            <Modal
              title="Edit Station Name"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}>
              <div>
                <Input
                  placeholder={editID?.station}
                  onChange={(e) => setEditData(e.target.value)}
                />
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <p>You are not autorize to view, Please contact with admin</p>
      )}
    </>
  );
};

export default ViewStation;