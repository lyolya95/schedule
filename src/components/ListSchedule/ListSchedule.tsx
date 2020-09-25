import { List, Card, Tag } from 'antd';
import 'antd/dist/antd.css';
import React, { FC, useState, useEffect } from 'react';
import './ListSchedule.scss';
import { ListScheduleProps } from './ListSchedule.model';
import { switchTypeToColor } from '../utilities';

export const ListSchedule: FC<ListScheduleProps> = React.memo(({ data, getDataEvent }) => {
    
  const [currPageSize, setCurrPageSize] = useState(20);

  useEffect(() => {
      getDataEvent();
    }, [getDataEvent]);
      
      
  const getListData = (item:any) => {
        return (
          <List.Item>
            <Card  title={item.name}>
                  <div>Course: <b>{item.course}</b></div>
                  {item.type 
                  ?<div>Type: <Tag color={switchTypeToColor(item.type)} className="size">
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

    const changePage = (page:number, pageSize:number|undefined) =>{
      console.log('page='+page+' size'+pageSize);
    }
        
    return (
        <List
          grid={{ gutter: 16, column: 4 }}
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