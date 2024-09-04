import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, DatePicker, Form, Input, Mentions, Modal, Select } from "antd";

import TextArea from "antd/es/input/TextArea";

const AddNewTask = ({ setIsModalOpen, isModalOpen }) => {
  const [userList, setUserList] = useState([]);

  // Add New Task Form
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    setIsModalOpen(false);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function getData() {
      const issueData = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/auth/viewuser`
      );
      const tableData = [];
      issueData?.data?.map((item, i) => {
        tableData.push({
          value: item.userID,
          label: item.userID,
        });

        setUserList(tableData);
      });
    }
    getData();
  }, []);
  return (
    <>
      <div>
        <Modal
          title="Add New Task"
          htmlType="submit"
          open={isModalOpen}
          footer={false}
          onCancel={handleCancel}>
          <div>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 19,
              }}
              layout="horizontal"
              style={{
                maxWidth: 700,
              }}>
              <Form.Item
                name="title"
                label="Task Title"
                rules={[
                  {
                    required: true,
                    message: "Input Task Title",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="details"
                label="Task Details"
                rules={[
                  {
                    required: true,
                    message: "Input Task Details",
                  },
                ]}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="taskGroup"
                label="Task Group"
                rules={[
                  {
                    required: true,
                    message: "Select Task Group",
                  },
                ]}>
                <Select>
                  <Select.Option value="daily">Daily Task</Select.Option>
                  <Select.Option value="5s">5S Activites</Select.Option>
                  <Select.Option value="assign">Assign Task</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="dateRange"
                label="Assign Date"
                rules={[
                  {
                    required: true,
                    message: "Assign Task duration",
                  },
                ]}>
                <DatePicker.RangePicker showTime />
              </Form.Item>
              <Form.Item
                name="assignTo"
                label="Assigned To"
                rules={[
                  {
                    required: true,
                    message: "Assign to with @",
                  },
                ]}>
                <Mentions
                  style={{
                    width: "100%",
                  }}
                  placeholder="@M12345"
                  options={userList}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 5,
                  span: 14,
                }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddNewTask;
