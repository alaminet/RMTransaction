import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input } from "antd";
const { TextArea } = Input;

const AddItem = () => {
  const onFinish = async (values) => {
    // console.log("Success:", values);
    const itemlistArr = [];
    const itemList = values.itemdetails.split("\n").map((item, i) => {
      itemlistArr.push(item.split("\t"));
    });

    try {
      const data = await axios.post(
        "http://localhost:8000/v1/api/item/additem",
        {
          itemlist: itemlistArr,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        <Form
          name="basic"
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
          autoComplete="off">
          <Form.Item
            label="Item Details"
            name="itemdetails"
            rules={[
              {
                required: true,
                message: "Please input Code,Name,UOM paste from XL",
              },
            ]}>
            <TextArea rows={4} placeholder="Code,Name,UOM paste from XL" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddItem;
