/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Tag } from 'antd';
import { TableSchedule } from './TableSchedule';
import './Tables.scss';

export const TableScheduleContainer = (props: any) => {
  const { columnsName, notEditableColumns, data, isMentorStatus } = props;
  const userColumnsName = isMentorStatus ?  columnsName.filter((item:string) => item!=='combineScore') : columnsName; 
  console.log(' col='+userColumnsName);
  const columnsNameMap = userColumnsName.map((n: string) => ({ value: n }));
  console.log('props', columnsName);

  //создал контейнер для поднятия состояния таких как columnsName на верхний уровень, для того что бы он был доступен и таблице и селектуОтображения
  const [mapsColumnsName, setMapColumnsName] = useState([]);
  const defaultColumns = userColumnsName;
  //const [userColumnsName, setUserColumnsName] = useState(columnsName);
 // const defaultColumns = ['dateTime', 'timeToComplete',  'name', 'organizer', 'place'];
 // const toUpperCase = (value: string) => value[0].toUpperCase() + value.slice(1);
 /// const  index= columnsName.findIndex((item:string) => (item==='Score/maxScore'));
 /// const col = [columnsName.slice(0,index),columnsName.slice(index+1)];
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
      const mapColumns = value.map((n: any) => ({ title: n, dataIndex: n, editable: notEditableColumns.findIndex((item:string) => item === n) === -1 ? true : false}));
      //({ title: toUpperCase(n), dataIndex: n, editable: true }));
      setMapColumnsName(mapColumns);
  };
  
 
//@TOdo не убирается после изменения isMentorStatus поле Score в выбранных select

  useEffect(() => {
    const userColumns = isMentorStatus ?  mapsColumnsName.filter((item:any) => item.title!=='combineScore')
                                        : mapsColumnsName; 
     setMapColumnsName(userColumns);
     console.log('use2',userColumns)
  }, [isMentorStatus]);

  useEffect(() => {
    const mapColumns: any = defaultColumns.map((n: any) => ({
      //title: toUpperCase(n),
      title: n,
      dataIndex: n,
      editable: notEditableColumns.findIndex((item:string) => item === n) === -1 ? true : false,
    }));
    setMapColumnsName(mapColumns);
    console.log('use',mapColumns)
  }, []);
/*console.log('mapsColumnsName',mapsColumnsName);
console.log('userColumnsName',userColumnsName);
console.log('columnsNameMap',columnsNameMap);
columnsName={mapsColumnsName}
 defaultColumns={userColumnsName}
*/
  return (
    <TableSchedule
      columnsName={mapsColumnsName}
      tagRender={tagRender}
      defaultColumns={defaultColumns}
      optionsKeyOfEvents={columnsNameMap}
      changeColumnsSelect={changeColumnsSelect}
      data={data}
      isMentorStatus={isMentorStatus}
    />
  );
};
