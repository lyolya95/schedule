import { Button, Collapse, DatePicker, Divider, Form, Select } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import React, { FC, useCallback } from 'react';
import { useStickyState } from './hooks/useStickyState';
import './MentorFilters.scss';
import { MentorFiltersProps } from './MentorFiltersProps.model';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

export const MentorFilters: FC<MentorFiltersProps> = (props) => {
  const { data, setFilterFlags, filterFlag, setDates } = props;

  const [tags, setTags] = useStickyState([], 'tags');
  const [course, setCourse] = useStickyState([], 'course');
  const [place, setPlace] = useStickyState([], 'place');
  const [datesLocalStorage, setDatesLocalStorage] = useStickyState([], 'dates');

  const [form] = Form.useForm();

  let initialKey = 1;

  const getKey = () => {
    const key = initialKey;
    initialKey++;
    return key;
  };

  function dateChange(value: any): void {
    if (value === null) {
      setDates([]);
      setDatesLocalStorage([]);
      return;
    }
    const dates = value?.map((item: any) => item._d);
    setDatesLocalStorage(dates);
    setDates(dates);
  }

  function handleChange(tag: string, value: Array<string>): void {
    const keys = Object.keys(filterFlag);

    const flag: any = {};
    flag[tag] = value;
    if (keys.includes(tag)) {
      if (filterFlag[tag].includes(value)) {
        return;
      }
      const newFlag = { ...filterFlag, ...flag };
      setFilterFlags(newFlag);
    }
    const newFlag = { ...filterFlag, ...flag };
    setFilterFlags(newFlag);
  }

  const optionCreate = (data: any, tag: string) => {
    const labels: any = [];
    const option: Array<JSX.Element> = data.map((item: any) => {
      if (item[tag] === undefined) {
        return null;
      }
      // @ts-ignore
      if (labels.includes(item[tag]) | (item[tag].trim() === '')) {
        return null;
      }
      const splitItem = item[tag].split(',');
      if (splitItem.length > 1) {
        return splitItem.map((item: string) => {
          if (labels.includes(item)) {
            return null;
          } else {
            labels.push(item);
            return (
              <Option value={item} key={getKey()}>
                {item}
              </Option>
            );
          }
        });
      } else {
        labels.push(item[tag]);
        return (
          <Option value={item[tag]} key={getKey()}>
            {item[tag]}
          </Option>
        );
      }
    });
    return option.flat();
  };

  // очистка, работает на второй клик, так как область видимости, остальные set добавлять пока не стала
  const onReset = useCallback(() => {
    form.resetFields();
    setFilterFlags({});
    setDates([]);
    setTags([]);
  }, [setFilterFlags, setDates, form, setTags]);

  const filters = (
    <div className="filters">
      <Form
        className="filters_select"
        form={form}
        name="control-hooks"
        initialValues={{
          type: tags,
          course,
          place,
          datesLocalStorage: [moment(datesLocalStorage[0]), moment(datesLocalStorage[1])],
        }}
      >
        <Form.Item name="organizer" className="filters_select_item" key="1">
          <Select
            mode="multiple"
            placeholder="Organizer"
            onChange={(value: string[]) => {
              handleChange('organizer', value);
            }}
            allowClear
          >
            {optionCreate(data, 'organizer')}
          </Select>
        </Form.Item>
        <Form.Item name="type" className="filters_select_item" key="2">
          <Select
            mode="multiple"
            placeholder="Type"
            onChange={(value: string[]) => {
              setTags(value);
              handleChange('type', value);
            }}
            allowClear
          >
            {optionCreate(data, 'type')}
          </Select>
        </Form.Item>
        <Form.Item name="course" className="filters_select_item" key="3">
          <Select
            placeholder="Course"
            mode="multiple"
            onChange={(value: string[]) => {
              setCourse(value);
              handleChange('course', value);
            }}
            allowClear
          >
            {optionCreate(data, 'course')}
          </Select>
        </Form.Item>
        <Form.Item name="place" className="filters_select_item" key="4">
          <Select
            mode="multiple"
            placeholder="Place"
            onChange={(value: string[]) => {
              setPlace(value);
              handleChange('place', value);
            }}
            allowClear
          >
            {optionCreate(data, 'place')}
          </Select>
        </Form.Item>
        <Form.Item name="datesLocalStorage" className="filters_select_item_range" key="5">
          <RangePicker onChange={dateChange} />
        </Form.Item>
      </Form>
      <Form.Item key="6">
        <Button className="filters_btn" onClick={() => onReset()} htmlType="button" danger>
          Clear
        </Button>
      </Form.Item>
      <Divider orientation="left" plain>
        Visible columns
      </Divider>
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
  );

  return (
    <Collapse bordered={false}>
      <Panel header="Filters (click to open)" key="1">
        {filters}
      </Panel>
    </Collapse>
  );
};
