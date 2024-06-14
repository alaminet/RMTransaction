import React from "react";
import axios from "axios";
import { Button, Form, Input, Typography } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;
const { Title } = Typography;

const AddItem = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [additemform] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    const itemlistArr = [];
    const itemArr = [];
    const itemList = values.itemdetails.split("\n").map((item, i) => {
      itemlistArr.push(item.split("\t"));
    });
    itemlistArr?.map((list) => {
      const items = [{ code: list[0], itemname: list[1], uom: list[2] }];
      itemArr.push(...items);
    });

    try {
      const data = await axios.post(
        "https://ftlwms01.onrender.com/v1/api/item/additem",
        {
          itemlist: itemArr,
        }
      );
    } catch (error) {
      console.log(error.response.message);
    }
    additemform.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {user.role === "admin" && (
        <div>
          <Typography style={{ textAlign: "center" }}>
            <Title level={2}>Add New Item</Title>
          </Typography>
          <Form
            form={additemform}
            name="additem"
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
      )}
    </>
  );
};

export default AddItem;
