import React, { useEffect, useState } from 'react';
import { Form, Card, message, Button, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, save, update } from '../service';
import Tabs from './tabs';
import { history, Link } from 'umi';

const EntryForm = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item?.data);
    };
    getResource(id);
  }, []);
  const updateStudent = async (values) => {
    const result = await update(resource?._id, values);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not update!!');
    } else {
      message.success(result.message || 'Updated successfully!!');
      form.resetFields();
      history.push('/student/list');
    }
  };
  return (
    <PageContainer
      pageHeaderRender={false}
      title={
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
      {resource && (
        <Tabs updateStudent={updateStudent} resource={resource} setResource={setResource} />
      )}
    </PageContainer>
  );
};

export default EntryForm;
