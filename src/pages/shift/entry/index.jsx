import CustomUpload from '@/components/CustomUpload';
import getFormProps, { getSmallFormProps } from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCourseFieldValidation,
  regexData,
} from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
import ProForm, { ProFormText, ProFormTimePicker } from '@ant-design/pro-form';
import { Button, Card, Divider, Form, Typography, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { getById, save, update } from '../service';
import { history } from 'umi';
const ShiftForm = (props) => {
  const [form] = Form.useForm();
  const { classId } = props.match.params;
  const onFinish = async (values) => {
    const result = await save(classId, values);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not add!!');
    } else {
      message.success(result.message || 'Added successfully!!');
      history.goBack();
    }
  };
  return (
    // <ProForm resource={shift}>
    <ProCard
      title={'Add Shift'}
      extra={
        <Button
          onClick={() => {
            history.goBack();
          }}
          type="primary"
        >
          Go Back
        </Button>
      }
    >
      <ProForm title="Shift Update" {...getFormProps({ form, onFinish })} name="shift">
        <ProFormText
          // disabled
          width="lg"
          label="Name"
          name={`name`}
          rules={proFormCourseFieldValidation.shifts.name}
          placeholder="Please enter shift name"
        />
        <ProFormTimePicker
          use12Hours
          format="h:mm a"
          width="lg"
          label="Start Time"
          name={`startTime`}
          rules={proFormCourseFieldValidation.shifts.startTime}
          placeholder="Please enter Start Time"
        />
        <ProFormTimePicker
          use12Hours
          format="h:mm a"
          width="lg"
          label="End Time"
          name={`endTime`}
          // name="endTime
          rules={proFormCourseFieldValidation.shifts.endTime}
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
    </ProCard>
  );
};

export default ShiftForm;
