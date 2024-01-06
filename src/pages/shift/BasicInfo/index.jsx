import React, { Fragment, useState } from 'react';
import { history } from 'umi';
import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
  Image,
  Tag,
  Modal,
  Typography,
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import classNames from 'classnames';
import { useRequest } from 'umi';
import styles from './style.less';
import { queryAdvancedProfile } from '@/pages/profile/advanced/service';
import { getById, remove } from '../../service';
import { getAvatar } from '@/data/util';
import moment from 'moment';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const mobileMenu = (
  <Menu>
    <Menu.Item key="1">Operation 1</Menu.Item>
    <Menu.Item key="2">Operation 2</Menu.Item>
  </Menu>
);

const Action = ({ data }) => {
  const showDeleteConfirm = (data) => {
    confirm({
      title: `Do you Want to delete ${data.name}?`,
      icon: <ExclamationCircleOutlined />,
      content: `${data.name}  will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await remove(data._id);
        history.push('/class/list');
        if (r.success) {
          message.success(r.message || 'Deleted successfully!!');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          return (
            <Dropdown.Button
              type="primary"
              icon={<DownOutlined />}
              overlay={mobileMenu}
              placement="bottomRight"
            >
              Action
            </Dropdown.Button>
          );
        }

        return (
          <Fragment>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    showDeleteConfirm(data);
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    history.push(`/course/edit/${courseId}`);
                  }}
                  type="primary"
                >
                  Update
                </Button>
              </ButtonGroup>
            </div>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );
};

const ClassBasicDetail = ({ basicInfo }) => {
  const { name, description, startDateTime, endDateTime, price } = basicInfo;
  return (
    <PageContainer
      title={name}
      extra={<Action courseId={data?._id} data={data} />}
      className={styles.pageHeader}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            style={{
              marginBottom: 12,
            }}
            bordered={false}
          >
            <Descriptions
              style={{
                marginBottom: 12,
              }}
              title="Class Basic Information"
            >
              <Descriptions.Item label="Name">{name}</Descriptions.Item>
              <Descriptions.Item label="Starts From ">
                {moment(startDateTime).lang('en').format('LLL')}
              </Descriptions.Item>
              <Descriptions.Item label="Ends At">
                {moment(endDateTime).lang('en').format('LLL')}
              </Descriptions.Item>
              <Descriptions.Item label="Price">{price}</Descriptions.Item>

              <Descriptions.Item label="Description">{description}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Card
              title={<Typography.Title level={5}>{'Shifts'}</Typography.Title>}
              style={{
                marginBottom: 12,
                paddingLeft: 0,
              }}
              bordered={false}
            >
              {shifts?.map((shift, index) => {
                return (
                  <Descriptions
                    key={shift.name}
                    style={{
                      marginBottom: 12,
                    }}
                    title={shift?.name}
                  >
                    <Descriptions.Item label="Name">{shift?.name}</Descriptions.Item>
                    <Descriptions.Item label="Start Time">{shift?.startTime}</Descriptions.Item>
                    <Descriptions.Item label="End Time">{shift?.endTime}</Descriptions.Item>
                    {/* <Descriptions.Item label="Price">{price}</Descriptions.Item> */}
                  </Descriptions>
                );
              })}
            </Card>
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default ClassBasicDetail;
