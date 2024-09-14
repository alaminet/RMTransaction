import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  message,
  Popconfirm,
  Progress,
  Row,
  Typography,
} from "antd";
import TaskDetails from "./TaskDetails";
const { Title, Text } = Typography;

const TaskSummery = ({ taskList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskView, setTaskView] = useState();

  // progress bar color
  const twoColors = {
    "0%": "#52c41a",
    "100%": "#FF7783",
  };

  // popconfirm
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // Show Task details
  const showModal = (item) => {
    setTaskView(item);
    setIsModalOpen(true);
  };
  return (
    <>
      <div
        style={{
          padding: "24px 0",
          margin: "20px 0",
          //   background: "#fff",
          borderRadius: "8px",
        }}>
        <Divider orientation="left">
          <Title underline level={4} style={{ marginTop: "0" }}>
            Pending Task Summery
          </Title>
        </Divider>
        <div>
          <Row gutter={16} style={{ rowGap: "16px" }}>
            {taskList?.map((item, i) => (
              <>
                <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Title level={5} style={{ marginTop: "0" }}>
                      {item?.title}
                    </Title>
                    <Row justify="space-between" style={{ rowGap: "16px" }}>
                      <Col xs={24} sm={15}>
                        <Flex vertical>
                          <Text style={{ marginBottom: "15px" }}>
                            - @{item?.assigned}
                          </Text>
                          <Text strong>Team</Text>
                          <Text>
                            {item?.team?.map((t) => (
                              <span>{`@${t?.assignedToID?.userID} `}</span>
                            ))}
                          </Text>
                        </Flex>
                      </Col>
                      <Col xs={24} sm={9}>
                        <Flex gap="small" wrap style={{ marginBottom: "15px" }}>
                          <Button
                            type="primary"
                            onClick={() => showModal(item)}>
                            View
                          </Button>
                          <Popconfirm
                            title="Complete the task"
                            description="Are you sure to complete this task?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <Button danger>Done</Button>
                          </Popconfirm>
                        </Flex>
                        <Progress
                          percent={70}
                          strokeColor={twoColors}
                          showInfo={false}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </>
            ))}
          </Row>
        </div>
        <div>
          <TaskDetails
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            taskView={taskView}
          />
        </div>
      </div>
    </>
  );
};

export default TaskSummery;
