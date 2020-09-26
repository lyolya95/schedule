import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExclamationOutlined,
  EyeInvisibleTwoTone,
  EyeTwoTone,
  HighlightTwoTone,
  PlusCircleTwoTone,
  SaveOutlined,
} from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons/lib';
import { Button, Form, Modal, Rate, Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { MentorFilters } from '../MentorFilters/MentorFilters';
import { SelectTimeZone } from '../SelectTimeZone/SelectTimeZone';
import { TaskPageContainer } from '../TaskPage/TaskPage.container';
import { dateAndTimeFormat } from '../utilities';
import { EditableCell } from './EditableCell';
import { IAgeMap } from './TableSchedule.model';

const TableSchedule: FC<any> = React.memo((props) => {
  const {
    data,
    columnsName,
    tagRender,
    defaultColumns,
    optionsKeyOfEvents,
    changeColumnsSelect,
    isMentorStatus,
    ratingVotes,
    organizers,
    form,
    editingId,
    isEditing,
    isLoading,
    edit,
    cancel,
    add,
    remove,
    save,
    types,
  } = props;

  // localStorage
  const course = JSON.parse(localStorage['course'] || null);
  const place = JSON.parse(localStorage['place'] || null);
  const type = JSON.parse(localStorage['tags'] || null);
  const datesLocalStorage = JSON.parse(localStorage['dates'] || null);

  // данные для фильтрации
  const [hiddenData, setHiddenData] = useState<Array<string>>([]); //скрытые пользователем
  const [filerFlags, setFilterFlags] = useState({ course, place, type }); //из блока фильтров ментора
  const [dates, setDates] = useState<Array<string>>(datesLocalStorage); //по датам
  const [timeZone, setTimeZone] = useState<string>('+0:00'); // Time Zone выбранный пользователем

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
    const valueToCheck: string[] = keysToCheck
      .map((key: string) => flags[key].map((value: string) => value.split(',')))
      .flat(2);

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
    const compareDate = moment(date);
    const firstDate = moment(dateRange[0]);
    const lastDate = moment(dateRange[1]);
    if (firstDate < compareDate && compareDate < lastDate) {
      return true;
    }
    return false;
  };

  const toUserTimeZone = (time: string, timeGap: string, timezone: string) => {
    return moment(time).subtract(timeGap, 'h').add(timezone).format(dateAndTimeFormat);
  };

  //const [data, setData] = useState(initialData); // хранятся все данные таблиц которые приходят

  const visibleData = data // формируем отображаемые данные для таблицы
    .filter((item: any) => hasFilterFlag(item, filerFlags))
    .map((item: any) => {
      return {
        ...item,
        dateTime: toUserTimeZone(item.dateTime, item.timeZone, timeZone),
      };
    })
    .filter((item: any) => isInDateRange(item.dateTime, dates))
    .map((item: any) => {
      return { ...item, key: item.id };
    })
    .filter((item: any) => !hiddenData.includes(item.key));

  const [visibleModal, setVisibleModal] = useState(false);
  const [clickingRow, setClickingRow] = useState<any | null>();
  // надо взять с localstorage первоначальные данные
  const [eventRating, setEventRating] = useState<any>();

  //____________________
  const [widthScreen, setWidthScreen] = useState(1366);
  const updateDimensions = () => {
    setWidthScreen(window.innerWidth);
  };
  useEffect(() => {
    setWidthScreen(window.innerWidth);
    if (widthScreen !== window.innerWidth) {
      window.addEventListener('resize', updateDimensions);
    }
  }, [window.addEventListener]);

  //_________________________

  const mentorOperationData = {
    title: 'Edit',
    dataIndex: 'operation',
    fixed: widthScreen > 940 && 'right',
    width: `${widthScreen > 1000 || widthScreen < 600 ? '250' : widthScreen / 4}px`,
    render: (_: any, record: any) => {
      const editable = isEditing(record);
      if (editable) {
        return (
          <span>
            <Button
              icon={<SaveOutlined />}
              style={{ fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff' }}
              onClick={() => save(record.id)}
            />
            <Button
              onClick={cancel}
              icon={<CloseOutlined />}
              style={{ fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff' }}
            />
          </span>
        );
      } else {
        const eventRating = data.find((item: any) => record.id === item.id).rating;
        return (
          <span>
            <Button
              ghost={true}
              disabled={editingId !== ''}
              onClick={() => edit(record)}
              icon={<HighlightTwoTone twoToneColor="#52c41a" />}
              style={{ fontSize: '16px', border: '1px solid #b7eb8f', color: '##52c41a' }}
            />
            <Button
              ghost={true}
              onClick={() => remove(record.id)}
              icon={<DeleteOutlined />}
              style={{ fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff' }}
            />
            <Rate disabled value={eventRating} />
          </span>
        );
      }
    },
  };
  const changeRowClass = (key: React.Key, className: string) => {
    const selRow = document.querySelector(`[data-row-key=${key}]`);
    if (selRow) {
      const rowClassName = selRow.getAttribute('class');
      let newRowClassName;
      const classSel = ' ' + className;
      if (rowClassName && rowClassName.indexOf(classSel) !== -1) {
        newRowClassName = rowClassName.replace(classSel, '');
      } else {
        newRowClassName = rowClassName + classSel;
      }
      selRow.setAttribute('class', newRowClassName);
    }
  };

  const changeRating = (value: number, key: React.Key) => {
    const currEventRating = data.find((item: any) => key === item.id).rating;
    const newRating = currEventRating && currEventRating > 0 ? (value + currEventRating) / ratingVotes : value;
    //@todo save rating to event
    setEventRating({ [key]: { voted: true, value: newRating } });
  };

  const studentOperationData = {
    title: '',
    dataIndex: 'operation',
    fixed: widthScreen > 940 && 'right',
    width: `${widthScreen > 1000 || widthScreen < 600 ? '250' : widthScreen / 4}px`,
    render: (_: any, record: any) => {
      const isVoted = eventRating && eventRating[record.id] && eventRating[record.id].voted ? true : false;
      return (
        <span>
          <Button
            ghost={true}
            onClick={() => changeRowClass(record.id, 'ant-table-row-main')}
            //icon={<WarningTwoTone twoToneColor="red" />}>
            className="mainEvent"
            //icon={<ExclamationCircleOutlined />}
            icon={<ExclamationOutlined />}
          ></Button>
          <Button
            ghost={true}
            onClick={() => changeRowClass(record.id, 'ant-table-row-done')}
            className="doneEvent"
            //icon={<CheckSquareTwoTone twoToneColor="#52c41a"/>}
            icon={<CheckOutlined />}
          ></Button>
          <span></span>
          {isVoted ? (
            <Rate disabled value={eventRating[record.id].value} />
          ) : (
            <Rate onChange={(value) => changeRating(value, record.id)} />
          )}
        </span>
      );
    },
  };
  const allColumns: IAgeMap[] = columnsName.map((item: any) => {
    switch (item.dataIndex) {
      case 'type':
        return {
          title: 'Type',
          dataIndex: 'type',
          editable: true,
          render: (_: any, record: any) => {
            return (
              <Tag key={record.type} color={types?.filter((i: any) => i.type === record.type)[0]?.color}>
                {record.type}
              </Tag>
            );
          },
        };

      case 'combineScore':
        return {
          title: 'Score/maxScore',
          dataIndex: 'combineScore',
          editable: true,
        };
      default:
        return item;
    }
  });

  const columns: IAgeMap[] = isMentorStatus
    ? [...allColumns, mentorOperationData]
    : [...allColumns, studentOperationData];

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
        organizers,
      }),
    };
  });

  const isHandlingClickOnRow = (event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    let tagClassName =
      target.className !== '' && typeof target.className === 'string' ? target.className.split(' ')[0] : '';
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
        onClick={add}
        icon={<PlusCircleTwoTone style={{ fontSize: '16px' }} />}
      >
        Add event
      </Button>
      <div className="hidden-btn-row">
        {isMentorStatus ? (
          <Button
            type="primary"
            disabled={editingId !== '' || !isMentorStatus}
            onClick={add}
            icon={<PlusCircleTwoTone />}
          />
        ) : (
          ''
        )}

        {hiddenData.length === 0 ? (
          <Button
            onClick={hideRows}
            disabled={!hideButton}
            icon={hideButton ? <EyeInvisibleTwoTone /> : <EyeOutlined />}
          />
        ) : (
          <Button onClick={unHideRows} icon={<EyeTwoTone />} />
        )}
        <SelectTimeZone setTimeZone={setTimeZone} widthScreen={widthScreen} />
      </div>
      <MentorFilters
        data={data}
        filterFlag={filerFlags}
        setFilterFlags={setFilterFlags}
        setDates={setDates}
        tagRender={tagRender}
        defaultColumns={defaultColumns}
        optionsKeyOfEvents={optionsKeyOfEvents}
        changeColumnsSelect={changeColumnsSelect}
        isMentorStatus={isMentorStatus}
      />
      <Table
        loading={isLoading}
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
        scroll={{ x: 2500, y: 600 }}
        pagination={{
          onChange: cancel,
          showSizeChanger: true,
          defaultPageSize: 20,
          defaultCurrent: 1,
          showTotal: (total: number) => `Total ${total} items`,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleClickRow(record, rowIndex, event);
            },
            onDoubleClick: (event) => {
              handleDoubleClickRow(record, rowIndex, event);
            },
          };
        }}
      />
      {clickingRow ? (
        <Modal
          key = {clickingRow.id}
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
            eventData={clickingRow}
          />
        </Modal>
      ) : null}
    </Form>
  );
});

export { TableSchedule };
