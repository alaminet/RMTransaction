import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Typography,
  Select,
  message,
} from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;
const { Title, Text } = Typography;

const ReceiveItem = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [loadings, setLoadings] = useState(false);
  const [lotList, setLotList] = useState();
  const [itemList, setItemList] = useState();
  const [locList, setLocList] = useState();
  const [wrongLoc, setWrongLoc] = useState();
  const [wrongCode, setWrongCode] = useState();
  const [tnxID, setTnxID] = useState();
  const [receiveform] = Form.useForm();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    // console.log("Success:", values.lot);
    setLoadings(true);
    const itemlistArr = [];
    const itemArr = [];
    const wrongLocArr = [];
    const wrongCodeArr = [];
    values.itemdetails.split("\n").map((item, i) => {
      itemlistArr.push(item.split("\t"));
    });
    itemlistArr?.map((list) => {
      const codeIDFilter = itemList?.find((c) => c.code === list[0]);
      const locFilter = locList?.find((l) => l.loc === list[3]);
      if (codeIDFilter == null) {
        wrongCodeArr.push(list[0]);
      } else if (locFilter == null) {
        wrongLocArr.push(list[3]);
      } else {
        const items = [
          {
            codeID: codeIDFilter.codeID,
            locID: locFilter.locID,
            qty: list[1],
            order: list[2],
          },
        ];
        itemArr.push(...items);
      }
    });
    setWrongLoc(wrongLocArr);
    setWrongCode(wrongCodeArr);
    if (wrongCodeArr.length > 0) {
      setWrongLoc(null);
      message.error(`${wrongCodeArr} is not define`);
    } else if (wrongLocArr.length > 0) {
      setWrongCode(null);
      message.error(`${wrongLocArr} is not define`);
    } else {
      setWrongLoc(null);
      setWrongCode(null);
      try {
        const data = await axios.post(
          "https://alt-wmsftl.onrender.com/v1/api/tnx/rmreceive",
          {
            date: moment(values.DatePicker.$d).format(),
            LC: values.LC,
            inv: values.invoice,
            BE: values.BE,
            PO: values.PO,
            lotID: values.lot,
            rmk: values.remarks,
            tnxby: user._id,
            receList: [...itemArr],
          }
        );
        message.success(`Receive Tnx ID: ${data.data.rmReceive.tnxID}`);
        setTnxID(data.data.rmReceive.tnxID);
        receiveform.resetFields();
        setLoadings(false);
      } catch (error) {
        setLoadings(false);
        message.warning(error.response.data.message);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoadings(false);
  };

  useEffect(() => {
    async function getLot() {
      const data = await axios.get("https://alt-wmsftl.onrender.com/v1/api/item/viewLot");
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ value: item._id, label: item.lot });
        setLotList(tableData);
      });
    }
    async function getItem() {
      const data = await axios.get(
        "https://alt-wmsftl.onrender.com/v1/api/item/viewitemlist"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ codeID: item._id, code: item.code });
        setItemList(tableData);
      });
    }
    async function getLoc() {
      const data = await axios.get(
        "https://alt-wmsftl.onrender.com/v1/api/item/viewlocation"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ locID: item._id, loc: item.loc });
        setLocList(tableData);
      });
    }
    getLoc();
    getLot();
    getItem();
  }, []);

  return (
    <>
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          <Title style={{ textAlign: "center" }}>Material Receive Form</Title>
          {tnxID && (
            <Text type="success">{`Your Receive Tnx ID: ${tnxID}`}</Text>
          )}
          <Form
            form={receiveform}
            name="receive"
            style={{
              minWidth: 700,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Flex gap={16} justify="space-between">
              <Form.Item
                style={{ width: "30%" }}
                name="DatePicker"
                rules={[
                  {
                    required: true,
                    message: "Receive Date Required!",
                  },
                ]}>
                <DatePicker placeholder="Receive Date" format={"DD-MMM-YY"} />
              </Form.Item>
              <Form.Item style={{ width: "30%" }} name="LC">
                <Input type="text" placeholder="LC No." />
              </Form.Item>
              <Form.Item style={{ width: "30%" }} name="invoice">
                <Input type="text" placeholder="Invoice No." />
              </Form.Item>
            </Flex>
            <Flex gap={16} justify="space-between">
              <Form.Item style={{ width: "30%" }} name="BE">
                <Input type="text" placeholder="B/E No." />
              </Form.Item>
              <Form.Item style={{ width: "30%" }} name="PO">
                <Input type="text" placeholder="PO No." />
              </Form.Item>
              <Form.Item
                style={{ width: "30%" }}
                name="lot"
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
            </Flex>
            <Form.Item
              name="itemdetails"
              rules={[
                {
                  required: true,
                  message: "Part Code,Receive Qty & Order No. paste from XL",
                },
              ]}>
              <TextArea
                rows={8}
                placeholder="Part Code, Qty, Order, Location paste from XL"
              />
            </Form.Item>

            <Form.Item name="remarks">
              <Input placeholder="Remarks" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loadings}
                disabled={loadings}
                type="primary"
                htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {wrongLoc && (
            <Text type="danger">{`${wrongLoc} location is not define`}</Text>
          )}
          <br />
          {wrongCode && (
            <Text type="danger">{`${wrongCode} Code is not define`}</Text>
          )}
        </div>
      ) : (
        <p>Your are not allowed to view, Please Contact your admin</p>
      )}
    </>
  );
};
export default ReceiveItem;
