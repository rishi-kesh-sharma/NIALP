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
import { reEnrollStudent, update } from '../service';

const ReEnrollModalForm = (props) => {
  const {
    visible,
    children,
    setVisible,
    current,
    studentId,
    setFetchResource,
    shifts,
    classes,
    handleClassChange,
  } = props;
  const [form] = Form.useForm();
  const callApi = async (values) => {
    const classId = values.class;
    const shiftId = values.shift;
    const result = await reEnrollStudent(classId, shiftId, { studentId: studentId });
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

  // classes options
  const classesOptions = classes?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
  // shift options
  const shiftsOptions = shifts?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
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
        onSubmit(values);
      }}
      modalProps={{
        onCancel: () => onCancel(),
        onOk: (values) => onSubmit(values),
        destroyOnClose: true,
      }}
    >
      <ProFormSelect
        options={classesOptions}
        label={'Choose Class'}
        name={'class'}
        onMetaChange={handleClassChange}
        onChange={handleClassChange}
        rules={[{ required: true }]}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        name={'shift'}
        options={shiftsOptions}
        label={'Choose Shift'}
      />
    </ModalForm>
  );
};

export default ReEnrollModalForm;
