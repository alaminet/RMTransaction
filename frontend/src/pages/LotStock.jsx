import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Divider, Form, Input, Select, Table, message } from "antd";
import { useSelector } from "react-redux";
const LotStock = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [findpartdlts] = Form.useForm();
  const [lotList, setLotList] = useState();
  const [loadings, setLoadings] = useState(false);
  const [tbllist, setTbllist] = useState([]);
  const [search, setSearch] = useState("");

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // form controll
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoadings(true);
    try {
      const data = await axios.post(
        "https://wms-ftl.onrender.com/v1/api/tnx/lotstock",
        {
          lot: values.lot,
        }
      );
      //   console.log(data);

      if (data.data.length < 1) {
        message.info("This Lot is not maintained");
        setTbllist([]);
      } else {
        const recArr = [];
        let y = 1;
        data?.data.map((receive, i) => {
          receive?.receList.map((reclist, j) => {
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
          });
        });
      }
      setLoadings(false);
    } catch (error) {
      //   console.log(error);
      setLoadings(false);
      message.error(error.response.data.message);
    }

    // findpartdlts.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadings(false);
  };

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
      defaultSortOrder: "descend",
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
      defaultSortOrder: "descend",
      sorter: (a, b) => a.recqty - b.recqty,
    },
    {
      title: "Issue Qty",
      dataIndex: "issqty",
      key: "issqty",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.issqty - b.issqty,
    },
    {
      title: "On-Hand Qty",
      dataIndex: "onhand",
      key: "onhand",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.onhand - b.onhand,
    },
  ];

  useEffect(() => {
    async function getLot() {
      const data = await axios.get(
        "https://wms-ftl.onrender.com/v1/api/item/viewLot"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ value: item._id, label: item.lot });
        setLotList(tableData);
      });
    }
    getLot();
  }, []);
  return (
    <>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              form={findpartdlts}
              name="partdlts"
              layout="inline"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                label="Lot Info"
                name="lot"
                style={{
                  minWidth: 300,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Select Lot",
                  },
                ]}>
                <Select
                  showSearch
                  placeholder="Select A Lot"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={filterOption}
                  options={lotList}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loadings}
                  disabled={loadings}
                  type="primary"
                  htmlType="submit">
                  Find
                </Button>
              </Form.Item>
            </Form>
          </div>
          {tbllist.length > 0 && (
            <>
              <Divider>On-Hand Details Table</Divider>
              <div>
                <div>
                  <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Find by Code"
                    variant="filled"
                    style={{ marginBottom: "10px" }}
                  />
                </div>
                <Table
                  style={{ width: "100%" }}
                  dataSource={tbllist?.filter((item) =>
                    item?.code?.toLowerCase().includes(search?.toLowerCase())
                  )}
                  columns={columns}
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

export default LotStock;
