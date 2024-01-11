import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Image, List, Typography, message, Modal } from 'antd';
import { Link, useRequest, history } from 'umi';
import styles from './style.less';
import EventImage from '../../../assets/cover.jpg';
import moment from 'moment';
import { remove } from '../service';
import { PageContainer } from '@ant-design/pro-layout';

const CardList = ({ setFetchResources, classId, shifts: list }) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (shift) => {
    confirm({
      title: `Do you Want to delete? `,
      icon: <ExclamationCircleOutlined />,
      content: `Shift will be deleted permanently.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log('OK');
        const r = await remove(shift?._id);
        setFetchResources(true);
        if (r.success) {
          message.success(r?.message || 'Deleted successfully!!');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleDelete = (shift) => {
    showDeleteConfirm(shift);
  };
  const handleShiftAdd = () => {
    history.push(`/shift/new/${classId}`);
  };
  return (
    <div className={styles.cardList}>
      <Typography.Title level={4}>Shifts</Typography.Title>
      {list && (
        <List
          style={{ marginTop: '1rem' }}
          rowKey="id"
          // loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 5,
          }}
          dataSource={[{}, ...list]}
          renderItem={(item) => {
            if (item && item._id) {
              return (
                <List.Item
                  key={item._id}
                  style={{
                    minWidth: '600px !important',
                  }}
                >
                  <Card
                    // cover={
                    //   <Image
                    //     alt=""
                    //     style={{
                    //       maxHeight: '100px',
                    //       objectFit: 'contain',
                    //       minWidth: '200px !important',
                    //     }}
                    //     src={
                    //       item?.backgrounds?.length > 0
                    //         ? item?.backgrounds?.[0]?.image?.fileUrl
                    //         : EventImage
                    //     }k
                    //   />
                    // }
                    hoverable
                    className={styles.card}
                    actions={[
                      <Link to={`/shift/detail/${item._id}?classId=${classId}`} key="option1">
                        <EyeOutlined key="view" />
                      </Link>,
                      <Link to={`/shift/edit/${item._id}`} key="option1">
                        <EditOutlined key="edit" />
                      </Link>,
                      <DeleteOutlined onClick={() => handleDelete(item)} key="delete" />,
                    ]}
                  >
                    <p style={{ fontSize: '0.7rem', fontWeight: '500' }}>{item?.name}</p>
                    {/* <p style={{ fontSize: '0.7rem', fontWeight: '500' }}>{item?.price}</p> */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <p style={{ fontWeight: '600' }}>Start Time:</p>
                      <p>{moment(item?.startTime, 'HH:mm:ss').lang('en').format('hh:mm a')}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <p style={{ fontWeight: '600' }}>End Time:</p>
                      <p>{moment(item?.endTime, 'HH:mm:ss').lang('en').format('hh:mm a')}</p>
                    </div>
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item onClick={handleShiftAdd}>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> Add New Shift
                </Button>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default CardList;
