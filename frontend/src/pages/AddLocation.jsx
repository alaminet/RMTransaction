import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const { TextArea } = Input;
const AddLocation = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [addlocform] = Form.useForm();
  const [locList, setLocList] = useState();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    const itemlistArr = [];
    const itemArr = [];
    values.loclist?.split("\n").map((item, i) => {
      itemlistArr.push(item);
    });

    itemlistArr?.map((list, j) => {
      if (locList?.find((l) => l.loc === list)) {
        console.log(list);
      } else {
        const items = [{ loc: list }];
        itemArr.push(...items);
      }
    });
    try {
      const data = await axios.post(
        "https://wms-ftl.onrender.com/v1/api/item/addlocation",
        {
          itemlist: [...itemArr],
        }
      );
      message.success(data.data.message);
      setLoading(false);
    } catch (error) {
      console.log(error.response.message);
      setLoading(false);
    }
    addlocform.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  // view location list
  useEffect(() => {
    async function getLoc() {
      const data = await axios.get(
        "https://wms-ftl.onrender.com/v1/api/item/viewlocation"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ locID: item._id, loc: item.loc });
        setLocList(tableData);
      });
    }
    getLoc();
  }, [onFinish]);
  return (
    <>
      {user.role === "admin" && (
        <div>
          <Form
            form={addlocform}
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
            autoComplete="off">
            <Form.Item
              label="Location List"
              name="loclist"
              rules={[
                {
                  required: true,
                  message: "Please input Location paste from XL",
                },
              ]}>
              <TextArea rows={4} placeholder="ex: RM1:A01A ; RM3:B30D" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button
                loading={loading}
                disabled={loading}
                type="primary"
                htmlType="submit">
                Add Location
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddLocation;
