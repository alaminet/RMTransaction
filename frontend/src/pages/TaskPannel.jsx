import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Mentions,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  TimePicker,
  TreeSelect,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import AddNewTask from "../components/AddNewTask";
import TaskCard from "../components/TaskCard";
import TaskSummery from "../components/TaskSummery";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const TaskPannel = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal functional
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <Notification />
        <div>
          <Row gutter={16} style={{ rowGap: "16px" }}>
            <Col className="gutter-row" xs={24} sm={8}>
              <div>
                <Title level={3}>Hello; {user.userID}</Title>
                <Text>
                  {moment(new Date()).format("[Today is] dddd, MMMM Do YYYY")}
                </Text>
              </div>
            </Col>
            <Col className="gutter-row" xs={24} sm={8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button type="primary" onClick={showModal}>
                    Add New Task
                  </Button>
                  <Link to="/alltask">
                    <Button>View All Task</Button>
                  </Link>
                  <AddNewTask
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Divider></Divider>
          <div
            style={{
              background: "rgb(240, 242, 245)",
              borderRadius: "8px 8px 0 0",
              padding: "20px",
              borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
            }}>
            <TaskCard />
            <TaskSummery />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPannel;
