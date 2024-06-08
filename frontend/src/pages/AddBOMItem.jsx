import React, { useEffect, useState } from "react";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Typography } from "antd";
import { useSelector } from "react-redux";
const { Title } = Typography;

const AddBOMItem = () => {
  const [addbomitem] = Form.useForm();
  const user = useSelector((user) => user.loginSlice.login);
  const [loadings, setLoadings] = useState(false);
  const [lotList, setLotList] = useState();
  const [partList, setPartList] = useState();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // form submission
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      const data = await axios.put(
        "http://localhost:8000/v1/api/item/additembom",
        {
          lot: values.lot,
          itemlist: [...values.itemlist],
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // get lot info
  useEffect(() => {
    async function getLot() {
      const data = await axios.get(
        "http://localhost:8000/v1/api/item/viewLot"
      );
      const tableData = [];
      data?.data?.map((item, i) => {
        tableData.push({ value: item._id, label: item.lot });
        setLotList(tableData);
      });
    }
    getLot();
  }, []);
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
      {user.role === "admin" || user.role === "LM" ? (
        <div>
          <Typography style={{ textAlign: "center" }}>
            <Title level={2}>Add Item on Existing BOM</Title>
          </Typography>
          <Form
            form={addbomitem}
            name="additembom"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="lot"
              rules={[
                {
                  required: true,
                  message: "Please Select exact BOM!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a BOM"
                optionFilterProp="children"
                filterOption={filterOption}
                options={lotList}
              />
            </Form.Item>
            <Form.Item>
              <Form.List name="itemlist">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          // style={{ width: "150px" }}
                          name={[name, "codeID"]}
                          rules={[
                            {
                              required: true,
                              message: "Part Code Required",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select Part Code"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={partList}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "qty"]}
                          rules={[
                            {
                              required: true,
                              message: "BOM Qty Required",
                            },
                          ]}
                        >
                          <Input placeholder="BOM Qty" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Items
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadings}
                disabled={loadings}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <p>You are not allowed, please contact with admin</p>
      )}
    </>
  );
};

export default AddBOMItem;
