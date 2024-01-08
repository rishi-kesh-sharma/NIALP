import { PlusOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Pagination, Form, Row, Col, Input, DatePicker, Modal, Space } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { count, search, remove } from '../service';
import CardList from '../card-list';

const CourseList = () => {
  const [fetchResources, setFetchResources] = useState(false);
  const [resources, setResources] = useState([]);
  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search({});
      hide();
      setResources(result?.data);
      setFetchResources(false);
    } catch (error) {
      hide();
      const str = JSON.stringify(error);
      const ex = JSON.parse(str);
      console.log(ex);
      message.error('Something went wrong');
      return false;
    }
  };

  useEffect(() => {
    // if (fetchResources) {
    fetchResourcesData();
    // }
  }, [fetchResources]);

  return (
    <>
      <PageContainer pageHeaderRender={false}>
        <CardList list={resources} setFetchResources={setFetchResources} />
      </PageContainer>
    </>
  );
};

export default CourseList;
