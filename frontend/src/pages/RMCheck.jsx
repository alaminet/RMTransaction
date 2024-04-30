import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Table } from "antd";

const RMCheck = () => {
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  const tblData = tbllist.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleDone = async (item) => {
    try {
      const tnxUpdate = await axios.put(
        "http://localhost:8000/v1/api/tnx/issueUpdate",
        {
          lineID: item,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (item) => {
    try {
      const tnxUpdate = await axios.put(
        "http://localhost:8000/v1/api/tnx/issueReject",
        {
          lineID: item,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // table arrangment
  const columns = [
    {
      title: "Station",
      dataIndex: "station",
      key: "station",
    },
    {
      title: "Model",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Part Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "location",
      dataIndex: "loc",
      key: "loc",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item) => (
        <>
          <Button type="primary" onClick={() => handleDone(item)}>
            Done
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            danger
            type="primary"
            onClick={() => handleReject(item)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function getRMIssueData() {
      const issueData = await axios.get(
        "http://localhost:8000/v1/api/tnx/rmcheck"
      );
      const tableData = [];
      issueData?.data?.map((order, i) => {
        order?.issueList?.map((item, j) => {
          item.status !== "done" &&
            tableData.push({
              dataIndex: i,
              station: order.station,
              lot: order.lot,
              code: item.code,
              loc: item.loc,
              qty: item.qty,
              action: item._id,
            });

          setTbllist(tableData);
        });
      });
    }

    getRMIssueData();
  }, [handleDone, handleReject]);

  return (
    <>
      <div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find by Code"
          variant="filled"
        />
        <Table
          style={{ width: "100%" }}
          dataSource={tblData}
          columns={columns}
        />
      </div>
    </>
  );
};

export default RMCheck;
