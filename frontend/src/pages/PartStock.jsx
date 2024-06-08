import React, { useState } from "react";
import axios from "axios";
import { Button, Divider, Form, Input, Table, message } from "antd";
import { useSelector } from "react-redux";

const PartStock = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [findpartdlts] = Form.useForm();
  const [loadings, setLoadings] = useState(false);
  const [tbllist, setTbllist] = useState([]);

  // form controll
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoadings(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/v1/api/tnx/partstock",
        {
          code: values.code.toUpperCase().trim(),
        }
      );
      //   console.log(data);
      const recArr = [];
      let y = 1;
      data?.data.receive.map((receive, i) => {
        receive.receList.map((reclist, j) => {
          if (
            reclist.codeID == data.data.itemMatch._id &&
            reclist.issue <= reclist.qty
          ) {
            recArr.push({
              sl: y++,
              code: data.data.itemMatch.code,
              name: data.data.itemMatch.itemname,
              loc: reclist.locID.loc,
              lot: receive.lotID.lot,
              recqty: reclist.qty,
              issqty: reclist.issue,
              onhand: reclist.qty - reclist.issue,
            });
          }
          setTbllist(recArr);
        });
      });
      setLoadings(false);
      console.log(tbllist);
    } catch (error) {
      setLoadings(false);
      message.error(error.response.data.message);
    }

    // findpartdlts.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadings(false);
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
      title: "Model_Lot",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Location",
      dataIndex: "loc",
      key: "loc",
    },
    {
      title: "Receive Qty",
      dataIndex: "recqty",
      key: "recqty",
    },
    {
      title: "Issue Qty",
      dataIndex: "issqty",
      key: "issqty",
    },
    {
      title: "On-Hand Qty",
      dataIndex: "onhand",
      key: "onhand",
    },
  ];
  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            form={findpartdlts}
            name="partdlts"
            layout="inline"
            style={{
              minWidth: 400,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Part Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please insert Part Code",
                },
              ]}>
              <Input placeholder="Find by Code" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loadings}
                disabled={loadings}
                type="primary"
                htmlType="submit">
                Find
              </Button>
            </Form.Item>
          </Form>
        </div>
        {tbllist.length > 0 && (
          <>
            <Divider>On-Hand Details Table</Divider>
            <div>
              <Table
                style={{ width: "100%" }}
                dataSource={tbllist}
                columns={columns}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PartStock;
