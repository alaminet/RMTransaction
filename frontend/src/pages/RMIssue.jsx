import React, { useState } from "react";
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
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const RMIssue = () => {
  const user = useSelector((user) => user.loginSlice.login);
  const [loadings, setLoadings] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [RMIssueform] = Form.useForm();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // Form submit
  const onFinish = async (values) => {
    const issuelist = [];
    values.issueList.map((item, i) => {
      issuelist.push({
        code: item.code,
        qty: item.issueQty,
        loc: item.location,
        rmk: item.remarks,
      });
    });

    setLoadings(true);
    try {
      const data = await axios.post(
        "http://localhost:8000/v1/api/tnx/rmissue",
        {
          date: moment(values.DatePicker.$d).format(),
          station: values.station,
          model: values.lot.split("_")[0],
          lot: values.lot,
          tnxby: user.userID,
          issueList: [...issuelist],
        }
      );
      console.log(data.data);
      setLoadings(false);
      setMsg(`Entry Done, Tnx ID: ${data.data.tnxID}`);
      setMsgType("success");
      RMIssueform.resetFields();
    } catch (error) {
      setLoadings(false);
      setMsg(error.response.data.error);
      setMsgType("error");
    }
  };

  return (
    <>
      <div>
        {msg && <Alert message={msg} type={msgType} showIcon closable />}
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
                  options={[
                    {
                      value: "banmper",
                      label: "Bamper",
                    },
                    {
                      value: "trim1",
                      label: "Trim1",
                    },
                    {
                      value: "door",
                      label: "DOOR",
                    },
                    {
                      value: "final1",
                      label: "Final 1",
                    },
                  ]}
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
                  // onChange={onChangeCode}
                  // onSearch={onSearchCode}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "PS7i_Lot 17~18",
                      label: "PS7i_Lot 17~18",
                    },
                    {
                      value: "PS7i_Lot 13~16",
                      label: "PS7i_Lot 13~16",
                    },
                    {
                      value: "PS7i_Lot 13~14",
                      label: "PS7i_Lot 13~14",
                    },
                  ]}
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
                          width: 150,
                        }}
                        showSearch
                        placeholder="Part Code"
                        optionFilterProp="children"
                        // onChange={onChangeCode}
                        // onSearch={onSearchCode}
                        filterOption={filterOption}
                        options={[
                          {
                            value: "87810-BV700",
                            label: "87810-BV700",
                          },
                          {
                            value: "87820-BV700",
                            label: "87820-BV700",
                          },
                          {
                            value: "87820-BV700",
                            label: "87820-BV700",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "name"]}>
                      <Input disabled placeholder="Part Name" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "location"]}
                      rules={[
                        {
                          required: true,
                          message: "Location Required",
                        },
                      ]}>
                      <Select
                        style={{
                          width: 120,
                        }}
                        showSearch
                        placeholder="Location"
                        optionFilterProp="children"
                        //   onChange={onChangeCode}
                        //   onSearch={onSearchCode}
                        filterOption={filterOption}
                        options={[
                          {
                            value: "RM1:A01B",
                            label: "RM1:A01B",
                          },
                          {
                            value: "RM3:A01B",
                            label: "RM3:A01B",
                          },
                          {
                            value: "RM1:L01B",
                            label: "RM1:L01B",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "onHandQty"]}>
                      <InputNumber disabled placeholder="On_hanad Qty" />
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
