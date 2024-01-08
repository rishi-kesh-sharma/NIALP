import { useState } from 'react';
import { Link, history } from 'umi';
import { ProCard } from '@ant-design/pro-components';

import BasicInfoForm from '../forms/BasicInfoForm';
import ShiftInfoForm from '../forms/ShiftInfoForm';
import { Button } from 'antd';

export default function Tabs({ addCourse, currentId }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');

  return (
    <div>
      <ProCard
        extra={
          <Button
            onClick={() => {
              history.goBack();
            }}
            type="primary"
          >
            Go Back
          </Button>
        }
        title={
          // <Link key={'event-list'} to={'/event/list'}>
          //   <Button type="primary">Back to Events</Button>
          // </Link>
          'Add Class'
        }
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              disabled: false,
              label: `Basic Info`,
              key: 'basic-info',
              children: <BasicInfoForm setTab={setTab} addCourse={addCourse} />,
            },
            {
              disabled: !currentId,
              label: `Shift Info`,
              key: 'shift-info',
              children: <ShiftInfoForm currentId={currentId} setTab={setTab} />,
            },
          ],
          onChange: (key) => {
            setTab(key);
          },
        }}
      />
    </div>
  );
}
