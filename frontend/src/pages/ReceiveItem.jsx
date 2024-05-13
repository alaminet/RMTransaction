import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";

const ReceiveItem = () => {
  const [addForm] = Form.useForm();
  const nameValue = Form.useWatch("name", addForm);
  const [partList, setPartList] = useState();
  const [partName, setPartName] = useState();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const listCng = (e) => {
    const codename = partList.find((f) => f.value == e);
    setPartName(codename.name);
  };
  // Form Handle
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // get Part info
  useEffect(() => {
    async function getPart() {
      const data = await axios.get(
        "http://localhost:8000/v1/api/item/viewitemlist"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({
          value: item._id,
          label: item.code,
          name: item.itemname,
        });
        setPartList(tableData);
      });
    }
    getPart();
  }, []);
  return (
    <>
      <Form
        form={addForm}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="code" label="Part Code">
          <Select
            showSearch
            placeholder="Select Part Code"
            optionFilterProp="children"
            filterOption={filterOption}
            options={partList}
            onChange={listCng}
          />
        </Form.Item>
        <Form.Item>
          <p>{partName}</p>
          {/* <Input
            name="name"
            defaultValue={Form.useWatch("code", addForm)}
            onChange={(e) => console.log(e.target.value)}
          /> */}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReceiveItem;
