import { Card, Form, message } from 'antd';
import ProForm, { ProFormText, ProFormDatePicker, ProFormTextArea } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import getFormProps from '@/data/getFormProps';
import { proFormCourseFieldValidation, regexData } from '@/data/util';

const BasicInfoForm = ({ setTab, addCourse }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    await addCourse(values);
    setTab('shift-info');
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <ProForm {...getFormProps({ form, onFinish })}>
        <ProFormText
          width="lg"
          label="Class Name"
          name="name"
          rules={proFormCourseFieldValidation.name}
          placeholder="Please enter name"
        />
        {/* <ProFormText
          width="lg"
          label="Price"
          name="price"
          rules={proFormCourseFieldValidation.price}
          placeholder="Please enter Price"
        /> */}
        <ProFormDatePicker
          width="lg"
          label="Start Date "
          name="startDateTime"
          rules={proFormCourseFieldValidation.startDateTime}
          placeholder="Please enter start date "
        />
        <ProFormDatePicker
          width="lg"
          label="End Date "
          name="endDateTime"
          rules={proFormCourseFieldValidation.endDateTime}
          placeholder="Please enter end date "
        />
        <ProFormTextArea
          width="lg"
          label="Description"
          name="description"
          rules={proFormCourseFieldValidation.description}
          placeholder="Please enter description"
        />
      </ProForm>
    </PageContainer>
  );
};

export default BasicInfoForm;
