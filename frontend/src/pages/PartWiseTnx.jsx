import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Button,
  Form,
  DatePicker,
  Divider,
  Input,
  Table,
  Select,
  message,
  Modal,
  Space,
  InputNumber,
  Typography,
} from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const PartWiseTnx = () => {
  const { Text } = Typography;
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [tbllist, setTbllist] = useState([]);
  const [itemlist, setitemlist] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // From output
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    let strDate = new Date(values.StartDate.$d).setHours(0, 0, 0);
    let endDate = new Date(values.EndDate.$d).setHours(23, 59, 59);
    let tnxType = values.type;
    let findItem = values.code;
    // console.log(moment(strDate).format());
    // console.log(moment(endDate).format());
    try {
      if (!strDate || !endDate) {
        message.error("Date Required");
        setLoading(false);
      } else {
        const rmIssueDone = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/itemtnxdlts`,
          {
            stDate: moment(strDate).format(),
            edDate: moment(endDate).format(),
            codeID: findItem,
          }
        );
        // console.log(rmIssueDone.data);
        if (rmIssueDone.data.length == 0) {
          message.warning("No Data Found");
          setTbllist("");
        }
        const tableData = [];
        let y = 1;
        rmIssueDone?.data.map((order, i) => {
          order?.issueList?.map((item, j) => {
            if (item.codeID._id === findItem && item.status === tnxType) {
              tableData.push({
                dataIndex: order?._id,
                sl: y++,
                date: moment(order?.date).format("DD-MMM-YY"),
                station: order?.stationID?.station,
                tnxID: order?.tnxID,
                tnxby: order?.tnxby?.userID,
                lot: order?.lotID?.lot,
                code: item?.codeID?.code,
                name: item?.codeID?.itemname,
                qty: item?.qty,
                status: item?.status,
                rmk: item?.rmk,
                lastUpdateBy: item?.updateBy?.userID,
                lastupdated:
                  item?.updateTime &&
                  moment(item?.updateTime).format("DD-MMM-YY hh:mmA"),
                action: item?._id,
              });
              setTbllist(tableData);
            }
          });
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  // action controller
  // edit table data
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values.action,
      issue: values.qty,
    });
  };
  const onFinishEdit = async (values) => {
    // console.log(editItem);
    // console.log(values);
    setIsModalOpen(false);
    if (editItem.qty !== values.issue) {
      try {
        const update = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/rmissueqtyupdate`,
          {
            id: values.id,
            value: values.issue,
          }
        );
        message.success(update.data.message);
      } catch (error) {
        message.error(error.response.data.message);
      }
    } else {
      message.info("Tnx Qty Not Changed");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // delete tnx line item
  const handleDelete = async (item) => {
    try {
      const itemDelete = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tnx/dltissueline`,
        {
          id: item,
        }
      );
      setTbllist(tbllist.filter((a) => a.action !== item));
      message.warning(itemDelete.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      defaultSortOrder: "ascend",
    },
    {
      title: "Tnx ID",
      dataIndex: "tnxID",
      key: "tnxid",
    },
    {
      title: "Tnx by",
      dataIndex: "tnxby",
      key: "tnxby",
    },
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
      title: "Remarks",
      dataIndex: "rmk",
      key: "rmk",
    },
    {
      title: "Update By",
      dataIndex: "lastUpdateBy",
      key: "lastUpdateBy",
    },
    {
      title: "Update Time",
      dataIndex: "lastupdated",
      key: "lastupdated",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item, record) => (
        <>
          <Button
            icon={<EditTwoTone />}
            onClick={() =>
              (user.role === "admin" || user.role === "LM") &&
              handleEdit(record)
            }></Button>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => user.role === "admin" && handleDelete(item)}
            danger
            icon={<DeleteTwoTone twoToneColor="#eb2f96" />}></Button>
        </>
      ),
    },
  ];

  // Part Info
  useEffect(() => {
    async function getData() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/item/viewitemlist`
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          label: item.code + "_" + item.itemname,
          value: item._id,
        });
        setitemlist(tableData);
      });
    }
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tnx - Part Wise</title>
      </Helmet>
      {user.role === "admin" || user.role === "LM" ? (
        <>
          <div>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
              Part Wise Issue Details
            </Typography.Title>
            <Form
              layout="inline"
              name="rmtnxview"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                name="StartDate"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}>
                <DatePicker placeholder="Start Date" />
              </Form.Item>

              <Form.Item
                name="EndDate"
                rules={[
                  {
                    required: true,
                    message: "Please input!",
                  },
                ]}>
                <DatePicker placeholder="End Date" />
              </Form.Item>

              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please insert Part Code",
                  },
                ]}>
                <Select
                  showSearch
                  style={{ width: "250px" }}
                  placeholder="Find Your Item"
                  optionFilterProp="children"
                  // onSearch={onSearchCode}
                  filterOption={filterOption}
                  options={itemlist}
                />
              </Form.Item>

              <Form.Item
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please Select Tnx Type!",
                  },
                ]}>
                <Select
                  style={{ width: "100px" }}
                  placeholder="Tnx Type"
                  optionFilterProp="children"
                  options={[
                    { label: "Done", value: "done" },
                    { label: "Reject", value: "reject" },
                    { label: "Waiting", value: "waiting" },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}>
                  Find
                </Button>
              </Form.Item>
            </Form>
            <Divider>Transaction Details Table</Divider>
            <div>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by Model"
                variant="filled"
              />
              {/* <Table
                style={{ width: "100%" }}
                dataSource={
                  tbllist !== "" &&
                  tbllist.filter((item) =>
                    item.code.toLowerCase().includes(search.toLowerCase())
                  )
                }
                columns={columns}
              /> */}
              <Table
                columns={columns}
                dataSource={
                  tbllist !== "" &&
                  tbllist.filter((item) =>
                    item.lot.toLowerCase().includes(search.toLowerCase())
                  )
                }
                pagination={false}
                bordered
                summary={(pageData) => {
                  let totalIssue = 0;
                  pageData.forEach(({ qty }) => {
                    totalIssue += qty;
                  });

                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={8}>
                          <Text>Total:</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell>
                          <Text>{totalIssue}</Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
            </div>
          </div>
          <div>
            <Modal
              title="Edit Tnx Qty"
              open={isModalOpen}
              onCancel={handleCancel}
              footer="">
              <Form
                form={editForm}
                // layout="vertical"
                onFinish={onFinishEdit}
                // onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item hidden name="id"></Form.Item>
                <Form.Item
                  name="issue"
                  label="Issue Qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <InputNumber placeholder="Issue Qty" />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </div>{" "}
        </>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default PartWiseTnx;
