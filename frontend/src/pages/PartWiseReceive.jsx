import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  message,
  Flex,
  Tooltip,
} from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const PartWiseReceive = () => {
  const { Text } = Typography;
  const user = useSelector((user) => user.loginSlice.login);
  const [editForm] = Form.useForm();
  const [editItem, setEditItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findpartdlts] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tbllist, setTbllist] = useState([]);
  const [itemlist, setitemlist] = useState([]);

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // form controll
  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoading(true);
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tnx/partstock`,
        {
          code: values.code.toUpperCase().trim(),
        }
      );
      //   console.log(data?.data.receive);
      const recArr = [];
      let y = 1;
      data?.data.receive.map((receive, i) => {
        receive.receList.map((reclist, j) => {
          if (reclist.codeID == data.data.itemMatch._id) {
            recArr.push({
              sl: y++,
              recDate: moment(receive?.date).format("DD-MMM-YY"),
              tnxID: receive?.tnxID,
              code: data?.data?.itemMatch?.code,
              name: data?.data?.itemMatch?.itemname,
              loc: reclist?.locID?.loc,
              lot: receive?.lotID?.lot,
              recqty: reclist?.qty,
              issqty: reclist?.issue,
              onhand: reclist?.qty - reclist?.issue,
              action: reclist,
            });
          }
          setTbllist(recArr);
        });
      });
      setLoading(false);
      //   console.log(tbllist);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }

    // findpartdlts.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  // edit table data
  const handleEdit = (values) => {
    // console.log(values);
    setIsModalOpen(true);
    setEditItem(values);
    editForm.setFieldsValue({
      id: values._id,
      loc: values.locID.loc,
      issue: values.issue,
      qty: values.qty,
    });
  };
  const onFinishEdit = async (values) => {
    // console.log(editItem);
    // console.log(values);
    setLoading(true);
    if (editItem.locID.loc !== values.loc && editItem.issue !== values.issue) {
      message.warning("Single Edit can be done");
    } else {
      if (editItem.locID.loc !== values.loc) {
        try {
          const update = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/api/tnx/receiveupdate`,
            {
              id: values.id,
              field: "locID",
              value: values.loc,
            }
          );
          message.success(update.data.message);
          setLoading(false);
          setIsModalOpen(false);
        } catch (error) {
          setLoading(false);
          message.error(error.response.data.message);
          // console.log(error.response.data.message);
        }
      }
      if (editItem.issue !== values.issue) {
        try {
          const update = await axios.post(
            `${import.meta.env.VITE_API_URL}/v1/api/tnx/receiveupdate`,
            {
              id: values.id,
              field: "issue",
              value: values.issue,
            }
          );
          message.success(update.data.message);
          setLoading(false);
          setIsModalOpen(false);
        } catch (error) {
          setLoading(false);
          message.error(error.response.data.message);
          // console.log(error.response.data.message);
        }
      }
    }
  };
  const handleCancel = () => {
    setLoading(false);
    setIsModalOpen(false);
  };

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
          value: item.code,
        });
        setitemlist(tableData);
      });
    }
    getData();
  }, []);

  // table arrangment
  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Received Date",
      dataIndex: "recDate",
      key: "recDate",
    },
    {
      title: "Tnx ID",
      dataIndex: "tnxID",
      key: "tnxID",
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
    },
    {
      title: "Issue Qty",
      dataIndex: "issqty",
      key: "issqty",
    },
    {
      title: "On-Hand Qty",
      dataIndex: "onhand",
      key: "onhand",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (item, record) =>
        (user.role === "admin" || user.role === "LM") && (
          <>
            <Flex gap={4}>
              <Tooltip title="Edit">
                <Button
                  onClick={() => handleEdit(item)}
                  icon={<EditTwoTone />}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  // onClick={() => handleDelete(record)}
                  icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
                />
              </Tooltip>
            </Flex>
          </>
        ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Receive - Part wsie</title>
      </Helmet>
      <div>
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Part Wise Receive Details
        </Typography.Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form
            form={findpartdlts}
            name="partdlts"
            layout="inline"
            style={{
              minWidth: 400,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Part Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please insert Part Code",
                },
              ]}>
              <Select
                style={{
                  width: 500,
                }}
                showSearch
                placeholder="Find Your Item"
                optionFilterProp="children"
                // onSearch={onSearchCode}
                filterOption={filterOption}
                options={itemlist}
              />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                disabled={loading}
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
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by Model"
                variant="filled"
              />
              {/* <Table
                style={{ width: "100%" }}
                dataSource={tbllist}
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
                        <Table.Summary.Cell colSpan={7}>
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
        <div>
          <Modal
            title="Edit Category"
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
                name="loc"
                label="Location"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input placeholder="Location" />
              </Form.Item>
              <Form.Item
                name="qty"
                label="Rec. Qty"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <InputNumber disabled placeholder="Receive Qty" />
              </Form.Item>
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
                  <Button
                    loading={loading}
                    disabled={loading}
                    type="primary"
                    htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
};
export default PartWiseReceive;
