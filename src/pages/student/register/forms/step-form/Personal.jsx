import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import React from 'react';
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

const Personal = ({ fileList, setFileList, setMobileString, mobileString }) => {
  return (
    // <ProCard
    //   bordered
    //   // collapsible
    //   style={{
    //     marginBlockEnd: 16,
    //     minWidth: 800,
    //     maxWidth: '100%',
    //   }}
    // >
    <>
      <ProFormText
        width="md"
        label="Name"
        name="name"
        rules={proFormPersonaInfoFieldValidation.name}
        placeholder="Please enter name"
      />
      <ProFormText
        width="md"
        label="email"
        name="email"
        rules={proFormPersonaInfoFieldValidation.email}
        placeholder="Please enter email"
      />

      {/* <CustomPhoneInput /> */}

      <ProFormDatePicker
        validateFirst
        width={'md'}
        name="dob"
        label="Date of Birth"
        rules={proFormPersonaInfoFieldValidation.dob}
      />
      <ProFormText
        width="md"
        label="Telephone Number"
        name="telePhone"
        // rules={proFormPersonaInfoFieldValidation.telePhone}
        placeholder="Please enter telephone number"
      />
      <ProFormRadio.Group width={'md'} name="sex" label="Gender" options={genderOptions} />

      <ProForm.Item
        name={'mobile'}
        width="md"
        label="Phone"
        placeholder="Please enter phone"
        rules={proFormPersonaInfoFieldValidation.mobile}
      >
        <CustomPhoneInput setMobileString={setMobileString} />
      </ProForm.Item>

      <br />
      <ProForm.Item
        name="image"
        style={{ marginLeft: '', minWidth: '300px' }}
        label="Document Image"
      >
        <CustomUpload
          multiple={true}
          fileList={fileList}
          setFileList={setFileList}
          maxFileLength={5}
        />
      </ProForm.Item>
    </>
    // </ProCard>
  );
};

export default Personal;
