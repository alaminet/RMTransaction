import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import React from "react";

const { Title, Text, Paragraph } = Typography;

const TaskDetails = ({ setIsModalOpen, isModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Task Title"
        htmlType="submit"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}>
        <div>
          <Descriptions>
            <Descriptions.Item label="Assigned">@M03166</Descriptions.Item>
            <Descriptions.Item label="Status">Ongoing</Descriptions.Item>
            <Descriptions.Item label="Due Time">02:00</Descriptions.Item>
          </Descriptions>
          <Row gap="small">
            <Col span={2}>Team: </Col>
            <Col span={22} gap="small">
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
              <Button size="small" style={{ margin: "5px" }}>
                @M03166
              </Button>
            </Col>
          </Row>
          <Typography>
            <Title level={5} style={{ margin: "0" }}>
              Introduction
            </Title>
            <Paragraph>
              In the process of internal desktop applications development, many
              different design specs and implementations would be involved,
              which might cause designers and developers difficulties and
              duplication and reduce the efficiency of development.
            </Paragraph>
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
            <Col span={19}>
              <Input />
            </Col>
            <Col>
              <Button type="primary">Send</Button>
            </Col>
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
            <Card
              style={{
                backgroundColor: "#ffbb5659",
                width: "95%",
              }}>
              <Title level={5} style={{ margin: "0" }}>
                @M03166 - 23/09/204 02:03 PM
              </Title>
              <Paragraph>
                In the process of internal desktop applications development,
                difficulties and duplication and reduce the efficiency of
                development.
              </Paragraph>
            </Card>
            <Card
              style={{
                backgroundColor: "rgb(240, 242, 245)",
                width: "95%",
                marginLeft: "auto",
              }}>
              <Title level={5} style={{ margin: "0" }}>
                @M03166 - 23/09/204 02:03 PM
              </Title>
              <Paragraph>
                In the process of internal desktop applications development,
                many different design specs and implementations would be
                involved, which might cause designers and developers
                difficulties and duplication and reduce the efficiency of
                development.
              </Paragraph>
            </Card>
            <Card
              style={{
                backgroundColor: "#ffbb5659",
              }}>
              <Title level={5} style={{ margin: "0" }}>
                @M03166 - 23/09/204 02:03 PM
              </Title>
              <Paragraph>
                In the process of internal desktop applications development,
                difficulties and duplication and reduce the efficiency of
                development.
              </Paragraph>
            </Card>
            <Card
              style={{
                backgroundColor: "rgb(240, 242, 245)",
              }}>
              <Title level={5} style={{ margin: "0" }}>
                @M03166 - 23/09/204 02:03 PM
              </Title>
              <Paragraph>
                In the process of internal desktop applications development,
                many different design specs and implementations would be
                involved, which might cause designers and developers
                difficulties and duplication and reduce the efficiency of
                development.
              </Paragraph>
            </Card>
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetails;
