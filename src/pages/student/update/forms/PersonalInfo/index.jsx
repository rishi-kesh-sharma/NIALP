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

const PersonalInfo = ({ setTab, resource, updateStudent, personalInfo }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const files = useGetFileFromUrl({ resource: personalInfo });

  const onFinish = async (values) => {
    console.log(values, 'values');
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('mobile', values?.mobile);
    formData.append('email', values?.email);
    formData.append('dob', values?.dob);
    formData.append('sex', values?.sex);
    formData.append('telePhone', values?.telePhone);
    formData.append('image', fileList?.[0]?.originFileObj);

    await updateStudent(formData);
    // setFileList([]);
  };
  useEffect(() => {
    setFileList(files);
  }, [files]);

  return (
    <div>
      <ProForm
        initialValues={personalInfo}
        {...getFormProps({ form, onFinish, resource: personalInfo })}
      >
        <ProFormText
          width="lg"
          label="Name"
          name="name"
          rules={proFormPersonaInfoFieldValidation.name}
          placeholder="Please enter name"
        />
        <ProFormText
          width="lg"
          label="Mobile Number"
          name="mobile"
          rules={proFormPersonaInfoFieldValidation.mobile}
          placeholder="Please enter mobile"
        />
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
          rules={proFormPersonaInfoFieldValidation.telePhone}
          placeholder="Please enter telephone number"
        />

        <ProForm.Item name="image" style={{ marginLeft: '' }} label="Document Image">
          <CustomUpload fileList={fileList} setFileList={setFileList} />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default PersonalInfo;
