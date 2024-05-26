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
  Typography,
} from "antd";

const ViewReceiveItem = () => {
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [strDate, setStrDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(tbllist);
  const tblData = tbllist?.filter((item) =>
    item?.code.toLowerCase().includes(search.toLowerCase())
  );
  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values.StartDate.$d);
    setStrDate(values.StartDate.$d);
    setEndDate(values.EndDate.$d);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
  ];
  // table data collection
  useEffect(() => {
    async function getRMIssueData() {
      try {
        if (!strDate || !endDate) {
          console.log("Date Required");
        } else {
          const rmReceive = await axios.post(
            "https://wms-ftl.onrender.com/v1/api/tnx/receiveview",
            {
              stDate: moment(strDate).format(),
              edDate: moment(endDate).format(),
            }
          );
          console.log(rmReceive.data);
          const tableData = [];
          rmReceive?.data.map((order, i) => {
            order?.receList?.map((item, j) => {
              tableData.push({
                dataIndex: order._id,
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
          autoComplete="off"
        >
          <Form.Item
            label="Start"
            name="StartDate"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
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
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
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
            dataSource={tblData}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default ViewReceiveItem;
