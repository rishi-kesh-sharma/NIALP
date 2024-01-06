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
  ProFormRadio,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const ShiftInfoForm = ({ setTab, addCourse, currentId }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await addCourse(values);
  };
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish })}>
        <ProFormText
          width="lg"
          label="Name"
          name={`name`}
          rules={proFormCourseFieldValidation.shifts.name}
          placeholder="Please enter shift name"
        />
        <ProFormTimePicker
          width="lg"
          label="Start Time"
          name={`startTime`}
          rules={proFormCourseFieldValidation.shifts.startTime}
          placeholder="Please enter Start Time"
        />
        <ProFormTimePicker
          width="lg"
          label="End Time"
          name={`endTime`}
          // name="endTime
          rules={proFormCourseFieldValidation.shifts.endDateTime}
          placeholder="Please enter End Time"
        />
      </ProForm>
    </div>
  );
};

export default ShiftInfoForm;
