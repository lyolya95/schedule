import React from 'react';
import { Input, InputNumber, Form, DatePicker, Select, Tag } from 'antd';
import 'antd/dist/antd.css';
import './Tables.scss';
import { EditableCellProps } from './TableSchedule.model';
import { types } from '../utilities/switcher';

const { Option } = Select;

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
  switch (dataIndex) {
    case 'score':
      inputNode = <InputNumber />;
      break;
    case 'dateTime':
      inputNode = <DatePicker autoFocus={true} allowClear={false} style={{ minWidth: 150 }} />;
      break;
    case 'type':
      const options = types.map((item:any) => {
       return ( <Option value={item.type}>
                <Tag key={item.type} color={item.color}>
                    {item.type}
                </Tag>
              </Option>
              );
      });
      inputNode = (
        <Select defaultValue="lime" style={{ width: 200 }}>
          {options}
        </Select>
      );
      break;
    default:
      inputNode = <Input />;
      break;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={inputType === 'dateTime' ? 'date-picker' : dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: false, // Добавление проверки формы конкретной ячейки dataIndex
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
