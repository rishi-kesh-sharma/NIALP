import CustomPhoneInput from '@/components/CustomPhoneInput';
import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormAddressInfoFieldValidation, proFormPersonaInfoFieldValidation } from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormDatePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const Address = (props) => {
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
        label="Address"
        name="address"
        rules={proFormAddressInfoFieldValidation.address}
        placeholder="Please enter address"
      />
      <ProFormText
        width="lg"
        label="Locality"
        name="locality"
        rules={proFormAddressInfoFieldValidation.locality}
        placeholder="Please enter locality"
      />
      <ProFormText
        width="lg"
        label="Postal No"
        name="postal"
        rules={proFormAddressInfoFieldValidation.postal}
        placeholder="Please enter postal number"
      />
      <ProFormText
        width="lg"
        label="Municipality"
        name="municipality"
        rules={proFormAddressInfoFieldValidation.municipality}
        placeholder="Please enter municipality"
      />
      <ProFormText
        width="lg"
        label="District"
        name="district"
        rules={proFormAddressInfoFieldValidation.district}
        placeholder="Please enter district"
      />
    </>
    // </ProCard>
  );
};

export default Address;
