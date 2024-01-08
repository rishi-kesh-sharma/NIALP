import React, { useEffect, useState } from 'react';
import { Form, Card, message, Button, Space, Divider } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, save, update } from '../service';
import Tabs from './tabs';
import ShiftBasicDetail from '@/pages/shift/detail/BasicInfo';
import ClassBasicDetail from './BasicInfo';
import ShiftList from '../../shift/card-list';
import { history } from 'umi';

const ClassDetail = (props) => {
  const [resource, setResource] = useState(null);
  const [fetchResources, setFetchResources] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item?.data);
    };
    getResource(id);
  }, [fetchResources]);
  if (!resource) {
    return null;
  }

  const classId = resource?._id;
  const { shifts, ...rest } = resource;
  return (
    <PageContainer pageHeaderRender={false}>
      {/* {resource && <Tabs resource={resource} />}
       */}
      <ClassBasicDetail basicInfo={rest} />
      {/* <Divider/> */}
      <ShiftList setFetchResources={setFetchResources} classId={classId} shifts={shifts} />
    </PageContainer>
  );
};

export default ClassDetail;
