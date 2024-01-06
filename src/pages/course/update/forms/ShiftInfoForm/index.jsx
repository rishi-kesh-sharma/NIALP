import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCourseFieldValidation,
  regexData,
} from '@/data/util';
import ProForm, {
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { Card, Form, Typography, Upload, message } from 'antd';
import React, { useState } from 'react';

const ShiftInfoForm = ({ setTab, resource, updateCourse, shifts }) => {
  const defaultOptions = [
    {
      value: 'morning',
      label: 'Morning',
    },
    {
      value: 'afternoon',
      label: 'Afternoon',
    },
    {
      value: 'evening',
      label: 'Evening',
    },
  ];
  const [options, setOptions] = useState([...defaultOptions]);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await updateCourse(values);
  };
  const handleChange = (values) => {
    console.log(values, 'values');
  };
  return (
    <div>
      {/* <ProForm {...getFormProps({ form, onFinish, resource: shifts })}> */}
      <ProForm resource={shifts} onChange={handleChange} onFinish={onFinish} form={form}>
        <ProFormList initialValue={shifts} name={'shifts'}>
          <ProForm.Group title="Shift">
            <ProFormSelect
              // disabled
              width="sm"
              label="Name"
              options={options}
              name={`name`}
              rules={proFormCourseFieldValidation.shifts.name}
              placeholder="Please enter shift name"
            />
            <ProFormTimePicker
              width="sm"
              label="Start Time"
              name={`startTime`}
              rules={proFormCourseFieldValidation.shifts.startTime}
              placeholder="Please enter Start Time"
            />
            <ProFormTimePicker
              width="sm"
              label="End Time"
              name={`endTime`}
              // name="endTime
              rules={proFormCourseFieldValidation.shifts.endDateTime}
              placeholder="Please enter End Time"
            />
          </ProForm.Group>
        </ProFormList>
      </ProForm>
    </div>
  );
};

export default ShiftInfoForm;
