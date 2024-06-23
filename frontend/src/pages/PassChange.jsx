import React from "react";
import axios from "axios";
import { Button, Form, Input, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../Slice/UserSlice";
import { Helmet } from "react-helmet-async";

const PassChange = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      const userData = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/auth/passchange`,
        {
          userID: user._id,
          oldPass: values.oldPass,
          newPass: values.newPass,
        }
      );
      form.resetFields();
      message.success("Password Changed");
      dispatch(Loginuser(userData.data));
      localStorage.setItem("user", JSON.stringify(userData.data));
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Change Your Password
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          name="oldPass"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Please input your Current password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPass"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["newPass"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPass") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 14,
          }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PassChange;
