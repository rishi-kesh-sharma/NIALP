import { useState } from 'react';
import { Link } from 'umi';
import { ProCard } from '@ant-design/pro-components';

import ShiftBasicDetail from '../BasicInfo';
import StudentList from '../../../student/list';

export default function Tabs({ resource }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');
  const { students, ...rest } = resource;
  return (
    <div>
      <ProCard
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              label: `Basic Info`,
              key: 'basic-info',
              children: <ShiftBasicDetail basicInfo={rest} />,
            },
            {
              label: `Students Info`,
              key: 'student-info',
              children: <StudentList shiftId={rest?._id} students={students} />,
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
