import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CustomPhoneInput = (props) => {
  const { setMobileString, mobile: mobileInfo } = props;
  const [mobile, setMobile] = useState({
    country: '',
    formattedValue: '',
    name: '',
    dialCode: '',
    format: '',
    rawPhone: '',
  });
  useEffect(() => {
    setMobileString(() => JSON.stringify(mobile));
  }, [mobile]);

  useEffect(() => {
    setMobile(mobileInfo ? JSON.parse(mobileInfo) : {});
  }, []);
  const handleChange = (value, data, event, formattedValue) => {
    const rawPhone = value.slice(data.dialCode.length);
    setMobile({ ...data, formattedValue, rawPhone: rawPhone });
    console.log(value, 'value');
    console.log(data, 'data');
    console.log(formattedValue, 'formattedValue');
  };
  console.log(mobile, 'mobile');
  return (
    <PhoneInput
      prefix="+"
      enableSearch
      value={mobile.formattedValue}
      onChange={handleChange}
      autoFormat={false}
      country={mobile.country}
    />
  );
};

export default CustomPhoneInput;
