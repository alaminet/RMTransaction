import React from "react";
import axios from "axios";
import { Button, Flex, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { Loginuser } from "../Slice/UserSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      const userData = await axios.post(
        "https://wms-ftl.onrender.com/v1/api/auth/login",
        {
          userID: values.userID,
          password: values.password,
        }
      );
      messageApi.success("Successfully Login");
      dispatch(Loginuser(userData.data));
      localStorage.setItem("user", JSON.stringify(userData.data));
    } catch (error) {
      messageApi.error(error.response.data.error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Flex align="center" justify="center">
        <div>
          <h1 style={{ textAlign: "center" }}>Login Your ID</h1>
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
            autoComplete="off"
          >
            <Form.Item
              label="User ID"
              name="userID"
              rules={[
                {
                  required: true,
                  message: "Please input your user ID!",
                },
              ]}
            >
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
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
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
