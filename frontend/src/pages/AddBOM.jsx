import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;

const AddBOM = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [loadings, setLoadings] = useState(false);
  const [lotList, setLotList] = useState();
  const [itemList, setItemList] = useState();
  const [addbomform] = Form.useForm();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = async (values) => {
    // console.log("Success:", values);
    setLoadings(true);
    const itemlistArr = [];
    const itemArr = [];
    values.itemdetails.split("\n").map((item, i) => {
      itemlistArr.push(item.split("\t"));
    });
    itemlistArr?.map((list) => {
      const codeIDFilter = itemList.find((c) => c.code === list[0]);
      const items = [{ codeID: codeIDFilter.codeID, qty: list[1] }];
      itemArr.push(...items);
    });

    try {
      const data = await axios.post(
        "http://wms-ftl.onrender.com/v1/api/item/addbom",
        {
          lot: values.lot,
          itemlist: [...itemArr],
        }
      );
      console.log(data);
      setLoadings(false);
    } catch (error) {
      setLoadings(false);
      message.warning(error.response.data.message);
    }
    addbomform.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    async function getLot() {
      const data = await axios.get("http://localhost:8000/v1/api/item/viewLot");
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ value: item._id, label: item.lot });
        setLotList(tableData);
      });
    }
    async function getItem() {
      const data = await axios.get(
        "http://localhost:8000/v1/api/item/viewitemlist"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ codeID: item._id, code: item.code });
        setItemList(tableData);
      });
    }
    getLot();
    getItem();
  }, []);

  return (
    <>
      {user.role === "admin" && (
        <div>
          <Form
            form={addbomform}
            name="addbom"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: 700,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Lot Info"
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
            <Form.Item
              label="Item Details"
              name="itemdetails"
              rules={[
                {
                  required: true,
                  message: "Please input Code,Qty paste from XL",
                },
              ]}>
              <TextArea rows={4} placeholder="Code,Qty paste from XL" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button
                loading={loadings}
                disabled={loadings}
                type="primary"
                htmlType="submit">
                Add BOM
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddBOM;
