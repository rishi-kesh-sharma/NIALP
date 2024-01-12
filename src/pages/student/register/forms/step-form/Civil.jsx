import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCareerInfoFieldValidation,
  proFormCivilInfoFieldValidation,
  proFormPersonaInfoFieldValidation,
} from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const Civil = ({ currentSize }) => {
  console.log(currentSize, 'currentSize');
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
        label="NATIONALITY"
        name="nationality"
        rules={proFormCivilInfoFieldValidation.nationality}
        placeholder="Please enter nationality"
      />
      <ProFormText
        width={currentSize}
        label="BIRTH PLACE"
        name="birthPlace"
        rules={proFormCivilInfoFieldValidation.birthPlace}
        placeholder="Please enter birth place"
      />

      <ProFormText
        width={currentSize}
        label="RESIDENCY NO"
        name="residencyNo"
        rules={proFormCivilInfoFieldValidation.residencyNo}
        placeholder="Please enter residency no"
      />
      <ProFormText
        width={currentSize}
        label="SEGURANCA SOCIAL NO"
        name="segurancaSocialNo"
        rules={proFormCivilInfoFieldValidation.segurancaSocialNo}
        placeholder="Please enter seguranca social no"
      />
      <ProFormText
        width={currentSize}
        label="NIF NO"
        name="nifNo"
        rules={proFormCivilInfoFieldValidation.nifNo}
        placeholder="Please enter seguranca nif no"
      />
      <ProFormDatePicker
        validateFirst
        width={currentSize}
        name="expireDate"
        label="EXPIRY DATE"
        rules={proFormCivilInfoFieldValidation.expireDate}
      />
    </>
    // </ProCard>
  );
};

export default Civil;
