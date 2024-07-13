import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, message, Typography } from "antd";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
const { TextArea } = Input;
const { Title } = Typography;

const AddItem = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [partList, setPartList] = useState();
  const [additemform] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    const itemlistArr = [];
    const itemArr = [];
    const itemList = values.itemdetails.split("\n").map((item, i) => {
      itemlistArr.push(item.split("\t"));
    });

    itemlistArr?.map((list) => {
      const partMatch = partList.find((f) => f.code === list[0]);
      if (!partMatch) {
        const items = [{ code: list[0], itemname: list[1], uom: list[2] }];
        itemArr.push(...items);
      }
    });
    try {
      if (itemArr.length > 0) {
        const data = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/item/additem`,
          {
            itemlist: itemArr,
          }
        );
        message.success(data.data.message);
        additemform.resetFields();
      } else {
        message.warning("No New Item Found");
      }
    } catch (error) {
      message.error(error.response.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // get Part info
  async function getPart() {
    const data = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/api/item/viewitemlist`
    );
    const tableData = [];
    data?.data?.map((item, i) => {
      tableData.push({
        id: item._id,
        code: item.code,
        name: item.itemname,
      });
      setPartList(tableData);
    });
  }
  useEffect(() => {
    getPart();
  }, []);
  return (
    <>
      <Helmet>
        <title>Add Item</title>
      </Helmet>
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
