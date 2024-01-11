import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
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
        width="lg"
        label="NAME"
        name="name"
        // rules={proFormPersonaInfoFieldValidation.name}
        placeholder="Please enter name"
      />
      <ProFormText
        width="lg"
        label="EMAIL"
        name="email"
        // rules={proFormPersonaInfoFieldValidation.email}
        placeholder="Please enter email"
      />

      {/* <CustomPhoneInput /> */}

      <ProFormDatePicker
        validateFirst
        width={'lg'}
        name="dob"
        label="DATE OF BIRTH"
        // rules={proFormPersonaInfoFieldValidation.dob}
      />
      <ProFormDigit
        validateFirst
        width={'lg'}
        name="age"
        label="Age"
        // rules={proFormPersonaInfoFieldValidation.age}
      />
      <ProFormText
        width="lg"
        label="TELEPHONE NUMBER"
        name="telePhone"
        // rules={proFormPersonaInfoFieldValidation.telePhone}
        placeholder="Please enter telephone number"
      />
      <ProFormRadio.Group width={'lg'} name="sex" label="GENDER" options={genderOptions} />

      <br />

      {/* address */}
      <>
        <ProFormText
          width="lg"
          label="ADDRESS IN PORTUGAL"
          name="address"
          // rules={proFormAddressInfoFieldValidation.address}
          placeholder="Please enter address"
        />
        <ProFormText
          width="lg"
          label="LOCALITY"
          name="locality"
          // rules={proFormAddressInfoFieldValidation.locality}
          placeholder="Please enter locality"
        />
        <ProFormText
          width="lg"
          label="Postal No"
          name="postal"
          // rules={proFormAddressInfoFieldValidation.postal}
          placeholder="Please enter postal number"
        />
        <ProFormText
          width="lg"
          label="MUNICIPALITY"
          name="municipality"
          // rules={proFormAddressInfoFieldValidation.municipality}
          placeholder="Please enter municipality"
        />
        <ProFormText
          width="lg"
          label="DISTRICT"
          name="district"
          // rules={proFormAddressInfoFieldValidation.district}
          placeholder="Please enter district"
        />
      </>
      {/* address */}

      <ProForm.Item
        style={{ marginLeft: '0.4rem !important' }}
        name={'mobile'}
        width="lg"
        label="MOBILE NUMBER"
        placeholder="Please enter mobile number"
        // rules={proFormPersonaInfoFieldValidation.mobile}
      >
        <CustomPhoneInput setMobileString={setMobileString} />
      </ProForm.Item>
      <ProForm.Group grid={true} colProps={{ span: 11 }}>
        <ProForm.Item
          name="image"
          style={{ marginLeft: '', minWidth: '300px' }}
          label="RESIDENT CARD COPY (pdf)"
        >
          <CustomUpload
            multiple={true}
            fileList={residentCardCopyFileList}
            setFileList={setResidentCardCopyFileList}
            maxFileLength={5}
          />
        </ProForm.Item>
        <ProForm.Item
          name="image"
          style={{ marginLeft: '', minWidth: '300px' }}
          label="PAYMENT PROOF (pdf or image)"
        >
          <CustomUpload
            multiple={true}
            fileList={paymentProofFileList}
            setFileList={setPaymentProofFileList}
            maxFileLength={5}
          />
        </ProForm.Item>
      </ProForm.Group>
    </>
    // </ProCard>
  );
};

export default Personal;
