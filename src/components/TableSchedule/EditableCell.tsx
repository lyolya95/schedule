import React from "react";
import { Input, InputNumber, Form, DatePicker } from "antd";
import "antd/dist/antd.css";
import "./Tables.scss";
import { EditableCellProps } from "./TableSchedule.model";

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case "number":
      inputNode = <InputNumber />;
      break;
    case "date":
      inputNode = <DatePicker />;
      break;
    default:
      inputNode = <Input />;
      break;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={inputType === "date" ? "date-picker" : dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
