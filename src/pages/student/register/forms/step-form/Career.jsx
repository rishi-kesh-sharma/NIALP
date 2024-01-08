import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const Career = (props) => {
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
        label="employmentLocality"
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
    </>
    // </ProCard>
  );
};

export default Career;
