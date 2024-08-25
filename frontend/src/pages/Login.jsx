import React, { useState } from "react";
import axios from "axios";
import { Button, Flex, Form, Input, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { Loginuser } from "../Slice/UserSlice";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState(false);
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoadings(true);
    try {
      const userData = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/auth/login`,
        {
          userID: values.userID,
          password: values.password,
        }
      );
      messageApi.success("Successfully Login");
      dispatch(Loginuser(userData.data));
      localStorage.setItem("user", JSON.stringify(userData.data));
      setLoadings(false);
    } catch (error) {
      messageApi.error(error.response.data.error);
      setLoadings(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadings(false);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      {contextHolder}
      <Flex align="center" justify="center">
        <div>
          <Typography.Title level={2} style={{ textAlign: "center" }}>
            Login your ID
          </Typography.Title>
          <Form
            name="login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="User ID"
              name="userID"
              rules={[
                {
                  required: true,
                  message: "Please input your user ID!",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadings}
                disabled={loadings}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Flex>
    </>
  );
};

export default Login;
