import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormItem,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form';
import { Col, Row } from 'antd';
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

const Personal = ({
  currentSize,
  residentCardCopyFileList,
  setResidentCardCopyFileList,
  paymentProofFileList,
  setPaymentProofFileList,
  setMobileString,
  mobileString,
}) => {
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
        style={{ width: '100% !important' }}
        width={currentSize}
        label="NAME"
        name="name"
        rules={proFormPersonaInfoFieldValidation.name}
        placeholder="Please enter name"
      />
      <ProFormText
        width={currentSize}
        label="EMAIL"
        name="email"
        rules={proFormPersonaInfoFieldValidation.email}
        placeholder="Please enter email"
      />

      {/* <CustomPhoneInput /> */}

      <ProFormDatePicker
        validateFirst
        width={'lg'}
        name="dob"
        label="DATE OF BIRTH"
        rules={proFormPersonaInfoFieldValidation.dob}
      />
      <ProFormText
        // validateFirst
        width={currentSize}
        name="age"
        label="Age"
        rules={proFormPersonaInfoFieldValidation.age}
      />
      <ProFormText
        width={currentSize}
        label="TELEPHONE NUMBER"
        name="telePhone"
        // rules={proFormPersonaInfoFieldValidation.telePhone}
        placeholder="Please enter telephone number"
      />
      <ProFormRadio.Group
        rules={proFormPersonaInfoFieldValidation.gender}
        width={currentSize}
        name="sex"
        label="GENDER"
        options={genderOptions}
      />

      <br />

      {/* address */}
      <>
        <ProFormText
          width={currentSize}
          label="ADDRESS IN PORTUGAL"
          name="address"
          rules={proFormAddressInfoFieldValidation.address}
          placeholder="Please enter address"
        />
        <ProFormText
          width={currentSize}
          label="LOCALITY"
          name="locality"
          rules={proFormAddressInfoFieldValidation.locality}
          placeholder="Please enter locality"
        />
        <ProFormText
          width={currentSize}
          label="Postal No"
          name="postal"
          rules={proFormAddressInfoFieldValidation.postal}
          placeholder="Please enter postal number"
        />
        <ProFormText
          width={currentSize}
          label="MUNICIPALITY"
          name="municipality"
          rules={proFormAddressInfoFieldValidation.municipality}
          placeholder="Please enter municipality"
        />
        <ProFormText
          width={currentSize}
          label="DISTRICT"
          name="district"
          rules={proFormAddressInfoFieldValidation.district}
          placeholder="Please enter district"
        />
      </>
      {/* address */}

      <ProForm.Item
        style={{ marginLeft: '0rem !important', width: '29.16%' }}
        name={'mobile'}
        // width={currentSize}
        label="MOBILE NUMBER"
        placeholder="Please enter mobile number"
        // rules={proFormPersonaInfoFieldValidation.mobile}
      >
        <CustomPhoneInput setMobileString={setMobileString} />
      </ProForm.Item>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} direction="horizontal">
        <ProForm.Item
          className="my-upload"
          name="image"
          // style={{ marginLeft: '', minWidth: '300px' }}
          label="RESIDENT CARD COPY (pdf or images)"
        >
          <CustomUpload
            multiple={true}
            fileList={residentCardCopyFileList}
            setFileList={setResidentCardCopyFileList}
            maxFileLength={5}
          />
        </ProForm.Item>
        <ProForm.Item
          className="my-upload"
          name="image"
          style={{ marginLeft: '', minWidth: '300px' }}
          // label="PAYMENT PROOF (pdf or image)"
          label="PAYMENT PROOF (image)"
        >
          <CustomUpload
            multiple={false}
            fileList={paymentProofFileList}
            setFileList={setPaymentProofFileList}
            maxFileLength={5}
          />
        </ProForm.Item>
      </div>
    </>
    // </ProCard>
  );
};

export default Personal;
