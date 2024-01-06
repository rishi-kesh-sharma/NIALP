import { useState } from 'react';
import { Link } from 'umi';
import { ProCard } from '@ant-design/pro-components';

import BasicInfoForm from '../forms/BasicInfoForm';
import ShiftInfoForm from '../forms/ShiftInfoForm';

export default function Tabs({ resource, setResource, updateCourse }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');

  const basicInfo = {
    name: resource?.name,
    description: resource?.description,
    startDateTime: resource?.startDateTime,
    endDateTime: resource?.endDateTime,
    price: resource?.price,
    teacherName: resource?.teacherName,
    zoomLink: resource?.zoomLink,
    students: resource?.students,
  };

  const shifts = resource?.shifts;

  return (
    <div>
      <ProCard
        title={
          // <Link key={'event-list'} to={'/event/list'}>
          //   <Button type="primary">Back to Events</Button>
          // </Link>
          'Update Course'
        }
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              disabled: false,
              label: `Course Basic Info`,
              key: 'basic-info',
              children: (
                <BasicInfoForm
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateCourse={updateCourse}
                  basicInfo={basicInfo}
                />
              ),
            },

            {
              // disabled: !currentId,
              label: `Shift Info`,
              key: 'shift-info',
              children: (
                <ShiftInfoForm
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateCourse={updateCourse}
                  shifts={shifts}
                />
              ),
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
