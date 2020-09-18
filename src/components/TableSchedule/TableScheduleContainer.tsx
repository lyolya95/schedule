/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { TableSchedule } from './TableSchedule';
import './Tables.scss';

export const TableScheduleContainer = (props: any) => {
  const optionsKeyOfEvents = Object.keys(props.data[0]).map((n) => ({
    // вытаскивает все ключи для записи их в заголовок колонок и для функции скрытия и отображения колонок
    value: n,
  }));
  const toUpperCase = (value: string) => value[0].toUpperCase() + value.slice(1);
  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    //то как отображаются списки с отображаемымы колонками
    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3, fontSize: 10 }}>
        {toUpperCase(label)}
      </Tag>
    );
  };
  //создал контейнер для поднятия состояния таких как columnsName на верхний уровень, для того что бы он был доступен и таблице и селектуОтображения
  const [columnsName, setColumnsName] = useState([]);

  const defaultColumns = ['dateTime', 'organizer', 'time', 'name', 'task', 'score'];
  const changeColumnsSelect = (value: any) => {
    const mapColumns = value.map((n: any) => ({ title: toUpperCase(n), dataIndex: n, editable: true }));
    setColumnsName(mapColumns);
  };

  useEffect(() => {
    const mapColumns: any = defaultColumns.map((n: any) => ({
      title: toUpperCase(n),
      dataIndex: n,
      editable: true,
    }));
    setColumnsName(mapColumns);
  }, []);

  return (
    <TableSchedule
      columnsName={columnsName}
      tagRender={tagRender}
      defaultColumns={defaultColumns}
      optionsKeyOfEvents={optionsKeyOfEvents}
      changeColumnsSelect={changeColumnsSelect}
      data={props.data}
    />
  );
};
