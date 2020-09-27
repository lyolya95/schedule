import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExclamationOutlined,
  HighlightTwoTone,
  PlusCircleTwoTone,
  SaveOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { MinusSquareOutlined, UndoOutlined } from '@ant-design/icons/lib';
import { Button, Form, Modal, Rate, Table, Tag, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { MentorFilters } from '../MentorFilters/MentorFilters';
import { SaveToFile } from '../SaveToFile/SaveToFile';
import { TaskPageContainer } from '../TaskPage/TaskPage.container';
import { dateAndTimeFormat } from '../utilities';
import { EditableCell } from './EditableCell';
import { IAgeMap } from './TableSchedule.model';

export const TableSchedule: FC<any> = React.memo((props) => {
  const {
    data,
    columnsName,
    tagRender,
    defaultColumns,
    optionsKeyOfEvents,
    changeColumnsSelect,
    isMentorStatus,
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
    widthScreen,
    changeRating,
    isVoted,
    timeZone,
  } = props;

  const course = JSON.parse(localStorage['course'] || null);
  const place = JSON.parse(localStorage['place'] || null);
  const type = JSON.parse(localStorage['tags'] || null);
  const datesLocalStorage = JSON.parse(localStorage['dates'] || null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [clickingRow, setClickingRow] = useState<any | null>();
  const [hiddenData, setHiddenData] = useState<Array<string>>([]);
  const [filerFlags, setFilterFlags] = useState({ course, place, type });
  const [dates, setDates] = useState<Array<string>>(datesLocalStorage);
  const [hideButton, setHideButton] = useState<boolean>(false);
  const [hiddenRowKeys, setHiddenRowKeys] = useState<Array<string>>([]);

  const hasFilterFlag = useCallback((data: any, flags: any): boolean => {
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
  }, []);

  const isInDateRange = useCallback((date: any, dateRange: any): boolean => {
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
  }, []);

  const toUserTimeZone = useCallback((time: string, timeGap: string, timezone: string) => {
    return moment(time).subtract(timeGap, 'h').add(timezone).format(dateAndTimeFormat);
  }, []);

  const visibleData = useMemo(
    () =>
      data
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
        .filter((item: any) => !hiddenData.includes(item.key))
        .sort((a: any, b: any) => {
          const date1 = moment(a.dateTime);
          const date2 = moment(b.dateTime);
          if (date1 < date2) {
            return -1;
          }
          return 1;
        }),
    [data, dates, filerFlags, hasFilterFlag, hiddenData, isInDateRange, timeZone, toUserTimeZone]
  );

  const mentorOperationData = {
    title: 'Edit',
    dataIndex: 'operation',
    fixed: widthScreen > 940 && 'right',
    width: `${widthScreen > 1000 || widthScreen < 600 ? '120' : widthScreen / 4}px`,
    render: (_: any, record: any) => {
      const editable = isEditing(record);
      if (editable) {
        return (
          <span>
            <Tooltip title="Save changes">
              <Button
                icon={<SaveOutlined />}
                style={{ fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff' }}
                onClick={() => save(record.id)}
              />
            </Tooltip>
            <Tooltip title="Cancel changes">
              <Button
                onClick={cancel}
                icon={<CloseOutlined />}
                style={{ fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff' }}
              />
            </Tooltip>
          </span>
        );
      } else {
         return (
          <span>
            <Tooltip title="Edit row">
              <Button
                ghost={true}
                disabled={editingId !== ''}
                onClick={() => edit(record)}
                icon={<HighlightTwoTone twoToneColor="#52c41a" />}
                style={{ fontSize: '16px', border: '1px solid #b7eb8f', color: '##52c41a' }}
              />
            </Tooltip>
            <Tooltip title="Delete row">
              <Button
                ghost={true}
                onClick={() => remove(record.id)}
                icon={<DeleteOutlined />}
                style={{ fontSize: '16px', border: '1px solid #FF69B4', color: '#FF69B4' }}
              />
            </Tooltip>
          </span>
        );
      }
    },
  };

  const changeRowClass = useCallback((key: React.Key, className: string) => {
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
  }, []);

  const studentOperationData = {
    title: '',
    dataIndex: 'operation',
    fixed: widthScreen > 940 && 'right',
    width: `${widthScreen > 1000 || widthScreen < 600 ? '120' : widthScreen / 4}px`,
    render: (_: any, record: any) => {
      return (
        <span>
          <Tooltip title="Mark row as important">
            <Button
              ghost={true}
              onClick={() => changeRowClass(record.id, 'ant-table-row-main')}
              className="mainEvent"
              icon={<ExclamationOutlined />}
            />
          </Tooltip>
          <Tooltip title="Mark row as done">
            <Button
              ghost={true}
              onClick={() => changeRowClass(record.id, 'ant-table-row-done')}
              className="doneEvent"
              icon={<CheckOutlined />}
            />
          </Tooltip>
        </span>
      );
    },
  };
  const allColumns: IAgeMap[] = columnsName.map((item: any) => {
    switch (item.dataIndex) {
      case 'name':
        return {
          title: 'name',
          dataIndex: 'name',
          editable: true,
          render: (_: any, record: any) => {
            return (
               <div className="name-link" 
                    onClick={ () => handleDetailed(record)}
                >
                  <Tooltip title="Show event description">
                    <FileSearchOutlined className="name-link-ico"/> 
                  </Tooltip> {record.name}
                </div>
              );
          },
        };
      case 'descriptionUrl':
        return {
          title: 'descriptionUrl',
          dataIndex: 'descriptionUrl',
          editable: true,
          render: (_: any, record: any) => {
            return (
              <a href={record.descriptionUrl} title={record.descriptionUrl}>
                {record.descriptionUrl}
              </a>
            );
          },
        };
      case 'type':
        return {
          title: 'Type',
          dataIndex: 'type',
          editable: true,
          width: '10%',
          render: (_: any, record: any) => {
            return (
              <Tag key={record.type} color={types?.filter((i: any) => i.type === record.type)[0]?.color}>
                {record.type}
              </Tag>
            );
          },
        };
      case 'descriptionUrl':
        return {
          title: 'Description Url',
          dataIndex: 'descriptionUrl',
          editable: true,
          width: '15%',
          render: (_: any, record: any) => {
            return (
              <a key={record.descriptionUrl} target="_blank" href={record.descriptionUrl} rel="noopener noreferrer">
                {record.descriptionUrl.length > 0 ? `${record.descriptionUrl.slice(0, 45)}...` : ''}
              </a>
            );
          },
        };
      case 'combineScore':
        return {
          title: 'Score/maxScore',
          dataIndex: 'combineScore',
          editable: true,
          width: '9%',
        };
      default:
        return item;
    }
  });
  const ratingColumn = {
    title: 'Rating',
    dataIndex: 'rating',
    width: `${widthScreen > 1000 || widthScreen < 600 ? '170' : widthScreen / 4}px`,
    render: (_: any, record: any) => {
      const hasVotes = record.rating && record.rating.voted && record.rating.voted>0  
                        ? true : false;
      const ratingMidValue  = hasVotes ? record.rating.sum / record.rating.voted : 0;
      
      if(isMentorStatus){
        return (
          <Rate disabled  value={ratingMidValue}/>
        );
      }else{
        let isCurrVoted = false;
        if( isVoted &&  isVoted.length>0){
          const votedElement = isVoted.find((item: any) => record.key === item.id);
          isCurrVoted = votedElement?.value;
        }
        return (
          <span>
            {isCurrVoted  
            ? <Rate disabled value={ratingMidValue} />
            : <Rate onChange={(value) => changeRating(value, record)} />
            }
          </span>
        );
      }
    },
  };
  
 
  const columns: IAgeMap[] = isMentorStatus
    ? [...allColumns, ratingColumn, mentorOperationData]
    : [...allColumns, ratingColumn, studentOperationData];

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
        types,
      }),
    };
  });

  const isHandlingClickOnRow = useCallback((event: React.FormEvent<EventTarget>) => {
    let target = event.target as HTMLInputElement;
    let tagClassName = target.className !== '' && typeof target.className === 'string' ? target.className.split(' ')[0] : '';
    if (target.tagName === 'TD' || (target.tagName === 'SPAN' && tagClassName === 'ant-tag')) {
      return true;
    }
    return false;
  }, []);

  const handleDetailed =  useCallback(
    (record: any) => {
      setClickingRow(record);
      setVisibleModal(true);
    },
    [setClickingRow, setVisibleModal]
  );


  useEffect(() => {
    if (hiddenRowKeys.length === 0) setHideButton(false);
  }, [hiddenRowKeys]);

  const hideRows = useCallback(() => {
    setHiddenData((prev) => {
      return [...prev, ...hiddenRowKeys];
    });
    setHideButton(false);
  }, [hiddenRowKeys]);

  const unHideRows = useCallback(() => {
    setHiddenRowKeys((prev) => {
      return prev.filter((key) => !hiddenData.includes(key));
    });
    setHiddenData([]);
  }, [hiddenData]);

  const handleClickRow = useCallback(
    (record: any, rowIndex: number | undefined, event: React.MouseEvent) => {
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
    },
    [hiddenRowKeys, isHandlingClickOnRow, visibleData]
  );

  return (
    <Form form={form} component={false}>
      <div className="hidden-btn-row">
        {isMentorStatus && (
          <Tooltip title="Add new event">
            <Button type="primary" disabled={editingId !== '' || !isMentorStatus} onClick={add} icon={<PlusCircleTwoTone />} />
          </Tooltip>
        )}
        <SaveToFile data={visibleData} columns={mergedColumns} widthScreen={widthScreen} />
        {hideButton ? (
          <Tooltip title="Hide rows">
            <Button onClick={hideRows}>
              <MinusSquareOutlined />
            </Button>
          </Tooltip>
        ) : null}
        {hiddenData.length === 0 ? null : (
          <Tooltip title="Show hidden rows">
            <Button onClick={unHideRows}>
              <UndoOutlined />
            </Button>
          </Tooltip>
        )}
      </div>
      <Text type="secondary">Double click on a table row to bring up detailed information</Text>
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
        scroll={{ x: widthScreen < 700 ? 1800 : 2300, y: 600 }}
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
          };
        }}
      />
      {clickingRow ? (
        <Modal
          key={clickingRow.id}
          title={clickingRow.course}
          centered
          visible={visibleModal}
          footer={[
            <Button key={clickingRow.id} id="back" onClick={() => setVisibleModal(false)}>
              Back
            </Button>,
          ]}
          onCancel={() => setVisibleModal(false)}
          width={1000}
        >
          <TaskPageContainer eventData={clickingRow} />
        </Modal>
      ) : null}
    </Form>
  );
});
