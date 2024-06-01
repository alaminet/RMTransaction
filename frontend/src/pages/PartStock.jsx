import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Typography, message } from "antd";
import { useSelector } from "react-redux";

const PartStock = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [findpartdlts] = Form.useForm();
  const [loadings, setLoadings] = useState(false);

  // form controll
  const onFinish = async (values) => {
    console.log("Success:", values);
    // setLoadings(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/v1/api/tnx/partstock",
        {
          code: values.code.trim(),
        }
      );
      console.log(data);
      const recArr = [];
      data?.data.receive.map((receive, i) => {
        receive.receList.map((reclist, j) => {
          if (reclist.codeID == data.data.itemMatch._id) {
            recArr.push(reclist.qty);
          }
        });
      });
    } catch (error) {
      console.log(error);
      message.error(error.response.data.message);
    }

    findpartdlts.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <div>
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            On-Hand RAW Material Status
          </Typography.Title>
        </div>
        <div>
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
      </div>
    </>
  );
};

export default PartStock;
