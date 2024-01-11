import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormDateTimePicker,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormMoney,
} from '@ant-design/pro-form';
import styles from './styles.less';
import { Button, Col, Form, Result, Row, Upload, message } from 'antd';
import { useState } from 'react';
import { proFormPaymentInfoFieldValidation } from '@/data/util';
import { update } from '../service';

const PaymentDetailModalForm = (props) => {
  const { visible, children, setVisible, current, studentId, setFetchResource } = props;
  const [form] = Form.useForm();
  const callApi = async (values) => {
    const formData = new FormData();
    formData.append('payableFee', values.payableFee);
    formData.append('paidFee', values.paidFee);
    const result = await update(studentId, formData);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!!');
    } else {
      message.success(result.message || 'Updated successfully !!!');
      form.resetFields();
    }
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onSubmit = async (values) => {
    console.log(values, 'the values1');
    await callApi(values);
    console.log('submitted');
    setFetchResource(true);
    setVisible(false);
  };

  console.log(current, 'current');
  return (
    <ModalForm
      title="Update Payment"
      size="small"
      visible={visible}
      className={styles.standardListForm}
      width={400}
      initialValues={current}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        console.log('finished');
        onSubmit(values);
        console.log(values, 'the values');
      }}
      modalProps={{
        onCancel: () => onCancel(),
        onOk: (values) => onSubmit(values),
        destroyOnClose: true,
      }}
    >
      <>
        <ProFormMoney
          locale="es-ES"
          width="lg"
          label="Payable Fee"
          name="payableFee"
          rules={proFormPaymentInfoFieldValidation.payableFee}
          placeholder="Please enter payable fee"
        />
        <ProFormMoney
          locale="es-ES"
          width="lg"
          label="Paid Fee"
          name="paidFee"
          rules={proFormPaymentInfoFieldValidation.paidFee}
          placeholder="Please enter paid fee"
        />
      </>
    </ModalForm>
  );
};

export default PaymentDetailModalForm;
