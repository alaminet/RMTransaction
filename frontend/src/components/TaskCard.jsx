import React from "react";
import { Card, Col, Progress, Row, Typography } from "antd";
const { Title, Text } = Typography;

const TaskCard = () => {
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
            <Text style={{ color: "#fff" }}>08 Tasks | 10 Tasks</Text>
          </Card>
          <Progress strokeColor={twoColors} percent={100} />
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ background: "#FF7783", color: "#fff" }}
            bordered={false}>
            <Title level={4} style={{ marginTop: "0", color: "#fff" }}>
              Expired Task
            </Title>
            <Text style={{ color: "#fff" }}>08 Tasks | 10 Tasks</Text>
          </Card>
          <Progress strokeColor={twoColors} percent={80} />
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{ background: "#FFBB56", color: "#fff" }}
            bordered={false}>
            <Title level={4} style={{ marginTop: "0", color: "#fff" }}>
              Reviewed Task
            </Title>
            <Text style={{ color: "#fff" }}>08 Tasks | 10 Tasks</Text>
          </Card>
          <Progress strokeColor={twoColors} percent={50} />
        </Col>
      </Row>
    </>
  );
};

export default TaskCard;
