import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Button, Form, DatePicker, Divider, Input, Table } from "antd";

const RMTnxView = () => {
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [strDate, setStrDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tblData = tbllist.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
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
  ];
  // table data collection
  useEffect(() => {
    async function getRMIssueData() {
      try {
        if (!strDate || !endDate) {
          console.log("Date Required");
        } else {
          const rmIssueDone = await axios.post(
            "http://localhost:8000/v1/api/tnx/rmtnxview/",
            {
              stDate: moment(strDate).format(),
              edDate: moment(endDate).format(),
            }
          );
          console.log(rmIssueDone.data);
          const tableData = [];
          rmIssueDone?.data.map((order, i) => {
            order?.issueList?.map((item, j) => {
              item.status === "done" &&
                tableData.push({
                  dataIndex: order._id,
                  date: moment(order.date).format("DD-MMM-YY"),
                  station: order.station,
                  tnxID: order.tnxID,
                  lot: order.lot,
                  code: item.code,
                  loc: item.loc,
                  qty: item.qty,
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
  }, [strDate, endDate]);

  return (
    <>
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
            dataSource={tblData}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default RMTnxView;
