import React from "react";
import { Card, Col, Progress, Row, Typography } from "antd";
const { Title, Text } = Typography;

const TaskCard = ({ taskCount }) => {
  const twoColors = {
    "0%": "#FF7783",
    "100%": "#52c41a",
  };
  return (
    <>
      <Row gutter={16} style={{ rowGap: "16px" }}>
        <Col xs={24} sm={8}>
          <Card style={{ background: "#717EEE" }} bordered={false}>
            <Title level={4} style={{ marginTop: "0", color: "#fff" }}>
              On-Going Task
            </Title>
            <Text style={{ color: "#fff" }}>
              {taskCount.filter((x) => x == "ongoing").length} Tasks |{" "}
              {taskCount.length} Tasks
            </Text>
          </Card>
          <Progress
            strokeColor={twoColors}
            percent={Math.floor(
              100 -
                (taskCount.filter((x) => x == "ongoing").length /
                  taskCount.length) *
                  100
            )}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ background: "#FF7783", color: "#fff" }}
            bordered={false}>
            <Title level={4} style={{ marginTop: "0", color: "#fff" }}>
              Complete Task
            </Title>
            <Text style={{ color: "#fff" }}>
              {taskCount.filter((x) => x == "done").length} Tasks |{" "}
              {taskCount.length} Tasks
            </Text>
          </Card>
          <Progress
            strokeColor={twoColors}
            percent={Math.floor(
              100 -
                (taskCount.filter((x) => x == "done").length /
                  taskCount.length) *
                  100
            )}
          />
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ background: "#FFBB56", color: "#fff" }}
            bordered={false}>
            <Title level={4} style={{ marginTop: "0", color: "#fff" }}>
              Reviewed Task
            </Title>
            <Text style={{ color: "#fff" }}>
              {taskCount.filter((x) => x == "review").length} Tasks |{" "}
              {taskCount.length} Tasks
            </Text>
          </Card>
          <Progress
            strokeColor={twoColors}
            percent={Math.floor(
              100 -
                (taskCount.filter((x) => x == "review").length /
                  taskCount.length) *
                  100
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default TaskCard;
