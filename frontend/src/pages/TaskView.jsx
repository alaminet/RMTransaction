import React, { useState } from "react";
import { Button, Divider, message, Popconfirm, Space, Table, Tag } from "antd";
import TaskDetails from "../components/TaskDetails";

const TaskView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal functional
  const showModal = () => {
    setIsModalOpen(true);
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

        return (
          <>
            <Tag
              color={
                item.status === "expaired"
                  ? "volcano"
                  : item.status === "ongoing"
                  ? "geekblue"
                  : item.status === "completed" && "green"
              }
              key={item}>
              {item.status.toUpperCase()}
            </Tag>
          </>
        );
      },
      filters: [
        {
          text: "Expaired",
          value: "expaired",
        },
        {
          text: "Completed",
          value: "completed",
        },
        {
          text: "On-going",
          value: "ongoing",
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
            {item.assigned.toUpperCase()}
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
          {team.map((team) => {
            return (
              <Tag color="geekblue" key={team}>
                {team.toUpperCase()}
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
  const data = [
    {
      key: "1",
      title: "John Brown",
      group: 32,
      startDate: "23/09/2024 02:00 PM",
      endDate: "23/09/2024 02:00 PM",
      assigned: "@M03166",
      status: "completed",
      team: ["@M03166", "@M03166"],
    },
  ];
  return (
    <>
      <div style={{ width: "100%" }}>
        <Divider>Task Details Table</Divider>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    </>
  );
};

export default TaskView;
