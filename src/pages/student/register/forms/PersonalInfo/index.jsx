import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormPersonaInfoFieldValidation, regexData } from '@/data/util';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';

const genderOptions = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

const PersonalInfo = ({ setTab, resource, updateStudent }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [mobileString, setMobileString] = useState('');
  const onFinish = async (values) => {
    console.log(values, 'values');
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('mobile', mobileString);
    formData.append('email', values?.email);
    formData.append('dob', values?.dob);
    formData.append('sex', values?.sex);
    formData.append('telePhone', values?.telePhone);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('image', fileList?.[i]?.originFileObj);
    }
    await updateStudent(formData);
  };

  console.log(fileList);

  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: resource })}>
        <ProFormText
          width="lg"
          label="Name"
          name="name"
          rules={proFormPersonaInfoFieldValidation.name}
          placeholder="Please enter name"
        />

        <ProForm.Item
          name={'mobile'}
          width="lg"
          label="Phone"
          //  rules={proFormPersonaInfoFieldValidation.email}
          placeholder="Please enter phone"
          rules={proFormPersonaInfoFieldValidation.mobile}
        >
          <CustomPhoneInput setMobileString={setMobileString} />
        </ProForm.Item>
        {/* <CustomPhoneInput /> */}
        <ProFormText
          width="lg"
          label="email"
          name="email"
          rules={proFormPersonaInfoFieldValidation.email}
          placeholder="Please enter email"
        />

        <ProFormRadio.Group name="sex" label="Gender" options={genderOptions} />
        <ProFormDatePicker
          validateFirst
          width={'lg'}
          name="dob"
          label="Date of Birth"
          rules={proFormPersonaInfoFieldValidation.dob}
        />
        <ProFormText
          width="lg"
          label="Telephone Number"
          name="telePhone"
          // rules={proFormPersonaInfoFieldValidation.telePhone}
          placeholder="Please enter telephone number"
        />
        <ProForm.Item name="image" style={{ marginLeft: '' }} label="Document Image">
          <CustomUpload
            multiple={true}
            fileList={fileList}
            setFileList={setFileList}
            maxFileLength={5}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default PersonalInfo;
