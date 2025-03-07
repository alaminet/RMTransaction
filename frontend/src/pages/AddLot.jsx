import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Typography, message } from "antd";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
const { TextArea } = Input;

const AddLot = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [addlotform] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    const itemlistArr = [];
    const itemArr = [];
    const itemList = values.lotdetails?.split("\n").map((item, i) => {
      itemlistArr.push(item);
    });
    itemlistArr?.map((list, j) => {
      const items = [{ model: list.split("_")[0], lot: list }];
      itemArr.push(...items);
    });

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/item/addlot`,
        {
          itemlist: itemArr,
        }
      );
      message.success(data.data.message);
    } catch (error) {
      console.log(error.response.message);
    }
    addlotform.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Helmet>
        <title>Add LOT</title>
      </Helmet>
      {user.role === "admin" && (
        <div>
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            Add New Lot
          </Typography.Title>
          <Form
            form={addlotform}
            name="addlot"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: 700,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Lot Details"
              name="lotdetails"
              rules={[
                {
                  required: true,
                  message: "Please input Model_Lot paste from XL",
                },
              ]}
            >
              <TextArea rows={4} placeholder="ex: SU2id_Lot 01~02" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Add Lot
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddLot;
