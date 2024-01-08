import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, regexData } from '@/data/util';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('address', values.address);
    formData.append('locality', values.locality);
    formData.append('postal', values.postal);
    formData.append('municipality', values.municipality);
    formData.append('district', values.district);
    await updateStudent(formData);
  };
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: resource })}>
        <ProFormText
          width="lg"
          label="Address"
          name="address"
          rules={proFormAddressInfoFieldValidation.address}
          placeholder="Please enter address"
        />
        <ProFormText
          width="lg"
          label="Locality"
          name="locality"
          rules={proFormAddressInfoFieldValidation.locality}
          placeholder="Please enter locality"
        />
        <ProFormText
          width="lg"
          label="Postal No"
          name="postal"
          rules={proFormAddressInfoFieldValidation.postal}
          placeholder="Please enter postal number"
        />

        <ProFormText
          width="lg"
          label="Municipality"
          name="municipality"
          rules={proFormAddressInfoFieldValidation.municipality}
          placeholder="Please enter municipality"
        />
        <ProFormText
          width="lg"
          label="District"
          name="district"
          rules={proFormAddressInfoFieldValidation.district}
          placeholder="Please enter district"
        />
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
