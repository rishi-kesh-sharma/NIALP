import React, { useEffect, useState } from 'react';
import { Form, Card, message, Button, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { getById, save, update } from '../service';
import Tabs from './tabs';
import ShiftBasicDetail from './BasicInfo';
import StudentList from '../../student/list';
import { history } from 'umi';

const ClassDetail = (props) => {
  const [resource, setResource] = useState(null);
  const [form] = Form.useForm();
  const classId = props.location.query.classId;
  console.log(props, 'the temp');
  useEffect(() => {
    const { id } = props.match.params;
    const getResource = async (id) => {
      const item = await getById(id);
      setResource(item?.data);
    };
    getResource(id);
  }, []);
  if (!resource) {
    return null;
  }
  const { students, ...rest } = resource;

  return (
    <PageContainer
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
      pageHeaderRender={false}
    >
      {/* {resource && <Tabs resource={resource} />} */}
      <ShiftBasicDetail basicInfo={rest} />
      <StudentList classId={classId} shiftId={resource?._id} students={students} />
    </PageContainer>
  );
};

export default ClassDetail;
