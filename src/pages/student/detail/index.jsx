import React, { Fragment, useState } from 'react';
import { history } from 'umi';
import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  FilePdfFilled,
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
} from 'antd';
import { GridContent, PageContainer, RouteContext } from '@ant-design/pro-layout';
import classNames from 'classnames';
import { useRequest } from 'umi';
import styles from './style.less';
import { queryAdvancedProfile } from '@/pages/profile/advanced/service';
import { getById, remove } from '../service';
import { getAvatar } from '@/data/util';
import { getUrlExtension } from '@/utils';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const mobileMenu = (
  <Menu>
    <Menu.Item key="1">Operation 1</Menu.Item>
    <Menu.Item key="2">Operation 2</Menu.Item>
  </Menu>
);

const Action = ({ paymentStatus, studentId, data }) => {
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
        history.push('/student/list');
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
              <PaymentStatus paymentStatus={paymentStatus} />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    history.goBack();
                  }}
                  type="primary"
                >
                  Go Back
                </Button>

                <Button
                  onClick={() => {
                    history.push(`/student/edit/${studentId}`);
                  }}
                  type="primary"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    showDeleteConfirm(data);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );
};
const PaymentStatus = ({ paymentStatus }) => {
  const paymentStatuses = { fullyPaid: 'Paid', partiallyPaid: 'Partially Paid' };

  return (
    <div className={styles.moreInfo}>
      {paymentStatus == paymentStatuses.fullyPaid ? (
        <Tag color="success">{paymentStatus}</Tag>
      ) : (
        <Tag color="warning">{paymentStatus}</Tag>
      )}
    </div>
  );
};

const StudentDetail = (props) => {
  const { id: studentId } = props.match.params;

  const { data = {}, loading } = useRequest(() => {
    return getById(studentId);
  });

  const personalInfo = {
    residentCardCopy: data?.residentCardCopy,
    paymentProof: data?.paymentProof,
    residentCardCopyPdf: data?.residentCardCopyPdf,
    name: data?.name,
    mobile: data?.mobile,
    email: data?.email,
    dob: data?.dob,
    telePhone: data?.telePhone,
    sex: data?.sex,
  };
  const addressInfo = {
    address: data?.address,
    locality: data?.locality,
    municipality: data?.municipality,
    district: data?.district,
    postal: data?.postal,
  };

  const civilInfo = {
    birthPlace: data?.birthPlace,
    nationality: data?.nationality,
    residencyNo: data?.residencyNo,
    segurancaSocialNo: data?.segurancaSocialNo,
    nifNo: data?.nifNo,
    expireDate: data?.expireDate,
  };

  const careerInfo = {
    educationLevel: data?.educationLevel,
    employmentStatus: data?.employmentStatus,
    employmentLocality: data?.employmentLocality,
    functionality: data?.functionality,
  };
  const paymentInfo = {
    paymentStatus: (() => {
      const paymentStatuses = { fullyPaid: 'Paid', partiallyPaid: 'Partially Paid' };
      const payableFee = data?.payableFee;
      const paidFee = data?.paidFee;

      if (payableFee && paidFee) {
        if (payableFee > paidFee) {
          return paymentStatuses.partiallyPaid;
        } else {
          return paymentStatuses.fullyPaid;
        }
      }
      return 'Unpaid';
    })(),
    payableFee: data?.payableFee,
    paidFee: data?.paidFee,
  };

  return (
    <PageContainer
      // title={personalInfo.name}

      extra={<Action paymentStatus={paymentInfo.paymentStatus} studentId={data?._id} data={data} />}
      className={styles.pageHeader}
    >
      <div className={styles.main}>
        <GridContent>
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
          >
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="Personal Information"
            >
              <Descriptions.Item label="Name">{personalInfo.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{personalInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{personalInfo.dob}</Descriptions.Item>
              <Descriptions.Item label="Gender">{personalInfo.sex}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {personalInfo?.mobile && JSON.parse(personalInfo?.mobile)?.formattedValue}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone Number">
                {personalInfo.telePhone}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="Address Information"
            >
              <Descriptions.Item label="Address">{addressInfo.address}</Descriptions.Item>
              <Descriptions.Item label="Locality">{addressInfo.locality}</Descriptions.Item>
              <Descriptions.Item label="Postal Number">{addressInfo.postal}</Descriptions.Item>
              <Descriptions.Item label="Municipality">{addressInfo.municipality}</Descriptions.Item>
              <Descriptions.Item label="District">{addressInfo.district}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              style={{
                marginBottom: 0,
              }}
              title="Civil Information"
            >
              <Descriptions.Item label="Birth Place">{civilInfo.birthPlace}</Descriptions.Item>
              <Descriptions.Item label="Nationality">{civilInfo.nationality}</Descriptions.Item>
              <Descriptions.Item label="Residency No">{civilInfo.residencyNo}</Descriptions.Item>
              <Descriptions.Item label="Seguranca Social No">
                {civilInfo.segurancaSocialNo}
              </Descriptions.Item>
              <Descriptions.Item label="NIF No">{civilInfo.nifNo}</Descriptions.Item>
              <Descriptions.Item label="Expiry Date">{civilInfo.expireDate}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              style={{
                marginBottom: 0,
              }}
              title="Career Information"
            >
              <Descriptions.Item label="Education Level">
                {careerInfo.educationLevel}
              </Descriptions.Item>
              <Descriptions.Item label="Employment Status">
                {careerInfo.employmentStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Employment Locality">
                {careerInfo.employmentLocality}
              </Descriptions.Item>
              <Descriptions.Item label="Functionality">
                {careerInfo.functionality}
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="Payment Information"
            >
              <Descriptions.Item label="Payment Status">
                {paymentInfo.paymentStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Total Payable Fee">
                &euro; {paymentInfo.payableFee}
              </Descriptions.Item>
              <Descriptions.Item label="Paid Fee">
                &euro;
                {paymentInfo.paidFee}
              </Descriptions.Item>
            </Descriptions>
            {personalInfo?.paymentProof?.image?.fileUrl && (
              <Descriptions
                title="Payment Proof Image"
                style={{
                  marginBottom: 24,
                }}
              >
                <Descriptions.Item>
                  <Image src={personalInfo?.paymentProof?.image?.fileUrl} />
                </Descriptions.Item>
              </Descriptions>
            )}
            {console.log(personalInfo?.residentCardCopy)}

            {personalInfo?.residentCardCopy?.length > 0 && (
              <Descriptions
                title="Resident Card Copy "
                style={{
                  marginBottom: 24,
                }}
              >
                {personalInfo?.residentCardCopy?.map((item, index) => {
                  const fileExtension = getUrlExtension(item?.image?.fileUrl);

                  return (
                    <Descriptions.Item key={`${index}`}>
                      {fileExtension == 'pdf' ? (
                        <a
                          download
                          // download={item?.image?.fileUrl}
                          href={item?.image?.fileUrl}
                        >
                          <FilePdfFilled />
                          Download Resident Card Copy Pdf
                        </a>
                      ) : (
                        <Image src={item?.image?.fileUrl} />
                      )}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            )}
            {/* {personalInfo?.residentCardCopyPdf?.image?.fileUrl && (
              <Descriptions
                title="Resident Card Copy Pdf"
                style={{
                  marginBottom: 24,
                }}
              >
                <Descriptions.Item>
                  <Image src={personalInfo?.residentCardCopyPdf?.image?.fileUrl} />
                </Descriptions.Item>
              </Descriptions>
            )} */}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};

export default StudentDetail;
