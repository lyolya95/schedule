import React from "react";
import {DatePicker, Space, Select, Radio} from 'antd';

import './MentorFilters.scss';
import 'antd/dist/antd.css';

const {Option} = Select;
const {RangePicker} = DatePicker;

export const MentorFilters: React.FC = () => {

    function handleChange(value: any) {
        console.log(`selected ${value}`);
    }

    return (
        <div className="test-filters">
            <div className="view-type">
                <Radio.Group defaultValue="Table" buttonStyle="solid">
                    <Radio.Button value="Table">Table</Radio.Button>
                    <Radio.Button value="List">List</Radio.Button>
                    <Radio.Button value="Calendar">Calendar</Radio.Button>
                </Radio.Group>
            </div>
            <div className="filters filters-row">
                <Select
                    className="filters_item"
                    mode="multiple"
                    placeholder="Mentor"
                    onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Vadim">Vadim</Option>
                </Select>
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
                <Select className="filters_item" placeholder="Course" onChange={handleChange}
                        allowClear>
                    <Option value="React">React</Option>
                    <Option value="Angular">Angular</Option>
                    <Option value="Node">Node</Option>
                </Select>
                <Select className="filters_item" placeholder="Location" onChange={handleChange} allowClear>
                    <Option value="Online">Online</Option>
                    <Option value="Moscow">Moscow</Option>
                    <Option value="Minsk">Minsk</Option>
                    <Option value="Warshaw">Warshaw</Option>
                </Select>
                <Space direction="vertical" size={12}>
                    <RangePicker/>
                </Space>
            </div>
            <div className="filters filters-column">
                <Select
                    className="filters_item"
                    mode="multiple"
                    placeholder="Mentor"
                    onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Vadim">Vadim</Option>
                </Select>
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
                <Select className="filters_item" placeholder="Course" onChange={handleChange}
                        allowClear>
                    <Option value="React">React</Option>
                    <Option value="Angular">Angular</Option>
                    <Option value="Node">Node</Option>
                </Select>
                <Select className="filters_item" placeholder="Location" onChange={handleChange} allowClear>
                    <Option value="Online">Online</Option>
                    <Option value="Moscow">Moscow</Option>
                    <Option value="Minsk">Minsk</Option>
                    <Option value="Warshaw">Warshaw</Option>
                </Select>
                <Space direction="horizontal" size={12}>
                    <RangePicker/>
                </Space>
            </div>
        </div>
    )
};