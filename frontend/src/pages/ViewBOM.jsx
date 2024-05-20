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
  Form,
  Select,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ViewBOM = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [loadings, setLoadings] = useState(false);
  const [selectLot, setSelectLot] = useState();
  const [lotList, setLotList] = useState();
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  // table filter
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const tblData = tbllist?.filter((item) =>
    item?.code?.toLowerCase().includes(search?.toLowerCase())
  );
  // lot selection
  const onFinish = async (values) => {
    // console.log("Success:", values);

    setSelectLot(values.lot);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
      title: "Lot Info",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Part Code",
      dataIndex: "code",
      key: "lot",
    },
    {
      title: "Part Name",
      dataIndex: "name",
      key: "lot",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "BOM Qty",
      dataIndex: "qty",
      key: "qty",
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
    async function getLot() {
      const data = await axios.get("http://localhost:8000/v1/api/item/viewLot");
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ value: item._id, label: item.lot });
        setLotList(tableData);
      });
    }
    getLot();
  }, []);

  useEffect(() => {
    async function getBOM() {
      try {
        const data = await axios.post(
          "http://localhost:8000/v1/api/item/viewbom",
          {
            lot: selectLot,
          }
        );
        const tableDataArr = [];
        data?.data[0].itemlist?.map((item, i) => {
          tableDataArr.push({
            sl: ++i,
            lot: data?.data[0].lotID.lot,
            code: item?.codeID.code,
            name: item?.codeID.itemname,
            uom: item?.codeID.uom,
            qty: item?.qty,
            action: item.codeID._id,
          });
          setTbllist(tableDataArr);
        });
      } catch (error) {
        console.log(error);

        setTbllist(null);
      }
    }
    getBOM();
    setLoadings(false);
  }, [onFinish]);
  return (
    <>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          <div>
            <Form
              // form={addbomform}
              name="addbom"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                minWidth: 700,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                label="Lot Info"
                name="lot"
                rules={[
                  {
                    required: true,
                    message: "Please Select Lot",
                  },
                ]}>
                <Select
                  showSearch
                  placeholder="Select A Lot"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={filterOption}
                  options={lotList}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                <Button
                  loading={loadings}
                  disabled={loadings}
                  type="primary"
                  htmlType="submit">
                  View BOM Details
                </Button>
              </Form.Item>
            </Form>
          </div>
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
              pagination={false}
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
                  <Radio value="model">Model</Radio>
                  <Radio value="lot">Lot Info</Radio>
                </Radio.Group>
                <Input onChange={(e) => setEditData(e.target.value)} />
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default ViewBOM;
