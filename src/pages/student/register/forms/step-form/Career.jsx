import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import React from 'react';
const employmentStatusOptions = [
  {
    label: 'UNEMPLOYED 1ST JOB',
    value: 'unemployed',
  },
  {
    label: 'UNEMPLOYED NDLD(<12 MONTHS)',
    value: 'unemployed-ndld-lt-12',
  },
  {
    label: 'UNEMPLOYED NDLD(>12 MONTHS)',
    value: 'unemployed-ndld-gt-12',
  },
  {
    label: 'EMPLOYEE',
    value: 'employee',
  },
  {
    label: 'INACTIVE(STUDENT,RETIRED,OTHER)',
    value: 'inactive',
  },
  {
    label: 'SELF-EMPLOYED',
    value: 'self-employed',
  },
];

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
        width="xl"
        label="ENTITY EMPLOYER"
        name="entityEmployer"
        // rules={proFormAddressInfoFieldValidation.functionality}
        placeholder="Please enter entity employer"
      />
      <ProFormDigit
        width="xl"
        label="NO OF EMPLOYEES"
        name="noOfEmployees"
        // rules={proFormAddressInfoFieldValidation.functionality}
        placeholder="Please enter number of employees"
      />

      <ProFormText
        width="xl"
        label="PROFESSION LOCALITY"
        name="professionLocality"
        // rules={proFormAddressInfoFieldValidation.employmentLocality}
        placeholder="Please enter employment locality"
      />
      <ProFormText
        width="xl"
        label="FUNCTIONALITY"
        name="functionality"
        // rules={proFormAddressInfoFieldValidation.functionality}
        placeholder="Please enter functionality"
      />
      <ProFormText
        width="xl"
        label="EDUCATION LEVEL"
        name="educationLevel"
        // rules={proFormAddressInfoFieldValidation.educationLevel}
        placeholder="Please enter education level"
      />

      <ProFormRadio.Group
        layout="horizontal"
        width={'xl'}
        name="employmentStatus"
        label="EMPLOYMENT STATUS"
        options={employmentStatusOptions}
      />
      <ProFormTextArea
        width="xl"
        label="Other Qualifications(if any)"
        name="otherQualification"
        // rules={proFormAddressInfoFieldValidation.educationLevel}
        placeholder="Please enter other qualifications (if any)"
      />
    </>
    // </ProCard>
  );
};

export default Career;
