import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Button, Divider, message, Popconfirm, Space, Table, Tag } from "antd";
import TaskDetails from "../components/TaskDetails";
import { useSelector } from "react-redux";

const TaskView = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);

  // Modal functional
  const showModal = () => {
    setIsModalOpen(true);
  };

  // popconfirm
  const confirm = (e) => {
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  // Data Table
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (key) => <span>{key}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => {
        let color;
        // ["waiting", "ongoing", "done", "review", "delete"]
        return (
          <>
            <Tag
              color={
                item?.status === "waiting"
                  ? "volcano"
                  : item?.status === "ongoing"
                  ? "geekblue"
                  : item?.status === "done"
                  ? "blue"
                  : item?.status === "review"
                  ? "volcano"
                  : item?.status === "delete"
                  ? "volcano"
                  : item?.status === "completed" && "green"
              }
              key={item}>
              {item?.status.toUpperCase()}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Waiting",
          value: "waiting",
        },
        {
          text: "On-going",
          value: "ongoing",
        },
        {
          text: "Done",
          value: "done",
        },
        {
          text: "Review",
          value: "review",
        },
        {
          text: "Delete",
          value: "delete",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Assigned By",
      dataIndex: "assigned",
      key: "assigned",
      render: (_, item) => (
        <>
          <Tag color="green" key={item}>
            {item?.assigned}
          </Tag>
        </>
      ),
    },
    {
      title: "Team",
      key: "team",
      dataIndex: "team",
      render: (_, { team }) => (
        <>
          {team?.map((team) => {
            return (
              <Tag color="geekblue" key={team}>
                {team?.assignedToID?.userID}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" size="small" onClick={showModal}>
            View
          </Button>
          <Button size="small">Edit</Button>
          <Popconfirm
            title="Complete the task"
            description="Are you sure to complete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            <Button danger size="small">
              Done
            </Button>
          </Popconfirm>
          <TaskDetails
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function getTask() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/task/alltask`
      );
      console.log(data.data.allTask);
      let taskArr = [];
      data?.data?.allTask?.map((item, i) => {
        if (user.role === "admin") {
          taskArr.push({
            key: ++i,
            title: item?.title,
            group: item?.taskTypes,
            startDate: moment(item?.taskStart).format("DD-MMM-YY hh:mmA"),
            endDate: moment(item?.taskEnd).format("DD-MMM-YY hh:mmA"),
            assigned: item?.assignedBy?.userID,
            status: item?.taskStatus,
            team: item?.assignedTo,
            action: item?._id,
          });
        }

        if (user.role !== "admin") {
          if (user.userID === item?.assignedBy?.userID) {
            taskArr.push({
              key: ++i,
              title: item?.title,
              group: item?.taskTypes,
              startDate: moment(item?.taskStart).format("DD-MMM-YY hh:mmA"),
              endDate: moment(item?.taskEnd).format("DD-MMM-YY hh:mmA"),
              assigned: item?.assignedBy?.userID,
              status: item?.taskStatus,
              team: item?.assignedTo,
              action: item?._id,
            });
          }
          item?.assignedTo?.map((assign, j) => {
            if (user.userID === assign?.assignedToID?.userID) {
              taskArr.push({
                key: ++i,
                title: item?.title,
                group: item?.taskTypes,
                startDate: moment(item?.taskStart).format("DD-MMM-YY hh:mmA"),
                endDate: moment(item?.taskEnd).format("DD-MMM-YY hh:mmA"),
                assigned: item?.assignedBy?.userID,
                status: item?.taskStatus,
                team: item?.assignedTo,
                action: item?._id,
              });
            }
          });
        }
      });
      setTaskList(taskArr);
    }

    getTask();
  }, []);
  return (
    <>
      <div style={{ width: "100%" }}>
        <Divider>Task Details Table</Divider>
        <Table columns={columns} dataSource={taskList} bordered />
      </div>
    </>
  );
};

export default TaskView;
