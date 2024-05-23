import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const { TextArea } = Input;

const AddStation = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [addStationForm] = Form.useForm();
  const [stationList, setStationList] = useState();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const itemlistArr = [];
    const itemArr = [];
    values.stationlist
      ?.trim()
      .split("\n")
      .map((item, i) => {
        itemlistArr.push(item);
      });

    itemlistArr?.map((list, j) => {
      if (stationList?.find((s) => s.station === list)) {
        console.log(list);
      } else {
        const items = [{ station: list }];
        itemArr.push(...items);
      }
    });
    try {
      const data = await axios.post(
        "http://wms-ftl.onrender.com/v1/api/item/addstation",
        {
          itemlist: [...itemArr],
        }
      );
      console.log(data);
      message.success(data.data.message);
    } catch (error) {
      console.log(error.response.message);
    }
    addStationForm.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // view location list
  useEffect(() => {
    async function getStation() {
      const data = await axios.get(
        "http://wms-ftl.onrender.com/v1/api/item/viewstation"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ stationID: item._id, station: item.station });
        setStationList(tableData);
      });
    }
    getStation();
  }, [onFinish]);
  return (
    <>
      {user.role === "admin" && (
        <div>
          <Form
            form={addStationForm}
            name="addlot"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: 700,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Station List"
              name="stationlist"
              rules={[
                {
                  required: true,
                  message: "Please input Location paste from XL",
                },
              ]}>
              <TextArea rows={4} placeholder="ex: DOOR" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button type="primary" htmlType="submit">
                Add Station
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddStation;
