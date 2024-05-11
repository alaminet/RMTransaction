import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Table, message, Popconfirm, Modal, Radio } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
const ViewItemList = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  const tblData = tbllist?.filter((item) =>
    item?.code?.toLowerCase().includes(search?.toLowerCase())
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
        "http://localhost:8000/v1/api/item/edititem",
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
      const userDelete = await axios.put(
        "http://localhost:8000/v1/api/item/dltitem",
        {
          id: item,
        }
      );
      message.warning("Deleted");
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
      title: "Part Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Part Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
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
              onClick={() => handleEdit(item)}></Button>
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
        "http://localhost:8000/v1/api/item/viewitemlist"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          sl: ++i,
          code: item.code,
          name: item.itemname,
          uom: item.uom,
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
              onCancel={handleCancel}>
              <div>
                <Radio.Group onChange={(e) => setEditField(e.target.value)}>
                  <Radio value="code">Part Code</Radio>
                  <Radio value="itemname">Part Name</Radio>
                  <Radio value="uom">UOM</Radio>
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

export default ViewItemList;
