import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormCareerInfoFieldValidation, regexData } from '@/data/util';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, civilInfo }) => {
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
      <ProForm {...getFormProps({ form, onFinish, resource: civilInfo })}>
        <ProFormText
          width="lg"
          label="Birth Place"
          name="birthPlace"
          rules={proFormCareerInfoFieldValidation.birthPlace}
          placeholder="Please enter birth place"
        />
        <ProFormText
          width="lg"
          label="Postal Number"
          name="postal"
          rules={proFormCareerInfoFieldValidation.postal}
          placeholder="Please enter postal number"
        />
        <ProFormText
          width="lg"
          label="residencyNo"
          name="residencyNo"
          rules={proFormCareerInfoFieldValidation.residencyNo}
          placeholder="Please enter residencyNo"
        />
        <ProFormText
          width="lg"
          label="Seguranca Social No"
          name="segurancaSocialNo"
          rules={proFormCareerInfoFieldValidation.segurancaSocialNo}
          placeholder="Please enter seguranca social no"
        />
        <ProFormText
          width="lg"
          label="NIF No"
          name="nifNo"
          rules={proFormCareerInfoFieldValidation.nifNo}
          placeholder="Please enter seguranca nif no"
        />

        <ProFormDatePicker
          validateFirst
          width={'lg'}
          name="expireDate"
          label="Expiry Date"
          rules={proFormCareerInfoFieldValidation.expireDate}
        />
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
