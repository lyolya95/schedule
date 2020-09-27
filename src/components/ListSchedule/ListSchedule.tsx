import { List, Card, Tag, Tooltip } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React, { FC, useState, useEffect, useCallback } from 'react';
import './ListSchedule.scss';
import { ListScheduleProps } from './ListSchedule.model';
import { EventOfInterface } from '../../reducers/reducers.model';
import { ModalViewEvents } from '../ModalViewEvent/ModalViewEvent';

export const ListSchedule: FC<ListScheduleProps> = React.memo(
({ data, getDataEvent, types, isShowModalViewEvents, setShowModaViewEvent }) => {
  const [currPageSize, setCurrPageSize] = useState(20);
  const [selItem, setSelItem] = useState('');
  const [event, setEvent] = useState<EventOfInterface[]>([])

  useEffect(() => {
      getDataEvent();
    }, [getDataEvent]);
    
  const handleDetailed = useCallback(
    (value) => {
      setEvent(data.filter((i: EventOfInterface) => i.id === value));
      setShowModaViewEvent(true);
    },
    [setShowModaViewEvent, data]
  );

  const cardTitle = useCallback(
    (title: String, value: string) =>{
      return (  <div className="name-link" 
                    onClick={ () => handleDetailed(value)}
                >
                  <Tooltip title="Show event description">
                    <FileSearchOutlined className="name-link-ico"/> 
                  </Tooltip> {title}
                </div>);
    },
    [handleDetailed]
  );

  const getListData =  useCallback(
    (item:any) => {
      const classNameItem =  selItem === item.id ? "list-item-selected" : "";
      
      return (
        <List.Item
          key={item.id}
          className = {classNameItem}
          onClick={()=>setSelItem(item.id)}
        >
          <Card  title={cardTitle(item.name, item.id)}>
            <div>Course: <b>{item.course}</b></div>
            {item.type 
            ?<div>Type: <Tag className="size" key={item.type} color={types?.filter((i: any) => i.type === item.type)[0]?.color}>
                {item.type}
              </Tag>
            </div>
            : null
            }
            <div>Date: <b>{item.dateTime+item.timeZone}</b></div>
            { item.place ? <div>Place: <span className="place">{item.place}</span></div> : null }
            { item.organizer ? <div>Organizer: <b>{item.organizer}</b></div> : null }
        </Card>
      </List.Item>
      );
    },
    [selItem, setSelItem, cardTitle, types]
  );

  return (
    <>
      <List
        grid={{ 
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6, }}
        dataSource={data}
        renderItem={item => getListData(item) }
        pagination={{
          onShowSizeChange: (current, size) => {
            setCurrPageSize(size)
          },
          pageSize: currPageSize,
          showSizeChanger: true,
        }}
      /> 
      {isShowModalViewEvents && (
        <ModalViewEvents
          isShowModalViewEvents={isShowModalViewEvents}
          setIsShowModalViewEvents={setShowModaViewEvent}
          event={event}
          types={types}
        />
      )}   
    </>   
  );
});