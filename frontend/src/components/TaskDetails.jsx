import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

const { Title, Paragraph } = Typography;

const TaskDetails = ({ setIsModalOpen, isModalOpen, taskView }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [chatForm] = Form.useForm();
  const [chatText, setchatText] = useState();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComment = async (values) => {
    try {
      if (chatText !== "") {
        const data = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/task/newchat`,
          {
            taskID: taskView.action,
            chatText: values.chatText,
            chatBy: user._id,
          }
        );
        console.log(data);
        setchatText("");
        chatForm.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error("Error Found");
    }
  };
  // useEffect(() => {
  //   async function getTask() {
  //     const data = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/v1/api/task/viewTask`,
  //       {
  //         taskID: taskView,
  //       }
  //     );
  //     console.log(data);
  //   }
  //   getTask();
  // }, []);
  return (
    <>
      <Modal
        title={taskView?.title}
        htmlType="submit"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <div>
          <Descriptions>
            <Descriptions.Item label="Assigned">
              <Tag size="small" style={{ margin: "5px" }}>
                @{taskView?.assigned}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag size="small" style={{ margin: "5px" }}>
                {taskView?.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Time">
              <Tag size="small" style={{ margin: "5px" }}>
                {taskView?.dueTime}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          <Row gap="small" align="middle">
            <Col span={2}>Team: </Col>
            <Col span={22} gap="small">
              {taskView?.team?.map((t) => (
                <Tag size="small" style={{ margin: "5px" }}>
                  @{t?.assignedToID.userID}
                </Tag>
              ))}
            </Col>
          </Row>
          <Typography>
            <Title level={5} style={{ margin: "0" }}>
              Task Details
            </Title>
            <Paragraph>{taskView?.details}</Paragraph>
          </Typography>
          <Divider>Discussion</Divider>
          <Button block danger type="primary" style={{ margin: "20px 0" }}>
            Submit for Review
          </Button>
          <Row
            gutter={10}
            wrap
            style={{ marginBottom: "14px" }}
            justify="space-between">
            <Form form={chatForm} variant="filled" onFinish={handleComment}>
              <Form.Item
                name="chatText"
                rules={[
                  {
                    required: true,
                    message: "Input Comments",
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
          <Flex
            vertical
            gap={10}
            style={{
              rowGap: "10px",
              overflowX: "hidden",
              height: "300px",
              overflowY: "scroll",
            }}>
            {taskView?.discussition?.map((dis) => {
              if (dis?.chatBy.userID !== user.userID) {
                return (
                  <>
                    <Card
                      id="taskCard"
                      style={{
                        backgroundColor: "#ffbb5659",
                        width: "95%",
                      }}>
                      <Title level={5} style={{ margin: "0" }}>
                        @{dis?.chatBy.userID} -{" "}
                        {moment(dis?.chatTime).format("DD-MMM-YY hh:mmA")}
                      </Title>
                      <Paragraph>{dis?.chatText}</Paragraph>
                    </Card>
                  </>
                );
              } else {
                return (
                  <Card
                    id="taskCard"
                    style={{
                      backgroundColor: "rgb(240, 242, 245)",
                      width: "95%",
                      marginLeft: "auto",
                    }}>
                    <Title level={5} style={{ margin: "0" }}>
                      @{dis?.chatBy.userID} -{" "}
                      {moment(dis?.chatTime).format("DD-MMM-YY hh:mmA")}
                    </Title>
                    <Paragraph>{dis?.chatText}</Paragraph>
                  </Card>
                );
              }
            })}
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetails;
