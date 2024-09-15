import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";
import AddNewTask from "../components/AddNewTask";
import TaskCard from "../components/TaskCard";
import TaskSummery from "../components/TaskSummery";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const TaskPannel = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  // Modal functional
  const showModal = () => {
    setIsModalOpen(true);
  };

  //get all task
  useEffect(() => {
    async function getTask() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/task/alltask`
      );
      // console.log(data.data.allTask);
      let taskArr = [];
      data?.data?.allTask?.map((item, i) => {
        item?.assignedTo?.map((assign, j) => {
          const timeDiff = parseInt(
            (new Date(item?.taskEnd) - new Date()) / 1000
          );
          const durationTime = parseInt(
            (new Date(item?.taskEnd) - new Date()) / 1000
          );
          const days = parseInt(durationTime < 0 ? 0 : durationTime / 86400);
          const hours = parseInt(
            (durationTime < 0 ? 0 : durationTime % 86400) / 3600
          );
          const minutes = Math.floor(
            (durationTime < 0 ? 0 : durationTime % 3600) / 60
          );
          if (user.userID === assign?.assignedToID?.userID) {
            taskArr.push({
              key: ++i,
              title: item?.title,
              group: item?.taskTypes,
              details: item?.details,
              startDate: moment(item?.taskStart).format("DD-MMM-YY hh:mmA"),
              endDate: moment(item?.taskEnd).format("DD-MMM-YY hh:mmA"),
              duePersent: Math.floor((durationTime / timeDiff) * 100),
              dueTime:
                days < 1
                  ? `${hours}h:${minutes}m`
                  : `${days}Day ${hours}h:${minutes}m`,
              assigned: item?.assignedBy?.userID,
              status: item?.taskStatus,
              team: item?.assignedTo,
              discussition: item?.discussition,
              action: item?._id,
            });
          }
        });
      });
      setTaskList(taskArr);
    }

    getTask();
  }, []);

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
            <TaskSummery taskList={taskList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPannel;
