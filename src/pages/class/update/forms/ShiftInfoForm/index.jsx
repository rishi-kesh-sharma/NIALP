import CustomUpload from '@/components/CustomUpload';
import getFormProps, { getSmallFormProps } from '@/data/getFormProps';
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
import { Card, Divider, Form, Typography, Upload, message } from 'antd';
import React, { useState } from 'react';

const ShiftInfoForm = ({ setTab, resource, updateCourse, shifts }) => {
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
        <ProFormList name="shifts" initialValue={shifts}>
          <ProForm.Group>
            <ShiftForm shifts={shifts} />
          </ProForm.Group>
          <Divider />
        </ProFormList>
      </ProForm>
    </div>
  );
};

const ShiftForm = ({ shifts }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values, 'values');
  };
  return (
    // <ProForm resource={shifts}>
    <ProForm
      {...getSmallFormProps({ form, onFinish, resource: shifts })}
      name="shifts"
      initialValues={shifts}
    >
      <ProFormText
        // disabled
        width="sm"
        label="Name"
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
      <ProFormText
        width="sm"
        label="Teacher name"
        name="teacherName"
        rules={proFormCourseFieldValidation.teacherName}
        placeholder="Please enter teacher name"
      />
      <ProFormText
        width="sm"
        label="Zoom Link"
        name="zoomLink"
        rules={proFormCourseFieldValidation.zoomLink}
        placeholder="Please enter zoom link"
      />
    </ProForm>
  );
};

export default ShiftInfoForm;
