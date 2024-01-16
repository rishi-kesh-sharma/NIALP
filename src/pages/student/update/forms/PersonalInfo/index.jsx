import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormPersonaInfoFieldValidation, regexData } from '@/data/util';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import { getUrlExtension } from '@/utils';
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
  const [mobileString, setMobileString] = useState('');

  const files = useGetFileFromUrl({
    resource: personalInfo,
    multiple: true,
    fieldName: 'residentCardCopy',
  });
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('mobile', mobileString);
    formData.append('email', values?.email);
    formData.append('dob', values?.dob);
    formData.append('sex', values?.sex);
    formData.append('telePhone', values?.telePhone);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('residentCardCopy', fileList?.[i]?.originFileObj);
    }
    await updateStudent(formData);
  };
  useEffect(() => {
    setFileList(files);
  }, [files]);

  console.log(personalInfo.residentCardCopy);
  console.log(fileList, 'fileList');

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
        {/* <ProFormText
          width="lg"
          label="Mobile Number"
          name="mobile"
          rules={proFormPersonaInfoFieldValidation.mobile}
          placeholder="Please enter mobile"
        /> */}
        {/* <ProForm.Item
          name={'mobile'}
          width="lg"
          label="Phone"
          //  rules={proFormPersonaInfoFieldValidation.email}
          placeholder="Please enter phone"
          rules={proFormPersonaInfoFieldValidation.mobile}
        >
          <CustomPhoneInput setMobileString={setMobileString} />
        </ProForm.Item> */}
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
          width={'lg'}
          name="dob"
          label="Date of Birth"
          rules={proFormPersonaInfoFieldValidation.updateDob}
        />
        <ProFormText
          width="lg"
          label="Telephone Number"
          name="telePhone"
          // rules={proFormPersonaInfoFieldValidation.telePhone}
          placeholder="Please enter telephone number"
        />

        <ProForm.Item
          // rules={proFormPersonaInfoFieldValidation.mobile}
          style={{ marginLeft: '0rem !important' }}
          name={'mobile'}
          // width={currentSize}
          label="MOBILE NUMBER"
          placeholder="Please enter mobile number"
          // rules={proFormPersonaInfoFieldValidation.mobile}
        >
          <CustomPhoneInput setMobileString={setMobileString} mobile={personalInfo.mobile} />
        </ProForm.Item>
        {fileList?.map((item) => {
          const fileExt = getUrlExtension(item.name);
          console.log(fileExt, 'fileEXt');
        })}
        <ProForm.Item
          name="residentCardCopy"
          style={{ marginLeft: '' }}
          label="Resident Card Copy Image"
        >
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
