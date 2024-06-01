import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Button,
  Form,
  DatePicker,
  Divider,
  Input,
  Table,
  Flex,
  Tooltip,
  Modal,
  Space,
  InputNumber,
  message,
  Typography,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const ViewReceiveItem = () => {
  const [editForm] = Form.useForm();
  const [tbllist, setTbllist] = useState([]);
  const [editItem, setEditItem] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [strDate, setStrDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const tblData = tbllist?.filter((item) =>
  //   item?.code.toLowerCase().includes(search.toLowerCase())
  // );

  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values.StartDate.$d);
    setLoading(true);
    setStrDate(values.StartDate.$d);
    setEndDate(new Date(values.EndDate.$d).setHours(23, 59, 59));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  // edit table data
  const handleEdit = (values) => {
    // console.log(values.action);
    setIsModalOpen(true);
    setEditItem(values.action);
    editForm.setFieldsValue({
      id: values.action._id,
      code: values.action.codeID.code,
      loc: values.action.locID.loc,
      issue: values.action.issue,
      qty: values.action.qty,
    });
  };
  const onFinishEdit = async (values) => {
    // console.log(editItem);
    // console.log(values);
    setIsModalOpen(false);
    if (editItem.locID.loc !== values.loc && editItem.issue !== values.issue) {
      message.warning("Single Edit can be done");
    } else {
      if (editItem.locID.loc !== values.loc) {
        try {
          const update = await axios.post(
            "http://localhost:8000/v1/api/tnx/receiveupdate",
            {
              id: values.id,
              field: "locID",
              value: values.loc,
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
          console.log(error.response.data.message);
        }
      }
      if (editItem.issue !== values.issue) {
        try {
          const update = await axios.post(
            "http://localhost:8000/v1/api/tnx/receiveupdate",
            {
              id: values.id,
              field: "issue",
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
          console.log(error.response.data.message);
        }
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      rowScope: "sl",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    // {
    //   title: "Tnx ID",
    //   dataIndex: "tnxID",
    //   key: "tnxid",
    // },
    {
      title: "Lot No",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Order No",
      dataIndex: "order",
      key: "order",
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
      title: "location",
      dataIndex: "loc",
      key: "loc",
    },
    {
      title: "Receive Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Issue Qty",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <Flex gap={4}>
            <Tooltip title="Edit">
              <Button
                onClick={() => handleEdit(record)}
                icon={<EditTwoTone />}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                // onClick={() => handleDelete(record)}
                icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
              />
            </Tooltip>
          </Flex>
        </>
      ),
    },
  ];
  // table data collection
  useEffect(() => {
    async function getRMIssueData() {
      try {
        if (!strDate || !endDate) {
          message.warning("Date Required");
          setLoading(false);
        } else {
          const rmReceive = await axios.post(
            "https://wms-ftl.onrender.com/v1/api/tnx/receiveview",
            {
              stDate: moment(strDate).format(),
              edDate: moment(endDate).format(),
            }
          );
          // console.log(rmReceive.data);
          const tableData = [];
          rmReceive?.data.map((order, i) => {
            order?.receList?.map((item, j) => {
              tableData.push({
                dataIndex: order._id,
                sl: ++i,
                date: moment(order.date).format("DD-MMM-YY"),
                LC: order.LC,
                inv: order.inv,
                BE: order.BE,
                PO: order.PO,
                lot: order.lotID.lot,
                rmk: order.rmk,
                order: order.order,
                tnxID: order.tnxID,
                code: item.codeID.code,
                name: item.codeID.itemname,
                loc: item.locID.loc,
                qty: item.qty,
                issue: item.issue,
                action: item,
              });
              setTbllist(tableData);
              setLoading(false);
            });
          });
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getRMIssueData();
  }, [strDate, endDate]);

  return (
    <>
      <div>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          View Receive Details
        </Typography.Title>
        <Form
          layout="inline"
          name="rmReceiveView"
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}>
              Find
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
            style={{ width: "100%" }}
            // rowKey={(record) => console.log(record)}
            dataSource={tbllist?.filter((item) =>
              item?.code.toLowerCase().includes(search.toLowerCase())
            )}
            columns={columns}
          />
        </div>
        <div>
          <Modal
            title="Edit Category"
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
                name="code"
                label="Item Code"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input disabled placeholder="Item Code" />
              </Form.Item>
              <Form.Item
                name="loc"
                label="Location"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input placeholder="Location" />
              </Form.Item>
              <Form.Item
                name="qty"
                label="Rec. Qty"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <InputNumber disabled placeholder="Receive Qty" />
              </Form.Item>
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
        </div>
      </div>
    </>
  );
};

export default ViewReceiveItem;
