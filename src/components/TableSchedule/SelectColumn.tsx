import React from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { columnsName } from './../../mocks/tableColumnNames';

export const options = columnsName;

export const tagRender = (props: any) => {
  const { label, title, closable, onClose } = props;

  return (
    <Tag color={title} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
};
