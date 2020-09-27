import  React, { FC } from 'react';
import { Form, Button, Input, message } from "antd";
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { FeedbackFormProps } from './FeedbackForm.model';
import './FeedbackForm.scss';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  export const FeedbackForm:FC<FeedbackFormProps> =  React.memo(({eventData, putDataEvent}) => {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
      };

    const onFinish = async (values:Store) => {
        eventData.feedbacks = eventData.feedbacks ? [...eventData.feedbacks, values.message] : [values.message];
        await putDataEvent(eventData.id, eventData);
        message.success('Your message send');
        form.resetFields();
    };
    
    const onFinishFailed = (errorInfo:ValidateErrorEntity) => {
          message.error('Failed. Check your message');
    };

    return(
        <div>
        <Form
            form={form} 
            name="feedback"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="You can send you proposal, remark or delight about event"
                name="message"
                rules={[{ required: true, message: 'Please input your message!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button
                    htmlType="submit"
                    type="primary"
                >
                    Send
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
});