import React, { useState } from "react";
import { Alert, Button, Form, Input, Radio } from "antd";
import axios from "axios";

const AddUser = () => {
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [adduser] = Form.useForm();
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoadings(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/v1/api/auth/adduser",
        {
          userID: values.userid,
          password: values.password,
          role: values.role,
        }
      );
      setLoadings(false);
      setMsg(`Succesfully Add User ID: ${data.data.newUser.userID}`);
      setMsgType("success");
      adduser.resetFields();
    } catch (error) {
      setLoadings(false);
      console.log(error);
      setMsg(error.response.data.massage);
      setMsgType("error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div>
        {msg && <Alert message={msg} type={msgType} showIcon closable />}
        <Form
          form={adduser}
          name="adduser"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="User ID"
            name="userid"
            rules={[
              {
                required: true,
                message: "Please input User ID!",
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
            label="User Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please select role!",
              },
            ]}>
            <Radio.Group>
              <Radio value="user">User</Radio>
              <Radio value="LM">Line Manager</Radio>
              <Radio value="checker">Checker</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button
              loading={loadings}
              disabled={loadings}
              type="primary"
              htmlType="submit">
              Add User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddUser;
