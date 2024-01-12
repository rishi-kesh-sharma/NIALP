import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Button, message, Modal, Avatar, Card, Typography } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Link, history, useAccess } from 'umi';
import { search, remove, sendEmail, getClasses, getShifts } from '../service';
import { getAvatar } from '@/data/util';
import PaymentDetailModalForm from '../PaymentDetailModal';
import * as XLSX from 'xlsx';
import ReEnrollModalForm from '../ReEnrollModalForm';

const TableList = ({ shiftId, classId }) => {
  const actionRef = useRef();
  const access = useAccess();
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [data, setData] = useState([]);
  const [searchObject, setSearchObject] = useState({});
  const [sort, setSort] = useState({});
  const [fetchResources, setFetchResources] = useState(false);
  const [paymentDetailModalVisible, setPaymentDetailModalVisible] = useState(false);
  const [reEnrollModalVisible, setReEnrollModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  const { confirm } = Modal;

  const fetchResourcesData = async () => {
    const hide = message.loading('Loading...');
    try {
      const result = await search(shiftId, {
        ...searchObject,
        ...sort,
      });
      hide();
      setData(result?.data);
      setFetchResources(false);
      return result;
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
    if (fetchResources) {
      fetchResourcesData();
    }
  }, [fetchResources]);

  useEffect(() => {
    setSort(null);
    setFetchResources(true);
  }, [searchObject]);

  const fetchShifts = async (classId) => {
    const result = await getShifts(classId);
    setShifts(result?.data?.shifts);
  };
  const handleClassChange = async (value) => {
    await fetchShifts(value);
  };
  const fetchClasses = async () => {
    const result = await getClasses();
    setClasses(result?.data);
  };

  useEffect(async () => {
    fetchClasses();
  }, []);
  const onFinish = (values) => {
    setSearchObject(values);
  };

  const columns = [
    // {
    //   title: ' Avatar',
    //   tip: 'Image',
    //   dataIndex: 'image',
    //   render: (dom, entity) => {
    //     return (
    //       <Link
    //         onClick={() => {
    //           history.push(`/student/edit/${entity._id}`);
    //         }}
    //       >
    //         <Avatar src={getAvatar(entity?.name)} />
    //       </Link>
    //     );
    //   },
    // },
    {
      title: ' Name',
      tip: 'name',
      dataIndex: 'name',
      copyable: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/student/edit/${entity._id}`);
            }}
          >
            {`${entity.name}`}
          </a>
        );
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
      tip: 'Click to send email',
      copyable: true,

      render: (dom, entity) => {
        return (
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:${entity.email}`}
          >{`${entity.email}`}</a>
        );
      },
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      copyable: true,
      render: (_, record) => {
        const mobile = record.mobile ? JSON.parse(record?.mobile)?.formattedValue : '-';
        if (mobile) {
          return <a target="_blank" rel="noreferrer" href={`tel:${mobile}`}>{`${mobile}`}</a>;
        } else {
          null;
        }
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: (_, record) => {
        const paymentStatuses = { fullyPaid: 'Paid', partiallyPaid: 'Partially Paid' };
        if (record?.payableFee && record?.paidFee) {
          if (record?.paidFee < record?.payableFee) {
            return paymentStatuses.partiallyPaid;
          } else {
            return paymentStatuses.fullyPaid;
          }
        }
        return 'Unpaid';
      },
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <DeleteButton key="delete" record={record} elementId="student-list-delete-btn" />,

        <ViewButton key="view" record={record} elementId="student-list-view-btn" />,
        <UpdatePaymentButton
          currentStudent={record}
          key="delete"
          record={record}
          elementId="student-list-update-payment-btn"
        />,
        <ReEnrollButton
          currentStudent={record}
          key="delete"
          record={record}
          elementId="student-list-re-enroll-payment-btn"
        />,
        // <EmailButton key="email" record={record} elementId="student-list-email-btn" />,
      ],
    },
  ];

  const ViewButton = ({ record }) => {
    return (
      <>
        <Link to={`/student/detail/${record?._id}`}>
          <EyeOutlined color="blue" />
        </Link>
      </>
    );
  };
  const handleSendEmail = async (currentStudent) => {
    try {
      const result = await sendEmail(currentStudent?._id, classId, {});
      if (result.success == false) {
        return message.error(result.message || 'Cannot send email');
      }
      message.success(result.message || 'Email sent');
    } catch (err) {
      return message.error('Cannot send email');
    }
  };
  const EmailButton = ({ record }) => {
    if (!record?.payableFee) {
      return null;
    }
    return (
      <>
        <MailOutlined
          onClick={() => {
            handleSendEmail(record);
          }}
          color="blue"
        />
      </>
    );
  };

  const handleUpdatePaymentModal = (currentStudent) => {
    setCurrentStudent(currentStudent);
    setPaymentDetailModalVisible(true);
  };
  const UpdatePaymentButton = ({ currentStudent }) => {
    return (
      <>
        <Button
          onClick={() => {
            handleUpdatePaymentModal(currentStudent);
          }}
          type="primary"
        >
          {' '}
          Update Payment
        </Button>
      </>
    );
  };
  const handleReEnrollModal = (currentStudent) => {
    setCurrentStudent(currentStudent);
    setReEnrollModalVisible(true);
  };
  const ReEnrollButton = ({ currentStudent }) => {
    return (
      <>
        <Button
          onClick={() => {
            handleReEnrollModal(currentStudent);
          }}
          type="primary"
        >
          {' '}
          Re-Enroll
        </Button>
      </>
    );
  };
  const DeleteButton = (props) => {
    const { elementId } = props;

    const showDeleteConfirm = (item) => {
      confirm({
        title: `Do you Want to delete ${item.name}?`,
        icon: <ExclamationCircleOutlined />,
        content: `${item.name}  will be deleted permanently.`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log('OK');
          const r = await remove(item._id);
          setFetchResources(true);
          if (r.success) {
            message.success(r.message || 'Deleted successfully!!');
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    };

    const isVisible = access.canShow(elementId);
    if (isVisible) {
      const isDisabled = access.isDisabled(elementId);
      return isDisabled ? (
        <span>Delete</span>
      ) : (
        <a
          style={{ color: 'red', display: 'flex', gap: '6px' }}
          key="config"
          onClick={() => {
            showDeleteConfirm(props.record);
          }}
        >
          <DeleteOutlined style={{ textAlign: 'center' }} />
        </a>
      );
    }
    return null;
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    let buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    XLSX.writeFile(workbook, 'DataSheet.xlsx');
  };
  return (
    <>
      {/* <Card title={<Typography.Title level={4}>Students</Typography.Title>} pageHeaderRender={false}> */}
      {/* <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          style={{
            background: 'white',
            padding: '24px 0 0 24px',
          }}
        >
          <Row gutter={2}>
            <Col flex={1} key={'name'}>
              <Form.Item style={{ marginBottom: 0 }} name={`name`}>
                <Input size="" placeholder="Search keyword for name or alias" width={'500px'} />
              </Form.Item>
            </Col>
            <Col flex={6}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ margin: '0 2px' }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Form> */}
      <ProTable
        defaultSize="small"
        actionRef={actionRef}
        columns={columns}
        headerTitle={<Typography.Title level={4}>Students</Typography.Title>}
        rowKey="_id"
        search={false}
        options={{ reload: false }}
        dataSource={data}
        pagination={{ pageSize: 6 }}
        toolBarRender={() => {
          const button =
            data?.students?.length == 0 ? (
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  history.push(`/course/new`);
                }}
              >
                Add Course
              </Button>
            ) : (
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  history.push(`/course/detail/${data?._id}`);
                }}
              >
                Shift Detail
              </Button>
            );
          return [
            <Button type="primary" key="primary" onClick={handleExport}>
              <DownloadOutlined /> Export Students
            </Button>,
            // button,
            // <Button
            //   type="primary"
            //   key="primary"
            //   onClick={() => {
            //     history.push('/student/new');
            //   }}
            // >
            //   <PlusOutlined /> New
            // </Button>,
          ];
        }}
      />
      <PaymentDetailModalForm
        setFetchResource={setFetchResources}
        visible={paymentDetailModalVisible}
        setVisible={setPaymentDetailModalVisible}
        current={currentStudent}
        studentId={currentStudent?._id}
      />
      <ReEnrollModalForm
        handleClassChange={handleClassChange}
        shifts={shifts}
        classes={classes}
        setShifts={setShifts}
        setClasses={setClasses}
        setFetchResource={setFetchResources}
        visible={reEnrollModalVisible}
        setVisible={setReEnrollModalVisible}
        current={currentStudent}
        studentId={currentStudent?._id}
      />
      {/* </Card> */}
    </>
  );
};

export default TableList;
