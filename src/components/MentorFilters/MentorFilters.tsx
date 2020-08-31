import React, {useState} from "react";
import {DatePicker, Space, Select, Menu, Dropdown} from 'antd';
import {FilterOutlined} from '@ant-design/icons';

import './MentorFilters.scss';
import 'antd/dist/antd.css';

const {Option} = Select;
const {RangePicker} = DatePicker;

export const MentorFilters: React.FC = () => {

    const [visible, setVisible] = useState(false);

    const changeVisible = () => setVisible((visible) => !visible);

    function handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    const filters = (
        <Menu>
            <Menu.Item key="0">
                <Select
                    className="filters_item"
                    mode="multiple"
                    placeholder="Mentor"
                    onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Vadim">Vadim</Option>
                </Select>
            </Menu.Item>
            <Menu.Item key="1">
                <Select
                    className="filters_item"
                    mode="multiple"
                    placeholder="Event"
                    onChange={handleChange}>
                    <Option value="Task">Task</Option>
                    <Option value="Deadline">Deadline</Option>
                    <Option value="Lecture">Lecture</Option>
                    <Option value="Meetup">Meetup</Option>
                </Select>
            </Menu.Item>
            <Menu.Item key="2">
                <Select
                    className="filters_item"
                    placeholder="Course"
                    mode="multiple"
                    onChange={handleChange}>
                    <Option value="React">React</Option>
                    <Option value="Angular">Angular</Option>
                    <Option value="Node">Node</Option>
                </Select>
            </Menu.Item>
            <Menu.Item key="3">
                <Select
                    className="filters_item"
                    mode="multiple"
                    placeholder="Location"
                    onChange={handleChange}>
                    <Option value="Online">Online</Option>
                    <Option value="Moscow">Moscow</Option>
                    <Option value="Minsk">Minsk</Option>
                    <Option value="Warshaw">Warshaw</Option>
                </Select>
            </Menu.Item>
            <Menu.Item key="4">
                <Space direction="vertical" size={12}>
                    <RangePicker/>
                </Space>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={filters} trigger={['click']} onVisibleChange={changeVisible} visible={visible}>
            <a className="ant-dropdown-link">
                <FilterOutlined style={{fontSize: '25px', color: 'grey'}}/>
            </a>
        </Dropdown>
    )
};
