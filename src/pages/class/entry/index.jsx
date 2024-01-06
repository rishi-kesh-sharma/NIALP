import React, { useEffect, useState } from 'react';
import { Form, Card, message, Button, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, save, saveShift, update } from '../service';
import Tabs from './tabs';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const [currentId, setCurrentId] = useState(null);

  const addCourse = async (values) => {
    if (!currentId) {
      const result = await save(values);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not add!!');
      } else {
        message.success(result.message || 'Added successfully!!');
        setCurrentId(result?.data?._id);
        form.resetFields();
      }
    } else {
      const result = await update(currentId, values);
      if (result instanceof Error || result.status == 'error' || result.success == false) {
        message.error(result.message || 'Could not add!!');
      } else {
        message.success(result.message || 'Added successfully!!');
        form.resetFields();
        history.push('/class/list');
      }
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <Tabs currentId={currentId} addCourse={addCourse} />
    </PageContainer>
  );
};

export default EntryForm;
