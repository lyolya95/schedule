import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';
import React, { FC, useCallback, useEffect } from 'react';
import './ListSchedule.scss';
import { ListScheduleProps } from './ListSchedule.model';

export const ListSchedule: FC<ListScheduleProps> = React.memo(({ data, getDataEvent }) => {

    return (
    <div className="site-card-wrapper">
        <Row gutter={16}>
        <Col span={8}>
            <Card title="Card title">
            Card content
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Card title" >
            Card content
            </Card>
        </Col>
        <Col span={8}>
            <Card title="Card title" >
            Card content
            </Card>
        </Col>
        </Row>
    </div>);
});