import { Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, getCategory, getSubCategory, update } from '../service';
import React, { useEffect, useState } from 'react';
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EditForm = (props) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item);
    };
    getResource(id);
  }, []);
  console.log(resource?._id);
  const onFinish = async (values) => {
    console.log(values);
    const result = await update({ _id: resource._id, ...values });
    console.log('resource', result);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      history.push('/categories');
    }
  };

  return (
    resource && (
      <PageContainer pageHeaderRender={false}>
        <Card bordered={false}>
          <ProForm
            hideRequiredMark={false}
            style={{
              margin: 'auto',
              marginTop: 8,
              maxWidth: 600,
            }}
            name="basic"
            layout="vertical"
            initialValues={resource}
            onFinish={onFinish}
          >
            <ProFormText
              width="lg"
              label="Name"
              name="name"
              value={resource.name}
              rules={[
                {
                  required: true,
                  message: 'Please enter name',
                },
              ]}
              placeholder="Please enter name"
            />
            <ProFormText
              width="lg"
              label="Alias"
              value={resource.alias}
              name="alias"
              rules={[
                {
                  required: false,
                  message: 'Please enter the description',
                },
              ]}
              placeholder="Please enter the description"
            />
            <ProFormText
              width="lg"
              label="Descripton"
              value={resource.description}
              name="description"
              rules={[
                {
                  required: false,
                  message: 'Please enter the description',
                },
              ]}
              placeholder="Please enter the description"
            />
          </ProForm>
        </Card>
      </PageContainer>
    )
  );
};

export default EditForm;
