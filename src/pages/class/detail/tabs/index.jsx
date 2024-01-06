import { useState } from 'react';
import { Link } from 'umi';
import { ProCard } from '@ant-design/pro-components';

import ClassBasicDetail from '../BasicInfo';
import ShiftList from '../../../shift/card-list';

export default function Tabs({ resource }) {
  const [tab, setTab] = useState('basic-info');
  const [tabPosition, setTabPosition] = useState('top');

  const { shifts, ...rest } = resource;

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
              children: <ClassBasicDetail basicInfo={rest} />,
            },
            {
              label: `Shift Info`,
              key: 'shift-info',
              children: <ShiftList shifts={shifts} />,
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
