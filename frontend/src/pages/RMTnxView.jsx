import React, { useEffect, useState } from "react";
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
  Popconfirm,
  Modal,
  Radio,
  message,
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const RMTnxView = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [strDate, setStrDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tnxType, setTnxType] = useState("");

  const tblData = tbllist.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );
  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    setStrDate(values.StartDate.$d);
    setEndDate(values.EndDate.$d);
    setTnxType(values.type);
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // action controller
  const handleDelete = async (item) => {
    try {
      const itemDlt = await axios.post(
        "https://wms-ftl.onrender.com/v1/api/tnx/dltissueline",
        {
          id: item.action,
        }
      );
      message.warning(itemDlt.data.message);
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
      title: "location",
      dataIndex: "loc",
      key: "loc",
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) =>
        item.status !== "done" && (
          <>
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
  // table data collection
  useEffect(() => {
    async function getRMIssueData() {
      try {
        if (!strDate || !endDate) {
          console.log("Date Required");
        } else {
          const rmIssueDone = await axios.post(
            "https://wms-ftl.onrender.com/v1/api/tnx/rmtnxview/",
            {
              stDate: moment(strDate).format(),
              edDate: moment(endDate).format(),
            }
          );

          const tableData = [];
          rmIssueDone?.data.map((order, i) => {
            order?.issueList?.map((item, j) => {
              item.status === tnxType &&
                tableData.push({
                  dataIndex: order._id,
                  date: moment(order.date).format("DD-MMM-YY"),
                  station: order.stationID.station,
                  tnxID: order.tnxID,
                  lot: order.lotID.lot,
                  code: item.codeID.code,
                  name: item.codeID.itemname,
                  qty: item.qty,
                  status: item.status,
                  rmk: item.rmk,
                  action: item._id,
                });
              setTbllist(tableData);
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getRMIssueData();
  }, [strDate, endDate, tnxType, handleDelete]);

  return (
    <>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
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
                // onChange={onChange}
                // onSearch={onSearch}
                // filterOption={filterOption}
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
              dataSource={tbllist}
              columns={columns}
            />
          </div>
        </div>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default RMTnxView;
