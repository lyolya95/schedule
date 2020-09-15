import  React from 'react';
import { Form, Button, Input, message } from "antd";
import { Store } from "antd/lib/form/interface";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import './FeedbackForm.scss';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
const FeedbackForm = () => {
    const { TextArea } = Input;
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
      };

    const onFinish = (values:Store) => {
        console.log('Success:', values);
        message.success('Your message send');
        form.resetFields();
    };
    
    const onFinishFailed = (errorInfo:ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
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
}

export default FeedbackForm;