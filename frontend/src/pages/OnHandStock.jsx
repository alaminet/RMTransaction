import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const OnHandStock = () => {
  const { Text } = Typography;
  const user = useSelector((user) => user.loginSlice.login);
  const [fullList, setFullList] = useState(true);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.sl - b.sl,
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
      title: "Model_Lot",
      dataIndex: "lot",
      key: "lot",
    },
    {
      title: "Location",
      dataIndex: "loc",
      key: "loc",
    },
    {
      title: "Receive Qty",
      dataIndex: "recqty",
      key: "recqty",
      sorter: (a, b) => a.recqty - b.recqty,
    },
    {
      title: "Issue Qty",
      dataIndex: "issqty",
      key: "issqty",
      sorter: (a, b) => a.issqty - b.issqty,
    },
    {
      title: "On-Hand Qty",
      dataIndex: "onhand",
      key: "onhand",
      sorter: (a, b) => a.onhand - b.onhand,
    },
  ];

  useEffect(() => {
    async function getStock() {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/onhand`
        );
        //   console.log(data);
        const recArr = [];
        let y = 1;
        data?.data.map((receive, i) => {
          receive?.receList.map((reclist, j) => {
            if (reclist.qty > reclist.issue) {
              recArr.push({
                sl: y++,
                code: reclist.codeID.code,
                name: reclist.codeID.itemname,
                uom: reclist.codeID.uom,
                loc: reclist.locID.loc,
                lot: receive.lotID.lot,
                recqty: reclist.qty,
                issqty: reclist.issue,
                onhand: reclist.qty - reclist.issue,
              });
              setTbllist(recArr);
            }
          });
        });
      } catch (error) {
        //   console.log(error);
        message.error(error.response.data.message);
      }
    }
    getStock();
  }, []);
  return (
    <>
      <Helmet>
        <title>On-Hand Stock</title>
      </Helmet>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          {tbllist.length > 0 && (
            <>
              <Divider>On-Hand Details Table</Divider>
              <div>
                <div style={{ display: "Flex", gap: "10px" }}>
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Find by Code"
                    variant="filled"
                    style={{ marginBottom: "10px" }}
                  />
                  <Button type="primary" onClick={() => setFullList(!fullList)}>
                    View All
                  </Button>
                </div>
                <Table
                  pagination={fullList}
                  style={{ width: "100%" }}
                  dataSource={tbllist?.filter((item) =>
                    item?.code?.toLowerCase().includes(search?.toLowerCase())
                  )}
                  columns={columns}
                  bordered
                  summary={(pageData) => {
                    let totalRecive = 0;
                    let totalIssue = 0;
                    let totalOnhand = 0;
                    pageData.forEach(({ recqty, issqty, onhand }) => {
                      totalRecive += recqty;
                      totalIssue += issqty;
                      totalOnhand += onhand;
                    });

                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell colSpan={5}>
                            <Text>Total:</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text>{totalRecive}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text>{totalIssue}</Text>
                          </Table.Summary.Cell>
                          <Table.Summary.Cell>
                            <Text>{totalOnhand}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default OnHandStock;
