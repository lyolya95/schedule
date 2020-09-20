import { DeleteTwoTone, HighlightTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons/lib';
import { Button, Form, Modal, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { MentorFilters } from '../MentorFilters/MentorFilters';
import { TaskPageContainer } from '../TaskPage/TaskPage.container';
import { switchTypeToColor } from '../utilities/switcher';
import EditableCell from './EditableCell';
import { IAgeMap } from './TableSchedule.model';

export const TableSchedule = (props: any) => {
  const data = props.data; // хранятся все данные таблиц которые приходят

  // localStorage
  const course = JSON.parse(localStorage['course'] || null);
  const place = JSON.parse(localStorage['place'] || null);
  const type = JSON.parse(localStorage['tags'] || null);
  const datesLocalStorage = JSON.parse(localStorage['dates'] || null);

  // данные для фильтрации
  const [hiddenData, setHiddenData] = useState<Array<string>>([]); //скрытые пользователем
  const [filerFlags, setFilterFlags] = useState({ course, place, type }); //из блока фильтров ментора
  const [dates, setDates] = useState<Array<string>>(datesLocalStorage); //по датам

  const hasFilterFlag = (data: any, flags: any): boolean => {
    const keys = Object.keys(flags);
    if (keys.length === 0) {
      return true;
    }
    const keysToCheck: string[] = keys
      .filter((key: string) => flags[key] !== null)
      .filter((key: string) => flags[key].length > 0);
    if (keysToCheck.length === 0) {
      return true;
    }
    for (let key of keysToCheck) {
      if (data[key] === undefined) {
        return false;
      }
    }
    const valueToCheck: string[] = keysToCheck.map((key: string) => flags[key].map((value: string) => value.split(','))).flat(2);

    const haveAMatch = (arr1: string[], arr2: string[]): boolean => {
      for (let item of arr1) {
        if (arr2.includes(item)) {
          return true;
        }
      }
      return false;
    };

    for (const key of keysToCheck) {
      if (data[key].split(',').length > 1) {
        if (!haveAMatch(data[key].split(','), valueToCheck)) {
          return false;
        }
      } else {
        if (!valueToCheck.includes(data[key])) {
          return false;
        }
      }
    }
    return true;
  };

  const isInDateRange = (date: any, dateRange: any): boolean => {
    if (dateRange === null) {
      return true;
    }
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

  //временно меняем посмотреть ментора - ставим true, посмотреть студента ставим false
  const isMentor = true;
  const [form] = Form.useForm(); // хранится общий объект для формы ant
  const [editingId, setEditingId] = useState(''); // храним какое поле(строку таблыцы) сейчас редактируем
  const isEditing = (record: any) => record.id === editingId; // указываем (true/false) какое поле сейчас находится в формате редактирования

  const visibleData = data // формируем отображаемые данные для таблицы
    .filter((item: any) => hasFilterFlag(item, filerFlags))
    .filter((item: any) => isInDateRange(item.dateTime, dates))
    .filter((item: any) => !hiddenData.includes(item.key));

  const [visibleModal, setVisibleModal] = useState(false);
  const [clickingRow, setClickingRow] = useState<any | null>();

  const edit = (record: any) => {
    //при нажатии на кнопку edit
    form.setFieldsValue({ ...record });
    //(при редактировании) заполняет поля input в форме значениями, что хранились ранее
    setEditingId(record.id); // указывает какая из строк сейчас редактируется
  };

  const add = async () => {
    //!!! есть баг нужно првильно придумать создание нового ключа что бы не указывались которые сейчас уже имеются
    const addData = {
      id: '',
      name: 'string',
      course: 'string',
      dateTime: 'string',
      type: 'string',
      timeZone: 'string',
      organizer: 'string',
      descriptionUrl: 'string',
      timeToComplete: 'string',
      place: 'string',
      week: 123,
      maxScore: 123,
      taskContent: 'string',
      isShowFeedback: false,
    };

    //______________________________________________ генерация ключа
    let password: string = '';
    var symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789№?_';
    for (let i = 0; i < 20; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    addData.id = password;
    //_____________________________________________

    await props.addDataEvent(addData);
    await props.getDataEvent();
    edit(props.data[0]); // !!!Временное решение, сразу открывается редактирование первого в массиве данных елемента а нужно именно тот который равен id нового добавленного
  };
  const remove = async (id: React.Key) => {
    await props.deleteDataEvent(id);
    props.getDataEvent();
  };

  const cancel = () => {
    setEditingId('');
  };

  const save = async (id: React.Key) => {
    // при нажатии кнопки сохранить
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
        if (row['date-picker']) {
          // ant <DatePicker /> для него зарезервированно имя date-picker, мы читаем с формы только date, по этому перевожу если такая найдется
          //const selectDate = row['date-picker']._d.toISOString();
          // item.dateTime = `${selectDate.slice(8, 10)}-${selectDate.slice(5, 7)}-${selectDate.slice(0, 4)} ${}`;
          item.dateTime = '2020-09-01 23:45';
          //('2020-09-11T19:24:01.734Z');
        }
        const indexElement = newData.findIndex((n) => index === n.id);
        newData.splice(indexElement, 1, {
          //заменяем в массиве элемент под номером index (точнее его сначала удаляем потом добавляем ...item, ...row) который пришел с данными (всеми данными таблицы всех строк проиндексированные)
          ...item, // что было изначально
          ...row, // если что то поменялось то тут мы перезатрем что было в ...item,
          organizer,
        });
        // все сохранения изменения что мы сделали при помощи splice "сэтаем" в originData (наши данные) которые хронятся уже в data
        props.putDataEvent(index, newData[indexElement]);
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
      title: 'Edit',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        // _ заглушка что бы брать record вторым параметром для render (первый парамент зарезервирован React)
        const editable = isEditing(record); // (render вызывается всякий раз как изменяется что то на странице, или создается новая строка с данными) каждый раз проверяем record (строка целиком, они приходят по порядку) пришла если с возможностью редактирования тогда показываем кнопки "Save" и "Cancel" иначе кнопку с "Edit"
        return editable ? (
          <span>
            <Button onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </span>
        ) : (
          <span>
            <Button ghost={true} disabled={editingId !== ''} onClick={() => edit(record)} icon={<HighlightTwoTone />}></Button>
            <Button
              ghost={true}
              className="tableSchedule__button_remove"
              onClick={() => remove(record.id)}
              icon={<DeleteTwoTone />}
            ></Button>
          </span>
        );
        //save отправим колбэк с ключем текущей строки что бы сохранить
        //cancel отправим колбэк с ключем текущей строки что бы отменить
        //Popconfirm от ant что бы спросить уверены или нет
        //disabled={editingId !== ""} отключаем все кнопки Edit на других строках на других строках во время редактирования
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
        organizers: props.organizers,
      }),
    };
  });

  const isHandlingClickOnRow = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    let tagClassName = target.className !== '' && typeof target.className === 'string' ? target.className.split(' ')[0] : '';
    if (target.tagName === 'TD' || (target.tagName === 'SPAN' && tagClassName === 'ant-tag')) {
      return true;
    }
    return false;
  };

  const handleDoubleClickRow = (record: any, rowIndex: number | undefined, event: React.FormEvent<EventTarget>) => {
    if (isHandlingClickOnRow(event)) {
      setClickingRow(record);
      setVisibleModal(true);
    }
  };
  //______добавлена логика клика с зажатым shift__________________________________________________________________________
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [hiddenRowKeys, setHiddenRowKeys] = useState<Array<string>>([]);

  useEffect(() => {
    if (hiddenRowKeys.length === 0) setHideButton(false);
  }, [hiddenRowKeys]);

  const hideRows = () => {
    setHiddenData((prev) => {
      return [...prev, ...hiddenRowKeys];
    });
    setHideButton(false);
  };

  const unHideRows = () => {
    setHiddenRowKeys((prev) => {
      return prev.filter((key) => !hiddenData.includes(key));
    });
    setHiddenData([]);
  };

  const handleClickRow = (record: any, rowIndex: number | undefined, event: React.MouseEvent) => {
    if (isHandlingClickOnRow(event)) {
      const ind = rowIndex ? rowIndex + 1 : 1;
      const selRow = document.getElementsByClassName('ant-table-tbody')[0].children[ind];
      const rowClassName = selRow.className;
      let newRowClassName;
      const classSel = ' ant-table-row-selected';

      if (rowClassName.indexOf(classSel) !== -1) {
        newRowClassName = rowClassName.replace(classSel, '');
        setHiddenRowKeys((prev) => {
          return prev.filter((key) => key !== record.key);
        });
      } else {
        if (event.shiftKey) {
          if (hiddenRowKeys.length !== 0) {
            //console.log('Hidden row keys: ', hiddenRowKeys)
            const lastKey = hiddenRowKeys[hiddenRowKeys.length - 1];
            const currentKey = record.key;
            let clazz = '';
            visibleData.forEach((item: any) => {
              const currentSelRow = document.querySelector(`[data-row-key="${item.key}"]`);
              if (currentSelRow === null) {
                return;
              }
              // @ts-ignore
              const currentRowClassName = currentSelRow.className;
              if (currentRowClassName.indexOf(classSel) === -1) {
                // @ts-ignore
                currentSelRow.className = currentRowClassName + clazz;
                if (clazz !== '') {
                  setHiddenRowKeys((prev) => {
                    return [...prev, item.key];
                  });
                }
              }
              if (item.key === lastKey || item.key === currentKey) {
                if (clazz === '') {
                  clazz = classSel;
                } else {
                  clazz = '';
                }
              }
            });
            newRowClassName = rowClassName + classSel;
          } else {
            newRowClassName = rowClassName + classSel;
            setHideButton(true);
            setHiddenRowKeys((prev) => {
              return [...prev, record.key];
            });
          }
        } else {
          newRowClassName = rowClassName + classSel;
          setHideButton(true);
          setHiddenRowKeys((prev) => {
            return [...prev, record.key];
          });
        }
      }
      selRow.className = newRowClassName;
    }
  };

  return (
    <Form form={form} component={false}>
      <Button
        type="primary"
        disabled={editingId !== ''}
        onClick={() => add()}
        icon={<PlusCircleTwoTone style={{ fontSize: '16px' }} />}
      >
        Add event
      </Button>
      <div className="hidden-btn-row">
        {hideButton ? (
          <Button className="hide-btn" onClick={hideRows}>
            <EyeInvisibleOutlined className="icon" />
          </Button>
        ) : null}
        {hiddenData.length === 0 ? null : (
          <Button className="unhide-btn" onClick={unHideRows}>
            <EyeOutlined className="icon" />
          </Button>
        )}
      </div>
      <MentorFilters
        data={data}
        filterFlag={filerFlags}
        setFilterFlags={setFilterFlags}
        setDates={setDates}
        tagRender={props.tagRender}
        defaultColumns={props.defaultColumns}
        optionsKeyOfEvents={props.optionsKeyOfEvents}
        changeColumnsSelect={props.changeColumnsSelect}
      />
      <Table
        size="small"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={visibleData}
        columns={mergedColumns}
        rowClassName="editable-row"
        scroll={{ x: 1500, y: 500 }}
        pagination={{
          onChange: cancel,
          showSizeChanger: true,
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
            <Button id="back" onClick={() => setVisibleModal(false)}>
              Return
            </Button>,
          ]}
          onCancel={() => setVisibleModal(false)}
          width={1000}
        >
          <TaskPageContainer
            name={clickingRow.name}
            date={clickingRow.dateTime}
            type={clickingRow.type}
            organizer={clickingRow.organizer}
            taskContent={clickingRow.taskContent}
            isShowFeedback={clickingRow.isShowFeedback}
          />
        </Modal>
      ) : null}
    </Form>
  );
};
