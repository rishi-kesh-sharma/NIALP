import CustomUpload from '@/components/CustomUpload';
import getFormProps, { getSmallFormProps } from '@/data/getFormProps';
import {
  proFormAddressInfoFieldValidation,
  proFormCourseFieldValidation,
  regexData,
} from '@/data/util';
import { ProCard } from '@ant-design/pro-components';
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
import React, { useEffect, useState } from 'react';
import { getById, save, update } from '../service';
import { history } from 'umi';
const ShiftForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  const { id } = props.match.params;
  useEffect(() => {
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item?.data);
    };
    getResource(id);
  }, []);
  if (!resource) {
    return null;
  }
  const onFinish = async (values) => {
    console.log(values, 'values');
    const result = await update(resource?._id, values);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated successfully!!');
      history.goBack();
    }
  };
  return (
    // <ProForm resource={shift}>
    <ProCard title={'Update Shift'}>
      <ProForm
        title="Shift Update"
        {...getFormProps({ form, onFinish, resource: resource })}
        name="shift"
      >
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
    </ProCard>
  );
};

export default ShiftForm;
