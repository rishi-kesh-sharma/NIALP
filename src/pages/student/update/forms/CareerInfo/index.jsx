import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation } from '@/data/util';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, careerInfo }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('educationLevel', values.educationLevel);
    formData.append('employmentStatus', values.employmentStatus);
    formData.append('employmentLocality', values.employmentLocality);
    formData.append('functionality', values.dob);
    await updateStudent(formData);
    setFileList([]);
    await updateStudent(values);
  };
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: careerInfo })}>
        <ProFormText
          width="lg"
          label="Education Level"
          name="educationLevel"
          rules={proFormAddressInfoFieldValidation.educationLevel}
          placeholder="Please enter education level"
        />
        <ProFormText
          width="lg"
          label="Employment Status"
          name="employmentStatus"
          rules={proFormAddressInfoFieldValidation.employmentStatus}
          placeholder="Please enter employment status"
        />
        <ProFormText
          width="lg"
          label="Employment Locality"
          name="employmentLocality"
          rules={proFormAddressInfoFieldValidation.employmentLocality}
          placeholder="Please enter employment locality"
        />

        <ProFormText
          width="lg"
          label="Functionality"
          name="functionality"
          rules={proFormAddressInfoFieldValidation.functionality}
          placeholder="Please enter functionality"
        />
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
