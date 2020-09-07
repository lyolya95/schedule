import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./Tables.scss";
import { Table, Input, Button, Popconfirm, Form, Tag } from "antd";

interface IEditableCell {
  title?: any;
  editable?: number;
  children?: number;
  dataIndex?: number;
  record?: number;
  handleSave?: number;
}

const EditableContext = React.createContext({});

const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: {
  [x: string]: any;
  title: any;
  editable: any;
  children: any;
  dataIndex: any;
  record: any;
  handleSave: any;
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef: any = useRef();
  const form: any = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (event: MouseEvent) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Дата",
        dataIndex: "date",
        editable: true,
      },
      {
        title: "Время",
        dataIndex: "time",
        editable: true,
      },
      {
        title: "Срок на выполнение задачи",
        dataIndex: "timeToComplete",
        editable: true,
      },
      {
        title: "Неделя обучения",
        dataIndex: "week",
        editable: true,
      },
      {
        title: "Курс обучения",
        dataIndex: "course",
        editable: true,
      },
      {
        title: "Тип задания",
        dataIndex: "tags",
        editable: false,
        render: (tags) => (
          <span>
            {tags
              ? tags.map((tag) => {
                  let color = tag.length > 5 ? "geekblue" : "green";
                  if (tag === "loser") {
                    color = "volcano";
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })
              : null}
          </span>
        ),
      },
      {
        title: "Место проведения",
        dataIndex: "place",
        editable: true,
      },
      {
        title: "Название события/тема",
        dataIndex: "name",
        editable: true,
      },
      {
        title: "Ментор/лектор",
        dataIndex: "organizer",
        editable: true,
      },
      {
        title: "Ссылка на задание",
        dataIndex: "url",
        editable: true,
      },
      {
        title: "Домашнее задание",
        dataIndex: "task",
        editable: true,
      },
      {
        title: "Материалы",
        dataIndex: "materials",
        editable: true,
      },
      {
        title: "Result",
        dataIndex: "result",
        editable: true,
      },
      {
        title: "Комментарий",
        dataIndex: "comment",
        editable: true,
      },
      {
        title: "Важность",
        dataIndex: "importance",
        editable: true,
      },
      {
        title: "Готовность",
        dataIndex: "done",
        editable: true,
      },
      {
        title: "Оценка по проверке/возможная оценка",
        dataIndex: "score",
        editable: true,
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <button>Delete</button>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: "0",
          time: "09:00",
          timeToComplete: "20 дней",
          date: "02.09.2020",
          week: "3",
          course: "React",
          place: "онлайн трансляция",
          name: "Работа с Git",
          organizer: "Ольга Миронян",
          url: "https://www.youtube.com/c/RollingScopesSchool/videos",
          task: "Создать первый коммит",
          materials: "Изучение веток git hubr",
          result: "что студент должен уметь",
          comment: "Тут будет комментарий",
          importance: "bool",
          done: "bool",
          score: "number/number",
          tags: ["nice", "developer"],
        },
        {
          key: "1",
          time: "09:00",
          timeToComplete: "20 дней",
          date: "02.09.2020",
          week: "3",
          course: "React",
          place: "онлайн трансляция",
          name: "Работа с Git",
          organizer: "Ольга Миронян",
          url: "https://www.youtube.com/c/RollingScopesSchool/videos",
          task: "Создать первый коммит",
          materials: "Изучение веток git hubr",
          result: "что студент должен уметь",
          comment: "Тут будет комментарий",
          importance: "bool",
          done: "bool",
          score: "number/number",
          tags: ["nice", "developer"],
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      time: "09:00",
      timeToComplete: "20 дней",
      date: "02.09.2020",
      week: "3",
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table components={components} rowClassName={() => "editable-row"} bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
export default EditableTable;
