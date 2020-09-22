/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { TableSchedule } from './TableSchedule';
import './Tables.scss';
import { Form } from 'antd';
export const TableScheduleContainer = (props: any) => {
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
  } = props;
  const userColumnsName = isMentorStatus ? columnsName.filter((item: string) => item !== 'combineScore') : columnsName;
  const columnsNameMap = userColumnsName.map((n: string) => ({ value: n }));
  // ___________________________________

  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(''); // храним какое поле(строку таблыцы) сейчас редактируем
  const isEditing = (record: any) => record.id === editingId; // указываем (true/false) какое поле сейчас находится в формате редактирования
  const [isLoading, setIsLoading] = useState(false);
  //Edit
  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    //(при редактировании) заполняет поля input в форме значениями, что хранились ранее
    setEditingId(record.id); // указывает какая из строк сейчас редактируется
  };
  //Cancel
  const cancel = () => {
    setEditingId('');
  };
  //Add
  const add = async () => {
    setIsLoading(true);
    debugger;
    const newId = await addDataEvent({});
    await getDataEvent();
    setIsLoading(false);
    edit(newId.data);
  };
  //Remove
  const remove = async (id: React.Key) => {
    setIsLoading(true);

    await deleteDataEvent(id);
    await getDataEvent();
    setIsLoading(false);
  };
  //Save
  const save = async (id: React.Key) => {
    debugger;
    setIsLoading(true);
    try {
      const row = (await form.validateFields()) as any; // хранятся все данные формы (input'ов) из одной строки таблицы (дата, урок, адрес, задание)
      let organizer = '';
      if (row.organizer instanceof Array) {
        organizer = row.organizer.join(',');
      }
      const newData = [...data]; // хранятся все данные всех строк таблиц (дата, урок, адрес, задание)
      const index = newData.find((item) => id === item.id).id; // Указывает индекс массива пришедших данных, какой из них сейчас находится под редактированием
      if (index.length === 20) {
        const item = newData.find((item) => index === item.id); // хранится строка с данными (вся: дата, время, название) которая сейчас будет редактироваться
        // if (row['date-picker']) {
        //   // ant <DatePicker /> для него зарезервированно имя date-picker, мы читаем с формы только date, по этому перевожу если такая найдется
        //   const selectDate = row['date-picker']._d.toISOString();
        //   item.dateTime = `${selectDate.slice(0, 4)}-${selectDate.slice(5, 7)}-${selectDate.slice(8, 10)} ${selectDate.slice(
        //     11,
        //     16
        //   )}`;
        //   //('2020-09-11T19:24:01.734Z');
        // }
        const indexElement = newData.findIndex((n) => index === n.id);
        newData.splice(indexElement, 1, {
          //заменяем в массиве элемент под номером index (точнее его сначала удаляем потом добавляем ...item, ...row) который пришел с данными (всеми данными таблицы всех строк проиндексированные)
          ...item, // что было изначально
          ...row, // если что то поменялось то тут мы перезатрем что было в ...item,
          organizer,
        });
        // все сохранения изменения что мы сделали при помощи splice "сэтаем" в originData (наши данные) которые хронятся уже в data
        await putDataEvent(index, newData[indexElement]);
        setEditingId(''); // указываем (устанавливаем) что в режиме редактирования ни какое поле сейчас не учавствует
      } else {
        // (своеобразная обработка ошибки) если каким то образом редактируем элемент массива index <= -1, то ошибка не падает но ни один из элементов не будет перезатерт всё сохраняю
        newData.push(row);
        setEditingId('');
      }
    } catch (errInfo) {
      // обработка ошибки если нажали на кнопку Save, что то пошло не так, то смотреть, что именно в консоль
      console.log('Validate Failed:', errInfo); // вывод ошибки в консоль при сохранении
    }
    setIsLoading(false);
  };
  //_____________________________________
  //создал контейнер для поднятия состояния таких как columnsName на верхний уровень, для того что бы он был доступен и таблице и селектуОтображения
  const [mapsColumnsName, setMapColumnsName] = useState([]);
  const defaultColumns = userColumnsName;
  const tagRender = (props: any) => {
    const { label, closable, onClose } = props;
    //то как отображаются списки с отображаемымы колонками
    //  {toUpperCase(label)}
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
