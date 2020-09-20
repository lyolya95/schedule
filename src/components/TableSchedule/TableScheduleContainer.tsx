/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { TableSchedule } from './TableSchedule';
import './Tables.scss';

export const TableScheduleContainer = (props: any) => {
  const columnsNameMap = props.columnsName.map((n: string) => ({ value: n }));

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


  const defaultColumns = ['dateTime', 'name', 'course', 'organizer', 'place', 'timeToComplete'];

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
      optionsKeyOfEvents={columnsNameMap}
      changeColumnsSelect={changeColumnsSelect}
      data={props.data}
      putDataEvent={props.putDataEvent}
      organizers={props.organizers}
    />
  );
};
