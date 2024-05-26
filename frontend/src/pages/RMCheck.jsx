import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex, Input, Table, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const RMCheck = () => {
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const handleDone = async (item) => {
    // console.log(item.dtls.qty);
    setLoading(true);
    try {
      const recHistory = await axios.get(
        "https://wms-ftl.onrender.com/v1/api/tnx/itemwiserec",
        {
          lineID: item.receID,
        }
      );
      const receIDArr = [];
      recHistory?.data.map((order) => {
        order?.receList.map((list) => {
          if (list._id === item.receID) {
            receIDArr.push({
              issueQty: list.issue,
            });
          }
        });
      });
      // console.log(receIDArr[0].issueQty);
      const tnxUpdate = await axios.put(
        "https://wms-ftl.onrender.com/v1/api/tnx/issueUpdate",
        {
          issueID: item.issueID,
          receID: item.receID,
          qty: receIDArr[0].issueQty + item.dtls.qty,
        }
      );
      setLoading(false);
      message.success("Check Done!");
      setTbllist(tbllist.filter((a) => a.action.issueID !== item.issueID));
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Error Found");
    }
  };

  const handleReject = async (item) => {
    setLoading(true);
    try {
      const tnxUpdate = await axios.put(
        "https://wms-ftl.onrender.com/v1/api/tnx/issueReject",
        {
          lineID: item.issueID,
        }
      );
      setLoading(false);
      message.warning("Item Rejected!");
      setTbllist(tbllist.filter((a) => a.action.issueID !== item.issueID));
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Error Found");
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
      title: "Part Name",
      dataIndex: "name",
      key: "name",
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
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            onClick={() => handleDone(item)}>
            Done
          </Button>
          <Button
            loading={loading}
            disabled={loading}
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

  async function getRMIssueData() {
    const issueData = await axios.get(
      "https://wms-ftl.onrender.com/v1/api/tnx/rmcheck"
    );
    const tableData = [];
    issueData?.data?.map((order, i) => {
      order?.issueList?.map((item, j) => {
        // console.log(item);
        item.status !== "done" &&
          tableData.push({
            dataIndex: i,
            station: order.stationID.station,
            lot: order.lotID.lot,
            code: item.codeID.code,
            name: item.codeID.itemname,
            issue: item.issue,
            qty: item.qty,
            rmk: item.rmk,
            action: { issueID: item._id, receID: item.lineID, dtls: item },
          });
        setTbllist(tableData);
      });
    });
  }

  useEffect(() => {
    getRMIssueData();
  }, []);

  const handleRefress = () => {
    getRMIssueData();
    const nextList = [...tbllist];
    nextList.reverse();
    setTbllist(nextList);
  };

  return (
    <>
      <div>
        <Flex gap={16}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find by Code"
            variant="filled"
          />
          <Button
            onClick={handleRefress}
            type="primary"
            shape="circle"
            icon={<ReloadOutlined />}
          />
        </Flex>
        <Table
          style={{ width: "100%" }}
          dataSource={tbllist?.filter((item) =>
            item?.code.toLowerCase().includes(search.toLowerCase())
          )}
          columns={columns}
        />
      </div>
    </>
  );
};

export default RMCheck;
