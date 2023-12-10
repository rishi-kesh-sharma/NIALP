import { Button, Form, Input, message } from 'antd';
import { changePassword } from '../service';

const ChangePassword = ({ data }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formdata = { ...values, id: data?._id };
    const result = await changePassword(formdata);
    if (result instanceof Error || result.status == 'error') {
      message.error(result.message);
    } else {
      message.success(result.message);
    }
    // if (result.status === 200) {
    //   console.log('hello');
    //   message.success('Password changed successfully');
    // }
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        label="Confirm Password"
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
};

export default ChangePassword;
