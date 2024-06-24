import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
const RMIssue = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [stationlist, setStationlist] = useState([]);
  const [lotlist, setLotlist] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [itemFull, setItemFull] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [RMIssueform] = Form.useForm();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // Item list based on lot change
  const onChangeLot = async (e) => {
    if (e) {
      try {
        const data = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/api/tnx/lotrecview`,
          {
            lot: e,
          }
        );
        const itemData = [];
        const itemFullData = [];
        data?.data?.map((item, i) => {
          item?.receList.map((list, j) => {
            if (list.issue < list.qty) {
              itemData.push({
                value: list._id,
                label: `
                ${list.codeID.code} -
                ${list.locID.loc} - 
                ${list.qty - list.issue}${list.codeID.uom} - 
                ${list.codeID.itemname}`,
              });
              itemFullData.push({
                id: list._id,
                codeID: list.codeID._id,
              });
              setItemList(itemData);
              setItemFull(itemFullData);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Form submit
  const onFinish = async (values) => {
    // console.log(values);
    setLoadings(true);
    const issuelist = [];
    values.issueList.map((item, i) => {
      const matchItem = itemFull.find((f) => f.id === item.code);
      if (matchItem) {
        issuelist.push({
          lineID: matchItem.id,
          codeID: matchItem.codeID,
          qty: item.issueQty,
          rmk: item.remarks,
        });
      } else {
        console.log("not match");
      }
    });

    // console.log(moment(values.DatePicker.$d).format());
    try {
      const h = new Date().getHours();
      const m = new Date().getMinutes();
      const s = new Date().getSeconds();
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/tnx/rmissue`,
        {
          date: new Date(values.DatePicker.$d).setHours(h, m, s), //moment(values.DatePicker.$d).format()
          stationID: values.station,
          lotID: values.lot,
          tnxby: user._id,
          issueList: [...issuelist],
        }
      );
      setMsg(`Entry Done, Tnx ID: ${data.data.tnxID}`);
      setMsgType("success");
      setLoadings(false);
      RMIssueform.resetFields();
    } catch (error) {
      setLoadings(false);
      setMsg(error.response.data.error);
      setMsgType("error");
    }
  };
  useEffect(() => {
    // get station list
    async function getStation() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/item/viewstation`
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          label: item.station,
          value: item._id,
        });
        setStationlist(tableData);
      });
    }
    // get lot list
    async function getLot() {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/v1/api/item/viewLot`
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          label: item.lot,
          value: item._id,
        });
        setLotlist(tableData);
      });
    }
    getLot();
    getStation();
  }, []);
  return (
    <>
      <Helmet>
        <title>Part Issue</title>
      </Helmet>
      <div>
        {msg && <Alert message={msg} type={msgType} showIcon closable />}
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          RAW Materials Movement Form
        </Typography.Title>
        <Form
          form={RMIssueform}
          variant="filled"
          onFinish={onFinish}
          name="RMIssue"
          style={
            {
              // maxWidth: 600,
            }
          }>
          <Row gutter={16}>
            <Col>
              <Form.Item
                name="DatePicker"
                rules={[
                  {
                    required: true,
                    message: "Issue Date Required!",
                  },
                ]}>
                <DatePicker placeholder="Issue Date" format={"DD-MMM-YY"} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="station"
                rules={[
                  {
                    required: true,
                    message: "Station Required!",
                  },
                ]}>
                <Select
                  placeholder="Station"
                  style={{
                    width: 120,
                  }}
                  showSearch
                  optionFilterProp="children"
                  // onChange={onChangeCode}
                  // onSearch={onSearchCode}
                  filterOption={filterOption}
                  options={stationlist}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="lot"
                rules={[
                  {
                    required: true,
                    message: "Lot Required!",
                  },
                ]}>
                <Select
                  placeholder="Lot/Order"
                  style={{
                    width: 150,
                  }}
                  showSearch
                  optionFilterProp="children"
                  onChange={onChangeLot}
                  // onSearch={onSearchCode}
                  filterOption={filterOption}
                  options={lotlist}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.List name="issueList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "code"]}
                      rules={[
                        {
                          required: true,
                          message: "Part Code Required",
                        },
                      ]}>
                      <Select
                        style={{
                          width: 500,
                        }}
                        showSearch
                        placeholder="Part Code ; Name ; Location"
                        optionFilterProp="children"
                        // onSearch={onSearchCode}
                        filterOption={filterOption}
                        options={itemList}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "issueQty"]}
                      rules={[
                        {
                          required: true,
                          message: "input Issue Qty!",
                        },
                      ]}>
                      <InputNumber placeholder="Issue Qty" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "remarks"]}>
                      <Input placeholder="Remarks" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings}
              disabled={loadings}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default RMIssue;
