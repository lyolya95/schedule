/* eslint-disable jsx-a11y/anchor-is-valid */
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Divider, Form, Input, InputNumber, Select, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { dateAndTimeFormat } from '../utilities';
import './Tables.scss';
import { EditableCellProps } from './TableSchedule.model';

interface newTypesInterface {
  type: string;
  color: string;
  name?: string;
}

const { Option } = Select;
const EditableCell: React.FC<EditableCellProps> = React.memo((props) => {
  const { organizers, editing, dataIndex, title, inputType, record, index, children, types, ...restProps } = props;
  let inputNode;

  const temporarilyTypes = !types ? [] : types;
  const newTypes: {
    type: string;
    color: string;
    name?: string;
  }[] = temporarilyTypes.map((n: newTypesInterface) => {
    n.name = '';
    return n;
  });
  const [state, setState] = useState(newTypes);
  const [stateOne, setStateOne] = useState({ type: '', name: '', color: '' });

  const onNameChange = (event: any) => {
    setStateOne({
      type: event.target.value,
      name: event.target.value,
      color: 'default',
    });
  };
  const addItem = () => {
    setState([...state, stateOne]);
  };
  switch (dataIndex) {
    case 'score':
      inputNode = <InputNumber />;
      break;
    case 'dateTime':
      inputNode = (
        <DatePicker autoFocus={true} showTime format={dateAndTimeFormat} allowClear={false} style={{ minWidth: 150 }} />
      );
      break;
    case 'organizer':
      inputNode = (
        <Select mode="multiple" showArrow={true}>
          {organizers.map((n: any, index: number) => (
            <Option key={index} value={n.id}>
              {n.name}
            </Option>
          ))}
        </Select>
      );
      break;
    case 'type':
      inputNode = (
        <Select
          style={{ width: 240 }}
          placeholder="custom dropdown render"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                <Input style={{ flex: 'auto' }} onChange={onNameChange} />
                <a style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} onClick={addItem}>
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
        >
          {state.map((itemState: newTypesInterface) => (
            <Option value={itemState.type} key={itemState.type}>
              <Tag key={index} color={itemState.color}>
                {itemState.type}
              </Tag>
            </Option>
          ))}
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
              required: false,
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
});
export { EditableCell };
