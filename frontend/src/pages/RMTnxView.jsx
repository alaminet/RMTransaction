import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Button,
  Form,
  DatePicker,
  Divider,
  Input,
  Table,
  Select,
  message,
  Popconfirm,
  Modal,
  Space,
  InputNumber,
  Typography,
} from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const RMTnxView = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    let strDate = values?.StartDate.$d;
    let endDate = new Date(values?.EndDate.$d).setHours(23, 59, 59);
    let tnxType = values?.type;
    try {
      if (!strDate || !endDate) {
        message.error("Date Required");
        setLoading(false);
      } else {
        const rmIssueDone = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/rmtnxview/`,
          {
            stDate: moment(strDate).format(),
            edDate: moment(endDate).format(),
          }
        );
        rmIssueDone.data.length == 0 && message.warning("No Data Found");
        const tableData = [];
        let y = 1;
        rmIssueDone?.data.map((order, i) => {
          order?.issueList?.map((item, j) => {
            item?.status === tnxType &&
              tableData.push({
                dataIndex: order?._id,
                sl: y++,
                date: moment(order?.date).format("DD-MMM-YY"),
                station: order?.stationID?.station,
                tnxID: order?.tnxID,
                tnxby: order?.tnxby?.userID,
                lot: order?.lotID?.lot,
                code: item?.codeID?.code,
                name: item?.codeID?.itemname,
                qty: item?.qty,
                status: item?.status,
                rmk: item?.rmk,
                lastUpdateBy: item?.updateBy?.userID,
                lastupdated:
                  item?.updateTime &&
                  moment(item?.updateTime).format("DD-MMM-YY hh:mmA"),
                action: item?._id,
              });
            setTbllist(tableData);
          });
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  // action controller
  // edit table data
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values.action,
      issue: values.qty,
    });
  };
  const onFinishEdit = async (values) => {
    // console.log(editItem);
    // console.log(values);
    setIsModalOpen(false);
    if (editItem.qty !== values.issue) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/rmissueqtyupdate`,
          {
            id: values.id,
            value: values.issue,
          },
          {
            headers: {
              Authorization: "CAt7p0qqwYALAIY",
            },
          }
        );
        message.success(update.data.message);
      } catch (error) {
        message.error(error.response.data.message);
      }
    } else {
      message.info("Tnx Qty Not Changed");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // delete tnx line item
  const handleDelete = async (item) => {
    try {
      const itemDelete = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tnx/dltissueline`,
        {
          id: item,
        }
      );
      setTbllist(tbllist.filter((a) => a.action !== item));
      message.warning(itemDelete.data.message);
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tnx ID",
      dataIndex: "tnxID",
      key: "tnxid",
    },
    {
      title: "Tnx by",
      dataIndex: "tnxby",
      key: "tnxby",
    },
    {
      title: "Station",
      dataIndex: "station",
      key: "station",
    },
    {
      title: "Model",
      dataIndex: "lot",
      key: "lot",
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
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Remarks",
      dataIndex: "rmk",
      key: "rmk",
    },
    {
      title: "Update By",
      dataIndex: "lastUpdateBy",
      key: "lastUpdateBy",
    },
    {
      title: "Update Time",
      dataIndex: "lastupdated",
      key: "lastupdated",
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
              onClick={() => handleEdit(record)}></Button>
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(item)}
              danger
              icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
          </>
        ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Daily Transaction</title>
      </Helmet>
      {user.role === "admin" || user.role === "LM" ? (
        <>
          <div>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              Date Wise Issue Details
            </Typography.Title>
            <Form
              layout="inline"
              name="rmtnxview"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                label="Start"
                name="StartDate"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="End"
                name="EndDate"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Tnx Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please Select Tnx Type!",
                  },
                ]}>
                <Select
                  style={{ width: "100px" }}
                  placeholder="Tnx Type"
                  optionFilterProp="children"
                  options={[
                    { label: "Done", value: "done" },
                    { label: "Reject", value: "reject" },
                    { label: "Waiting", value: "waiting" },
                  ]}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}>
                  Find
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={() => setShowList(!showList)}>
                  Show All
                </Button>
              </Form.Item>
            </Form>
            <Divider>Transaction Details Table</Divider>
            <div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by Code"
                variant="filled"
              />
              <Table
                pagination={showList}
                style={{ width: "100%" }}
                dataSource={tbllist.filter((item) =>
                  item.code.toLowerCase().includes(search.toLowerCase())
                )}
                columns={columns}
              />
            </div>
          </div>
          <div>
            <Modal
              title="Edit Tnx Qty"
              open={isModalOpen}
              onCancel={handleCancel}
              footer="">
              <Form
                form={editForm}
                // layout="vertical"
                onFinish={onFinishEdit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item hidden name="id"></Form.Item>
                <Form.Item
                  name="issue"
                  label="Issue Qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <InputNumber placeholder="Issue Qty" />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </div>{" "}
        </>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default RMTnxView;
