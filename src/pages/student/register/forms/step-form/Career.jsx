import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormCareerInfoFieldValidation } from '@/data/util';
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

const Career = ({ currentSize }) => {
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
        width={currentSize}
        label="ENTITY EMPLOYER"
        name="entityEmployer"
        rules={proFormCareerInfoFieldValidation.entityEmployer}
        placeholder="Please enter entity employer"
      />
      <ProFormDigit
        width={currentSize}
        label="NO OF EMPLOYEES"
        name="noOfEmployees"
        rules={proFormCareerInfoFieldValidation.noOfEmployees}
        placeholder="Please enter number of employees"
      />

      <ProFormText
        width={currentSize}
        label="PROFESSION LOCALITY"
        name="professionLocality"
        rules={proFormCareerInfoFieldValidation.professionLocality}
        placeholder="Please enter employment locality"
      />
      <ProFormText
        width={currentSize}
        label="FUNCTIONALITY"
        name="functionality"
        rules={proFormCareerInfoFieldValidation.functionality}
        placeholder="Please enter functionality"
      />
      <ProFormText
        width={currentSize}
        label="EDUCATION LEVEL"
        name="educationLevel"
        rules={proFormCareerInfoFieldValidation.educationLevel}
        placeholder="Please enter education level"
      />

      <ProFormTextArea
        fieldProps={{ rows: 1 }}
        width={currentSize}
        label="Other Qualifications(if any)"
        name="otherQualification"
        rules={proFormCareerInfoFieldValidation.otherQualification}
        placeholder="Please enter other qualifications (if any)"
      />
      <ProFormRadio.Group
        layout={currentSize == 'sm' ? 'vertical' : 'horizontal'}
        width={currentSize}
        name="employmentStatus"
        label="EMPLOYMENT STATUS"
        rules={proFormCareerInfoFieldValidation.employmentStatus}
        options={employmentStatusOptions}
      />
    </>
    // </ProCard>
  );
};

export default Career;
