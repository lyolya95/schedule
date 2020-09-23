import {
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    ExclamationOutlined,
    HighlightTwoTone,
    PlusCircleTwoTone,
    SaveOutlined,
} from '@ant-design/icons';
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons/lib';
import {Button, Form, Modal, Rate, Table, Tag} from 'antd';
import 'antd/dist/antd.css';
import React, {FC, useEffect, useState} from 'react';
import {MentorFilters} from '../MentorFilters/MentorFilters';
import {TaskPageContainer} from '../TaskPage/TaskPage.container';
import {switchTypeToColor} from '../utilities/switcher';
import {SelectTimeZone} from "../SelectTimeZone/SelectTimeZone";
import moment from "moment";
import {IAgeMap} from "./TableSchedule.model";
import EditableCell from "./EditableCell";

export const TableSchedule: FC<any> = React.memo((props) => {
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
    } = props;
    // localStorage
    const course = JSON.parse(localStorage['course'] || null);
    const place = JSON.parse(localStorage['place'] || null);
    const type = JSON.parse(localStorage['tags'] || null);
    const datesLocalStorage = JSON.parse(localStorage['dates'] || null);

    // данные для фильтрации
    const [hiddenData, setHiddenData] = useState<Array<string>>([]); //скрытые пользователем
    const [filerFlags, setFilterFlags] = useState({course, place, type}); //из блока фильтров ментора
    const [dates, setDates] = useState<Array<string>>(datesLocalStorage); //по датам
    const [timeZone, setTimeZone] = useState<string>("+00:00") // Time Zone выбранный пользователем
    const format = "DD.MM.YYYY HH:mm"; //Формат даты и времени для выведения в таблицу

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
            .map((key: string) => flags[key].map((value: string) => value.split(','))).flat(2);

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
        return moment(time).add(timeGap).add(timezone).format(format);
    }

    //const [data, setData] = useState(initialData); // хранятся все данные таблиц которые приходят

    const visibleData = data // формируем отображаемые данные для таблицы
        .filter((item: any) => hasFilterFlag(item, filerFlags))
        .filter((item: any) => isInDateRange(item.dateTime, dates))
        .map((item: any) => {
            return {...item, key: item.id}
        })
        .filter((item: any) => !hiddenData.includes(item.key))
        .map((item: any) => {
            return {
                ...item,
                dateTime: toUserTimeZone(item.dateTime, item.timeZone, timeZone)
            }
        });

    const [visibleModal, setVisibleModal] = useState(false);
    const [clickingRow, setClickingRow] = useState<any | null>();
    // надо взять с localstorage первоначальные данные
    const [eventRating, setEventRating] = useState<any>();

    const mentorOperationData = {
        title: 'Edit',
        dataIndex: 'operation',
        fixed: 'right',
        render: (_: any, record: any) => {
            const editable = isEditing(record); // (render вызывается всякий раз как изменяется что то на странице, или создается новая строка с данными) каждый раз проверяем record (строка целиком, они приходят по порядку) пришла если с возможностью редактирования тогда показываем кнопки "Save" и "Cancel" иначе кнопку с "Edit"
            if (editable) {
                return (
                    <span>
            <Button
                icon={<SaveOutlined/>}
                style={{fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff'}}
                onClick={() => save(record.key)}
            />
            <Button
                onClick={cancel}
                icon={<CloseOutlined/>}
                style={{fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff'}}
            />
          </span>
                );
            } else {
                const eventRating = data.find((item: any) => record.key === item.key).rating;
                return (
                    <span>
            <Button
                ghost={true}
                disabled={editingId !== ''}
                onClick={() => edit(record)}
                icon={<HighlightTwoTone twoToneColor="#52c41a"/>}
                style={{fontSize: '16px', border: '1px solid #b7eb8f', color: '##52c41a'}}
            />
            <Button
                ghost={true}
                onClick={() => remove(record.key)}
                icon={<DeleteOutlined/>}
                style={{fontSize: '16px', border: '1px solid #91d5ff', color: '#1890ff'}}
            />
            <Rate disabled value={eventRating}/>
          </span>
                );
            }
            //save отправим колбэк с ключем текущей строки что бы сохранить
            //cancel отправим колбэк с ключем текущей строки что бы отменить
            //Popconfirm от ant что бы спросить уверены или нет
            //disabled={editingKey !== ""} отключаем все кнопки Edit на других строках на других строках во время редактирования
            //edit отправим колбэк с данными изменяемой в данный момент строкой
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
        const currEventRating = data.find((item: any) => key === item.key).rating;
        const newRating = currEventRating && currEventRating > 0 ? (value + currEventRating) / ratingVotes : value;
        //@todo save rating to event
        setEventRating({[key]: {voted: true, value: newRating}});
    };

    const studentOperationData = {
        title: '',
        dataIndex: 'operation',
        fixed: 'right',
        render: (_: any, record: any) => {
            const key = record.key;
            const isVoted = eventRating && eventRating[key] && eventRating[key].voted ? true : false;
            return (
                <span>
          <Button
              ghost={true}
              onClick={() => changeRowClass(key, 'ant-table-row-main')}
              //icon={<WarningTwoTone twoToneColor="red" />}>
              className="mainEvent"
              //icon={<ExclamationCircleOutlined />}
              icon={<ExclamationOutlined/>}
          ></Button>
          <Button
              ghost={true}
              onClick={() => changeRowClass(key, 'ant-table-row-done')}
              className="doneEvent"
              //icon={<CheckSquareTwoTone twoToneColor="#52c41a"/>}
              icon={<CheckOutlined/>}
          ></Button>
          <span></span>
                    {isVoted ? <Rate disabled value={eventRating[key].value}/> :
                        <Rate onChange={(value) => changeRating(value, key)}/>}
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
                            <Tag key={record.type} color={switchTypeToColor(record.type)}>
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

    const columns: IAgeMap[] = isMentorStatus ? [...allColumns, mentorOperationData] : [...allColumns, studentOperationData];

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
                            console.log('SHIFT key', currentSelRow)
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
            <Button type="primary" disabled={editingId !== ''} onClick={add}
                    icon={<PlusCircleTwoTone style={{fontSize: '16px'}}/>}>
                Add event
            </Button>
            <div className="hidden-btn-row">
                {hideButton ? (
                    <Button className="hide-btn" onClick={hideRows}>
                        <EyeInvisibleOutlined className="icon"/>
                    </Button>
                ) : null}
                {hiddenData.length === 0 ? null : (
                    <Button className="unhide-btn" onClick={unHideRows}>
                        <EyeOutlined className="icon"/>
                    </Button>
                )}
                <SelectTimeZone setTimeZone={setTimeZone}/>
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
                scroll={{x: 2500, y: 500}}
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
                        },
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
});
