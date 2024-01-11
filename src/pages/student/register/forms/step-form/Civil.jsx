import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCareerInfoFieldValidation,
  proFormPersonaInfoFieldValidation,
} from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const Civil = (props) => {
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
        label="NATIONALITY"
        name="nationality"
        // rules={proFormCareerInfoFieldValidation.birthPlace}
        placeholder="Please enter nationality"
      />
      <ProFormText
        width="lg"
        label="BIRTH PLACE"
        name="birthPlace"
        // rules={proFormCareerInfoFieldValidation.birthPlace}
        placeholder="Please enter birth place"
      />
      {/* <ProFormText
          width="lg"
          label="Postal Number"
          name="postal"
          // rules={proFormCareerInfoFieldValidation.postal}
          placeholder="Please enter postal number"
        /> */}
      <ProFormText
        width="lg"
        label="RESIDENCY NO"
        name="residencyNo"
        // rules={proFormCareerInfoFieldValidation.residencyNo}
        placeholder="Please enter residency no"
      />
      <ProFormText
        width="lg"
        label="SEGURANCA SOCIAL NO"
        name="segurancaSocialNo"
        // rules={proFormCareerInfoFieldValidation.segurancaSocialNo}
        placeholder="Please enter seguranca social no"
      />
      <ProFormText
        width="lg"
        label="NIF NO"
        name="nifNo"
        // rules={proFormCareerInfoFieldValidation.nifNo}
        placeholder="Please enter seguranca nif no"
      />
      <ProFormDatePicker
        validateFirst
        width={'lg'}
        name="expireDate"
        label="EXPIRY DATE"
        // rules={proFormCareerInfoFieldValidation.expireDate}
      />
    </>
    // </ProCard>
  );
};

export default Civil;
