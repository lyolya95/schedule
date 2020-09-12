import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Select, Tag } from 'antd';
// import { columnsName } from './../../mocks/tableColumnNames';

const options = [
  { value: 'date' },
  { value: 'time' },
  { value: 'place' },
  { value: 'name' },
  { value: 'organizer' },
  { value: 'url' },
  { value: 'task' },
  { value: 'materials' },
  { value: 'result' },
  { value: 'comment' },
  { value: 'score' },
  { value: 'timeToComplete' },
];

export let columnsQwes: any[];
const selectInputChange = (value: any) => {
  // получаем значение с поля выбора столбцов
  columnsQwes = value.map((n: any) => ({ title: n[0].toUpperCase() + n.slice(1), dataIndex: n, editable: true }));
};
const tagRender = (props: any) => {
  const { label, closable, onClose } = props;

  return (
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3, fontSize: 10 }}>
      {label}
    </Tag>
  );
};

export const SelectColumnsInput = () => {
  const defaultValue = ['date', 'organizer', 'time', 'name', 'task', 'score'];
  useEffect(() => {
    selectInputChange(defaultValue);
  }, [defaultValue]);
  return (
    <Select
      mode="multiple"
      showArrow
      tagRender={tagRender}
      defaultValue={defaultValue}
      style={{ width: '25%', margin: '0 0 10px 70%' }}
      options={options}
      onChange={selectInputChange}
    />
  );
};
