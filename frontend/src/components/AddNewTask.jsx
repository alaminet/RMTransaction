import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Mentions,
  message,
  Modal,
  Select,
} from "antd";

import TextArea from "antd/es/input/TextArea";

const AddNewTask = ({ setIsModalOpen, isModalOpen }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [userList, setUserList] = useState([]);
  const [taskForm] = Form.useForm();

  // Add New Task Form
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    // console.log("Success:", values);

    let assginToArr = [];
    const toArray = values.assignTo.split("@");
    toArray.map(
      (item) =>
        item !== "" &&
        userList.find(
          (f) =>
            f.label === item.trim() && assginToArr.push({ assignedToID: f.id })
        )
    );

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/task/newtask`,
        {
          title: values.title,
          details: values.details,
          taskTypes: values.taskGroup,
          taskStart: values.dateRange[0].$d,
          taskEnd: values.dateRange[1].$d,
          assignedBy: user._id,
          assignedTo: assginToArr,
        }
      );
      taskForm.resetFields();
      message.success(data.data.massage);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      message.error("Error Found");
    }
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
          id: item._id,
          label: item.userID,
          value: item.userID,
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
              form={taskForm}
              variant="filled"
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
                  optionFilterProp="label"
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
