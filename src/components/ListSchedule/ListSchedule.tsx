import { List, Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { FC, useState, useEffect } from 'react';
import './ListSchedule.scss';
import { ListScheduleProps } from './ListSchedule.model';

export const ListSchedule: FC<ListScheduleProps> = React.memo(({ data, getDataEvent, types }) => {
    
  const [currPageSize, setCurrPageSize] = useState(20);
  const [selItem, setSelItem] = useState('');

  useEffect(() => {
      getDataEvent();
    }, [getDataEvent]);
    
  const getListData = (item:any) => {
    const classNameItem =  selItem === item.id ? "list-item-selected" : "";
    
    return (
      <List.Item
        key={item.id}
        className = {classNameItem}
        onClick={()=>setSelItem(item.id)}
      >
        <Card  title={item.name}>
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
  }

  return (
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
  );
});