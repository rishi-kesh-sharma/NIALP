import getFormProps from '@/data/getFormProps';
import { proFormPaymentInfoFieldValidation } from '@/data/util';
import ProForm, { ProFormMoney, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, paymentInfo }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('payableFee', values.payableFee);
    formData.append('paidFee', values.paidFee);

    await updateStudent(formData);
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
        <ProFormMoney
          width="lg"
          label="Total Payable Fee"
          name="payableFee"
          locale="es-ES"
          rules={proFormPaymentInfoFieldValidation.payableFee}
          placeholder="Please enter total payable fee"
        />
        <ProFormMoney
          width="lg"
          label="Paid Fee"
          name="paidFee"
          locale="es-ES"
          rules={proFormPaymentInfoFieldValidation.paidFee}
          placeholder="Please enter fee paid"
        />
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
