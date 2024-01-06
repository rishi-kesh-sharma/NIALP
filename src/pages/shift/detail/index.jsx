import React, { useEffect, useState } from 'react';
import { Form, Card, message, Button, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, save, update } from '../service';
import Tabs from './tabs';

const ClassDetail = (props) => {
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
  return (
    <PageContainer pageHeaderRender={false}>
      {resource && <Tabs resource={resource} />}
    </PageContainer>
  );
};

export default ClassDetail;
