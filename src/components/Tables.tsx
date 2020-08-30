import React from "react";
import { TablesProps } from "./TablesProps.model";
import { Table, Tag, Space } from "antd";

const columns = [
  {
    title: "Дата(Date)",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Время(Time)",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Срок на выполнение задачи(Time to complete) ",
    dataIndex: "timeToComplete",
    key: "timeToComplete",
  },
  {
    title: "Неделя обучения(Week)",
    dataIndex: "week",
    key: "week",
  },
  {
    title: "Курс обучения(Course)",
    dataIndex: "course",
    key: "course",
  },
  {
    title: "Тип задания(Tags)",
    key: "tags",
    dataIndex: "tags",
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          return (
            <Tag color={tag.color} key={tag.text}>
              {tag.text.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const dataSource = [
  {
    key: "1",
    date: "20.20.2020",
    time: 32,
    timeToComplete: "20 дней",
    week: 2,
    course: "React",
    tags: [
      {
        color: "red",
        text: "deadline",
      },
      {
        color: "volcano",
        text: "deadline",
      },
    ],
  },
  {
    key: "2",
    date: "Jim Green",
    time: 42,
    timeToComplete: "London No. 1 Lake Park",
    week: 2,
    course: "React",
    tags: [
      {
        color: "red",
        text: "deadline",
      },
      {
        color: "lime",
        text: "deadline",
      },
    ],
  },
  {
    key: "3",
    date: "Joe Black",
    time: 32,
    timeToComplete: "Sidney No. 1 Lake Park",
    week: 2,
    course: "React",
    tags: [
      {
        color: "red",
        text: "deadline",
      },
      {
        color: "lime",
        text: "deadline",
      },
    ],
  },
];
export const Tables: React.FC<TablesProps> = () => {
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
