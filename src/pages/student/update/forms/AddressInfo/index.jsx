import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, regexData } from '@/data/util';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, addressInfo }) => {
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
      <ProForm {...getFormProps({ form, onFinish, resource: addressInfo })}>
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
