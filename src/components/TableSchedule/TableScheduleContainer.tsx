/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { TableSchedule } from './TableSchedule';
import './Tables.scss';
import { Form } from 'antd';
import { dateAndTimeFormat } from '../utilities';

const TableScheduleContainer = (props: any) => {
  const {
    columnsName,
    notEditableColumns,
    data,
    isMentorStatus,
    ratingVotes,
    putDataEvent,
    organizers,
    getDataEvent,
    addDataEvent,
    deleteDataEvent,
    initialEventData,
  } = props;
  const userColumnsName = isMentorStatus ? columnsName.filter((item: string) => item !== 'combineScore') : columnsName;
  const columnsNameMap = userColumnsName.map((n: string) => ({ value: n }));

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');
  const isEditing = (record: any) => record.id === editingId;
  const [isLoading, setIsLoading] = useState(false);
  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };
  const cancel = () => {
    setEditingId('');
  };
  const add = async () => {
    setIsLoading(true);
    const newId = await addDataEvent(initialEventData);
    await getDataEvent();
    setIsLoading(false);
    edit(newId.data);
  };
  const remove = async (id: React.Key) => {
    setIsLoading(true);
    await deleteDataEvent(id);
    await getDataEvent();
    setIsLoading(false);
  };
  const save = async (id: React.Key) => {
    setIsLoading(true);
    const row = (await form.validateFields()) as any;
    let organizer: string | undefined;
    if (row.organizer instanceof Array) {
      organizer = row.organizer.join(',');
    }
    const newData = [...data];
    const item = newData.find((item) => id === item.id);
    !!row['date-picker'] && (item.dateTime = row['date-picker'].format(dateAndTimeFormat));
    delete row['date-picker'];
    const indexElement = newData.findIndex((n) => item.id === n.id);
    newData.splice(indexElement, 1, {
      ...item,
      ...row,
      organizer,
    });
    await putDataEvent(item.id, newData[indexElement]);
    setEditingId('');
    setIsLoading(false);
  };
  const [mapsColumnsName, setMapColumnsName] = useState([]);
  const defaultColumns = userColumnsName;
  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3, fontSize: 10 }}>
        {label}
      </Tag>
    );
  };

  const changeColumnsSelect = (value: any) => {
    const mapColumns = value.map((n: any) => ({
      title: n,
      dataIndex: n,
      editable: notEditableColumns.findIndex((item: string) => item === n) === -1 ? true : false,
    }));
    //({ title: toUpperCase(n), dataIndex: n, editable: true }));
    setMapColumnsName(mapColumns);
  };

  //@TOdo не убирается после изменения isMentorStatus поле Score в выбранных select

  useEffect(() => {
    const userColumns = isMentorStatus ? mapsColumnsName.filter((item: any) => item.title !== 'combineScore') : mapsColumnsName;
    setMapColumnsName(userColumns);
  }, [isMentorStatus]);

  useEffect(() => {
    const mapColumns: any = defaultColumns.map((n: any) => ({
      //title: toUpperCase(n),
      title: n,
      dataIndex: n,
      editable: notEditableColumns.findIndex((item: string) => item === n) === -1 ? true : false,
    }));
    setMapColumnsName(mapColumns);
  }, []);

  return (
    <TableSchedule
      columnsName={mapsColumnsName}
      tagRender={tagRender}
      defaultColumns={defaultColumns}
      optionsKeyOfEvents={columnsNameMap}
      changeColumnsSelect={changeColumnsSelect}
      data={data}
      isMentorStatus={isMentorStatus}
      ratingVotes={ratingVotes}
      organizers={organizers}
      form={form}
      editingId={editingId}
      isEditing={isEditing}
      isLoading={isLoading}
      edit={edit}
      cancel={cancel}
      add={add}
      remove={remove}
      save={save}
    />
  );
};

export { TableScheduleContainer };
