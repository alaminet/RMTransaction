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
  const [taskCount, setTaskCount] = useState([]);
  const [taskView, setTaskView] = useState();
  const [teamMember, setTeamMember] = useState([]);

  // Modal functional
  const showTask = async (id) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/v1/api/task/teamview`, {
      teamID: id,
      status: "firstView",
    });
  };
  const showModal = (item) => {
    const teamArry = [];
    item?.team?.map((member) => {
      teamArry.push({
        label: member.assignedToID.userID,
        value: member._id,
      });
      if (member.assignedToID.userID === user.userID) {
        showTask(member._id);
      }
    });
    setTeamMember(teamArry);

    setTaskView(item);
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
          <Button type="primary" size="small" onClick={() => showModal(record)}>
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
            taskView={taskView}
            teamMember={teamMember}
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
      // console.log(data.data.allTask);
      let taskArr = [];
      const assStatusArr = [];
      let y = 0;
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

          if (
            user.userID === assign?.assignedToID?.userID ||
            user.userID === item?.assignedBy?.userID
          ) {
            assStatusArr.push(assign.assignedStatus);
            taskArr.push({
              key: ++y,
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
      const uniqueArray = taskArr.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.action == value.action)
      );
      setTaskList(uniqueArray);
      setTaskCount(assStatusArr);
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
