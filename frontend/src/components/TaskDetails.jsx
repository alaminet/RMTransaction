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
  Select,
  Tag,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

const { Title, Paragraph } = Typography;

const TaskDetails = ({ setIsModalOpen, isModalOpen, taskView, teamMember }) => {
  const user = useSelector((user) => user.loginSlice.login);
  const [chatForm] = Form.useForm();
  const [chatText, setchatText] = useState();
  const [selectMember, setSelectMember] = useState();
  const [selectStatus, setSelectStatus] = useState();

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
        // console.log(data);
        setchatText("");
        chatForm.resetFields();
      }
    } catch (error) {
      console.log(error);
      message.error("Error Found");
    }
  };

  const handleMemberCng = (value) => {
    setSelectMember(value);
  };
  const handleStatusCng = (value) => {
    setSelectStatus(value);
  };

  // taskTeam
  // useEffect(() => {
  //   const teamArr = [];
  //   taskView?.team?.map((t) => {
  //     teamArr.push({
  //       value: t?.assignedToID._id,
  //       label: t?.assignedToID.userID,
  //     });
  //   });
  //   // setTaskTeam(teamArr);
  // }, []);

  const showTask = async (id, status) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/v1/api/task/teamview`, {
      teamID: id,
      status: status,
    });
  };
  const handleReview = () => {
    taskView?.team?.map(async (member) => {
      if (member.assignedToID.userID === user.userID) {
        showTask(member._id, "review");
      }
    });
  };
  const handleAccept = () => {
    showTask(selectMember, selectStatus);
    console.log(selectMember, selectStatus);
  };

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
                {taskView?.team?.map(
                  (member) =>
                    member.assignedToID.userID === user.userID &&
                    member.assignedStatus
                )}
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
              {taskView?.team?.map((t) => {
                return (
                  <Tag size="small" style={{ margin: "5px" }}>
                    @{t?.assignedToID.userID}
                  </Tag>
                );
              })}
            </Col>
          </Row>
          <Typography>
            <Title level={5} style={{ margin: "0" }}>
              Task Details
            </Title>
            <Paragraph>{taskView?.details}</Paragraph>
          </Typography>
          <Divider>Discussion</Divider>
          <Button
            onClick={handleReview}
            block
            danger
            type="primary"
            style={{ margin: "20px 0" }}>
            Submit for Review
          </Button>
          {taskView?.assigned === user.userID && (
            <>
              <Flex gap={10}>
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="label"
                  onChange={handleMemberCng}
                  options={teamMember}
                />
                <Select
                  showSearch
                  placeholder="Status"
                  optionFilterProp="label"
                  onChange={handleStatusCng}
                  options={[
                    {
                      value: "done",
                      label: "Done",
                    },
                    {
                      value: "review",
                      label: "Review",
                    },
                  ]}
                />
                <Button
                  onClick={handleAccept}
                  type="primary"
                  style={{ marginBottom: "20px", textTransform: "capitalize" }}>
                  {selectStatus || "Button"}
                </Button>
              </Flex>
            </>
          )}

          <Row
            gutter={10}
            wrap
            style={{ marginBottom: "14px" }}
            justify="space-between">
            <Form
              form={chatForm}
              variant="filled"
              onFinish={handleComment}
              style={{ width: "100%" }}
              layout="inline">
              <Form.Item
                name="chatText"
                style={{
                  width: "79%",
                }}
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
                  Send
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
