import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCourseFieldValidation,
  regexData,
} from '@/data/util';
import { saveShift } from '@/pages/class/service';
import ProForm, {
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import { Card, Form, Upload, message } from 'antd';
import React, { useState } from 'react';

const ShiftInfoForm = ({ setTab, currentId }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (currentId) {
      const result = await saveShift(currentId, values);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not add!!');
      } else {
        message.success(result.message || 'Added successfully!!');
        form.resetFields();
      }
    }
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
        <ProFormText
          width="lg"
          label="Teacher name"
          name="teacherName"
          rules={proFormCourseFieldValidation.teacherName}
          placeholder="Please enter teacher name"
        />
        <ProFormText
          width="lg"
          label="Zoom Link"
          name="zoomLink"
          rules={proFormCourseFieldValidation.zoomLink}
          placeholder="Please enter zoom link"
        />
      </ProForm>
    </div>
  );
};

export default ShiftInfoForm;
