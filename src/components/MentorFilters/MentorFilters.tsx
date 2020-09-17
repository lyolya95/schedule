import React, {FC} from "react";
import {DatePicker, Space, Select, Button, Form, Divider} from 'antd';
import {Collapse} from 'antd';

import './MentorFilters.scss';
import 'antd/dist/antd.css';
import {MentorFiltersProps} from "./MentorFiltersProps.model";

const {Option} = Select;
const {RangePicker} = DatePicker;
const {Panel} = Collapse;

export const MentorFilters: FC<MentorFiltersProps> = (props) => {

    const {data, setFilterFlags, filterFlag, setDates} = props;
    const [form] = Form.useForm();
    let initialKey = 1;

    const getKey = () => {
        const key = initialKey;
        initialKey++;
        return key;
    }

    function handleChange(tag: string, value: Array<string>): void {
        const keys = Object.keys(filterFlag);
        const flag: any = {};
        flag[tag] = value;
        if (keys.includes(tag)) {
            if (filterFlag[tag].includes(value)) {
                return
            }
            const newFlag = {...filterFlag, ...flag};
            setFilterFlags(newFlag);
        }
        const newFlag = {...filterFlag, ...flag};
        setFilterFlags(newFlag);
    }

    function dateChange(value: any): void {
        if (value === null) {
            setDates([]);
            return;
        }
        const dates = value.map((item: any) => item._d);
        setDates(dates);
    }

    const optionCreate = (data: any, tag: string) => {
        const labels: any = [];
        const option: Array<JSX.Element> = data.map((item: any) => {
            if (labels.includes(item[tag])) {
                return null;
            }
            labels.push(item[tag]);
            return <Option value={item[tag]} key={getKey()}>{item[tag]}</Option>
        })
        return option;
    }

    const onReset = () => {
        form.resetFields();
        setFilterFlags({});
    }

    const filters = (
        <div className="filters">
            <Form className="filters_select" form={form} name="control-hooks">
                <Form.Item name="organizer" className="filters_select_item" key='1'>
                    <Select
                        mode="multiple"
                        placeholder="Organizer"
                        onChange={(value: Array<string>) => handleChange('organizer', value)}
                        allowClear>
                        {optionCreate(data, 'organizer')}
                    </Select>
                </Form.Item>
                <Form.Item name="tags" className="filters_select_item" key='2'>
                    <Select
                        mode="multiple"
                        placeholder="Type"
                        onChange={(value: Array<string>) => handleChange('type', value)}
                        allowClear>
                        {optionCreate(data, 'type')}
                    </Select>
                </Form.Item>
                <Form.Item name="course" className="filters_select_item" key='3'>
                    <Select
                        placeholder="Course"
                        mode="multiple"
                        onChange={(value: Array<string>) => handleChange('course', value)}
                        allowClear>
                        {optionCreate(data, 'course')}
                    </Select>
                </Form.Item>
                <Form.Item name="place" className="filters_select_item" key='4'>
                    <Select
                        mode="multiple"
                        placeholder="Place"
                        onChange={(value: Array<string>) => handleChange('place', value)}
                        allowClear>
                        {optionCreate(data, 'place')}
                    </Select>
                </Form.Item>
                <Form.Item className="filters_select_item_range" key='5'>
                    <Space direction="vertical" size={12}>
                        <RangePicker onChange={dateChange}/>
                    </Space>
                </Form.Item>
            </Form>
            <Form.Item key='6'>
                <Button className="filters_btn" onClick={() => onReset()} htmlType="button" danger>Reset</Button>
            </Form.Item>
            <Divider orientation="left" plain>Visible columns</Divider>
            <Select
                bordered={true}
                showArrow={true}
                mode="multiple"
                placeholder="Columns"
                className="select-dropdown-columns"
                tagRender={props.tagRender}
                defaultValue={props.defaultColumns}
                options={props.optionsKeyOfEvents}
                onChange={props.changeColumnsSelect}
                />
        </div>
    )

    return (
        <Collapse bordered={false}>
            <Panel header="Filters" key="1">
                {filters}
            </Panel>
        </Collapse>
    )
};



