import React from 'react';
import { Input, InputNumber, Form, DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import './Tables.scss';
import { EditableCellProps } from './TableSchedule.model';
const { Option, OptGroup } = Select;

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
    case 'date':
      inputNode = <DatePicker autoFocus={true} allowClear={false} style={{ minWidth: 150 }} />;
      break;
    case 'type':
      inputNode = (
        <Select defaultValue="lime" style={{ width: 200 }}>
          <OptGroup label="blue">
            <Option value="live">live</Option>
            <Option value="youtube live">youtube live</Option>
            <Option value="self education">self education</Option>
            <Option value="html/css academy">html/css academy</Option>
          </OptGroup>
          <OptGroup label="magenta">
            <Option value="deadline">deadline</Option>
          </OptGroup>
          <OptGroup label="green">
            <Option value="выдача таска">выдача таска</Option>
            <Option value="codewars">codewars</Option>
            <Option value="CodeJam">CodeJam</Option>
            <Option value="js task">js task</Option>
            <Option value="html task">html task</Option>
            <Option value="task">task</Option>
          </OptGroup>
          <OptGroup label="geekblue">
            <Option value="test">test</Option>
            <Option value="final test">final test</Option>
          </OptGroup>
          <OptGroup label="purple">
            <Option value="cross-check">cross-check</Option>
            <Option value="markdown">markdown</Option>
            <Option value="html">html</Option>
          </OptGroup>
          <OptGroup label="gold">
            <Option value="регистрация">регистрация</Option>
            <Option value="митап">митап</Option>
          </OptGroup>
          <OptGroup label="volcano">
            <Option value="stage-interview">stage-interview</Option>
            <Option value="interview">interview</Option>
          </OptGroup>
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
          name={inputType === 'date' ? 'date-picker' : dataIndex}
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
