import getFormProps from '@/data/getFormProps';
import { proFormPaymentInfoFieldValidation } from '@/data/util';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, paymentInfo }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // const formData = new FormData();
    // formData.append('name', values.name);
    // formData.append('mobile', values.mobile);
    // formData.append('email', values.email);
    // formData.append('dob', values.dob);
    // formData.append('sex', values.sex);
    // formData.append('telPhone', values.telPhone);
    // formData.append('image', fileList[0].originFileObj);
    // await updateStudent(formData);
    // setFileList([]);
    await updateStudent(values);
  };
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: paymentInfo })}>
        <ProFormText
          width="lg"
          label="Payment Status"
          name="paymentStatus"
          rules={proFormPaymentInfoFieldValidation.paymentStatus}
          disabled
        />
        <ProFormText
          width="lg"
          label="Total Payable Fee"
          name="payableFee"
          rules={proFormPaymentInfoFieldValidation.payableFee}
          placeholder="Please enter total payable fee"
        />
        <ProFormText
          width="lg"
          label="Paid Fee"
          name="paidFee"
          rules={proFormPaymentInfoFieldValidation.paidFee}
          placeholder="Please enter fee paid"
        />
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
