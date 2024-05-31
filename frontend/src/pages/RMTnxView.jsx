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
} from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";

const RMTnxView = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    let strDate = values.StartDate.$d;
    let endDate = new Date(values.EndDate.$d).setHours(23, 59, 59);
    let tnxType = values.type;
    try {
      if (!strDate || !endDate) {
        message.error("Date Required");
        setLoading(false);
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
                sl: ++i,
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
            setLoading(false);
          });
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // action controller
  const handleDelete = async (item) => {
    try {
      const itemDelete = await axios.post(
        "https://wms-ftl.onrender.com/v1/api/tnx/dltissueline",
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
      render: (item) =>
        user.role === "admin" && (
          <>
            {/* <Button
              icon={<EditTwoTone />}
              onClick={() => handleEdit(item)}></Button> */}
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
              dataSource={tbllist.filter((item) =>
                item.code.toLowerCase().includes(search.toLowerCase())
              )}
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
