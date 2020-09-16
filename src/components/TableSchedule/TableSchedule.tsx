import React, { useState } from 'react';
import { Table, Popconfirm, Form, Button, Tag, Modal, Select } from 'antd';
import 'antd/dist/antd.css';
import { IAgeMap } from './TableSchedule.model';
import EditableCell from './EditableCell';
import { DeleteTwoTone, EditTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import TaskPage from '../TaskPage';
import { switchTypeToColor } from '../utilities/switcher';
import { MentorFilters } from '../MentorFilters/MentorFilters';

export const TableSchedule = (props: any) => {
  //временно меняем посмотреть ментора - ставим true, посмотреть студента ставим false
  const isMentor = true;
  const [form] = Form.useForm(); // хранится общий объект для формы ant
  const [data, setData] = useState(props.data); // хранятся все данные таблиц которые приходят
  const [editingKey, setEditingKey] = useState(''); // храним какое поле(строку таблыцы) сейчас редактируем
  const isEditing = (record: any) => record.key === editingKey; // указываем (true/false) какое поле сейчас находится в формате редактирования
  const [visibleModal, setVisibleModal] = useState(false);
  const [clickingRow, setClickingRow] = useState<any | null>();

  const edit = (record: any) => {
    //при нажатии на кнопку edit
    form.setFieldsValue({ ...record }); //(при редактировании) заполняет поля input в форме значениями, что хранились ранее
    setEditingKey(record.key); // указывает какая из строк сейчас редактируется
  };
  const add = () => {
    //!!! есть баг нужно првильно придумать создание нового ключа что бы не указывались которые сейчас уже имеются
    const addData = { ...data[0] }; // создаем копию! данных одной строчки
    addData.key = String(data.length + 1); // временное решение создания нового уникального ключа
    const newData = [...data, addData]; // хранятся все данные всех строк таблиц (дата, урок, адрес, задание) и наша новая строчка добавляется в конце
    setData(newData); // все сохранения изменения что мы сделали
    edit(addData); // запускаем редактирование
  };
  const remove = (key: React.Key) => {
    // при нажатии кнопки remove
    const newData = [...data]; // хранятся все данные всех строк таблиц (дата, урок, адрес, задание)
    const index = newData.findIndex((item) => key === item.key); // Указывает индекс массива пришедших данных
    newData.splice(index, 1); // удаляем строку под индексем index одну строку 1
    setData(newData); // все сохранения изменения что мы сделали при помощи splice "сэтаем" в originData (наши данные) которые хронятся уже в data
  };
  const cancel = () => {
    //при нажатии на кнопку edit
    setEditingKey(''); // отменяет редактирование
  };

  const save = async (key: React.Key) => {
    // при нажатии кнопки сохранить
    try {
      const row = (await form.validateFields()) as any; // хранятся все данные формы (input'ов) из одной строки таблицы (дата, урок, адрес, задание)
      const newData = [...data]; // хранятся все данные всех строк таблиц (дата, урок, адрес, задание)
      const index = newData.findIndex((item) => key === item.key); // Указывает индекс массива пришедших данных, какой из них сейчас находится под редактированием

      if (index > -1) {
        const item = newData[index]; // хранится строка с данными (вся: дата, время, название) которая сейчас будет редактироваться
        if (row['date-picker']) {
          // ant <DatePicker /> для него зарезервированно имя date-picker, мы читаем с формы только date, по этому перевожу если такая найдется
          const selectDate = row['date-picker']._d.toISOString();
          item.dateTime = `${selectDate.slice(8, 10)}-${selectDate.slice(5, 7)}-${selectDate.slice(0, 4)}`;

          //('2020-09-11T19:24:01.734Z');
        }
        newData.splice(index, 1, {
          //заменяем в массиве элемент под номером index (точнее его сначала удаляем потом добавляем ...item, ...row) который пришел с данными (всеми данными таблицы всех строк проиндексированные)
          ...item, // что было изначально
          ...row, // если что то поменялось то тут мы перезатрем что было в ...item,
        });
        setData(newData); // все сохранения изменения что мы сделали при помощи splice "сэтаем" в originData (наши данные) которые хронятся уже в data
        setEditingKey(''); // указываем (устанавливаем) что в режиме редактирования ни какое поле сейчас не учавствует
      } else {
        // (своеобразная обработка ошибки) если каким то образом редактируем элемент массива index <= -1, то ошибка не падает но ни один из элементов не будет перезатерт всё сохраняю
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      // обработка ошибки если нажали на кнопку Save, что то пошло не так, то смотреть, что именно в консоль
      console.log('Validate Failed:', errInfo); // вывод ошибки в консоль при сохранении
    }
  };

  const columns: IAgeMap[] = [
    // Хронятся данные названия столбцов (title, dataIndex) и то можно ли их редактировать,
    // Данные с названием столбцов импортируется из columnsName.tsx
    ...props.columnsName,
    //...columnsName,
    {
      title: 'Type',
      dataIndex: 'type',
      editable: true,
      render: (_: any, record: any) => {
        return (
          <Tag key={record.type} color={switchTypeToColor(record.type)}>
            {record.type}
          </Tag>
        );
      },
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        // _ заглушка что бы брать record вторым параметром для render (первый парамент зарезервирован React)
        const editable = isEditing(record); // (render вызывается всякий раз как изменяется что то на странице, или создается новая строка с данными) каждый раз проверяем record (строка целиком, они приходят по порядку) пришла если с возможностью редактирования тогда показываем кнопки "Save" и "Cancel" иначе кнопку с "Edit"
        return editable ? (
          <span>
            <Button onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button>Cancel</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button ghost={true} disabled={editingKey !== ''} onClick={() => edit(record)} icon={<EditTwoTone />}></Button>
            <Button
              ghost={true}
              className="tableSchedule__button_remove"
              onClick={() => remove(record.key)}
              icon={<DeleteTwoTone twoToneColor="#eb2f96" />}
            ></Button>
          </>
        );
        //save отправим колбэк с ключем текущей строки что бы сохранить
        //cancel отправим колбэк с ключем текущей строки что бы отменить
        //Popconfirm от ant что бы спросить уверены или нет
        //disabled={editingKey !== ""} отключаем все кнопки Edit на других строках на других строках во время редактирования
        //edit отправим колбэк с данными изменяемой в данный момент строкой
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const isНandlingClickOnRow = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    let tagClassName = target.className !== '' && typeof target.className === 'string' ? target.className.split(' ')[0] : '';
    if (target.tagName === 'TD' || (target.tagName === 'SPAN' && tagClassName === 'ant-tag')) {
      return true;
    }
    return false;
  };

  const handleDoubleClickRow = (record: any, rowIndex: number | undefined, event: React.FormEvent<EventTarget>) => {
    if (isНandlingClickOnRow(event)) {
      setClickingRow(record);
      setVisibleModal(true);
    }
  };

  const handleClickRow = (record: any, rowIndex: number | undefined, event: React.FormEvent<EventTarget>) => {
    if (isНandlingClickOnRow(event)) {
      const ind = rowIndex ? rowIndex : 0;
      const selRow = document.getElementsByClassName('ant-table-tbody')[0].children[ind];
      const rowClassName = selRow.className;
      let newRowClassName;
      const classSel = ' ant-table-row-selected';
      if (rowClassName.indexOf(classSel) !== -1) {
        newRowClassName = rowClassName.replace(classSel, '');
      } else {
        newRowClassName = rowClassName + classSel;
      }
      selRow.className = newRowClassName;
    }
  };

  // Добавлена логика сортировки данных для таблицы
  //____________________________________________________________________________________________________________________
  const [filerFlags, setFilterFlags] = useState({});
  const [dates, setDates] = useState([]);

  const hasFilterFlag = (data: any, flags: any): boolean => {
    const keys = Object.keys(flags);
    if (keys.length === 0) {
      return true;
    }
    const keysToCheck: string[] = keys.filter((key: string) => flags[key].length > 0);
    const valueToCheck: string[] = keys.reduce((acc: any[], key: string) => [...acc, flags[key]], []).flat();
    for (const key of keysToCheck) {
      if (!valueToCheck.includes(data[key])) {
        return false;
      }
    }
    return true;
  };

  const isInDateRange = (date: any, dateRange: any): boolean => {
    if (dateRange.length === 0) {
      return true;
    }
    const compareDate = new Date(date);
    const firstDate = new Date(dateRange[0]);
    const lastDate = new Date(dateRange[1]);
    if (firstDate < compareDate && compareDate < lastDate) {
      return true;
    }
    return false;
  };

  const visibleData = data
    .filter((item: any) => hasFilterFlag(item, filerFlags))
    .filter((item: any) => isInDateRange(item.timestamp, dates));

  //____________________________________________________________________________________________________________________

  return (
    <Form form={form} component={false}>
      <Button
        className="tableSchedule__button_add"
        ghost={true}
        disabled={editingKey !== ''}
        onClick={() => add()}
        icon={<PlusCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px' }} />}
      ></Button>
      <Select
        mode="multiple"
        listItemHeight={10}
        size="small"
        showArrow
        bordered={false}
        maxTagCount={6}
        maxTagTextLength={6}
        tagRender={props.tagRender}
        defaultValue={props.defaultColumns}
        options={props.optionsKeyOfEvents}
        onChange={props.changeColumnsSelect}
        className="select-dropdown-columns"
      />
      <MentorFilters data={data} filterFlag={filerFlags} setFilterFlags={setFilterFlags} setDates={setDates} />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={visibleData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleClickRow(record, rowIndex, event);
            },
            onDoubleClick: (event) => {
              handleDoubleClickRow(record, rowIndex, event);
            }, // double click row
          };
        }}
      />
      {clickingRow ? (
        <Modal
          title={clickingRow.course}
          centered
          visible={visibleModal}
          footer={[
            <Button key="back" onClick={() => setVisibleModal(false)}>
              Return
            </Button>,
          ]}
          onCancel={() => setVisibleModal(false)}
          width={1000}
        >
          <TaskPage
            name={clickingRow.name}
            date={clickingRow.dateTime}
            type={clickingRow.type}
            organizer={clickingRow.organizer}
            taskContent={clickingRow.taskContent}
            isShowFeedback={clickingRow.isShowFeedback}
            isMentor={isMentor}
          />
        </Modal>
      ) : null}
    </Form>
  );
};
