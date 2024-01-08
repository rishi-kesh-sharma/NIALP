import { useState } from 'react';
import { Link, history } from 'umi';
import { ProCard } from '@ant-design/pro-components';
import PersonalInfo from '../forms/PersonalInfo';
import AddressInfo from '../forms/AddressInfo';
import CareerInfo from '../forms/CareerInfo';
import CivilInfo from '../forms/CivilInfo';
import PaymentInfo from '../forms/PaymentInfo';
import { Button } from 'antd';

export default function Tabs({ resource, setResource, updateStudent }) {
  const [tab, setTab] = useState('personal-info');
  const [tabPosition, setTabPosition] = useState('top');

  const personalInfo = {
    image: resource?.image,
    name: resource?.name,
    mobile: resource?.mobile,
    email: resource?.email,
    dob: resource?.dob,
    telePhone: resource?.telePhone,
    sex: resource?.sex,
  };
  const addressInfo = {
    address: resource?.address,
    locality: resource?.locality,
    municipality: resource?.municipality,
    district: resource?.district,
    postal: resource?.postal,
  };

  const civilInfo = {
    birthPlace: resource?.birthPlace,
    nationality: resource?.nationality,
    residencyNo: resource?.residencyNo,
    segurancaSocialNo: resource?.segurancaSocialNo,
    nifNo: resource?.nifNo,
    expireDate: resource?.expireDate,
  };

  const careerInfo = {
    educationLevel: resource?.educationLevel,
    employmentStatus: resource?.employmentStatus,
    employmentLocality: resource?.employmentLocality,
    functionality: resource?.functionality,
  };

  const paymentInfo = {
    paymentStatus: (() => {
      const paymentStatuses = { fullyPaid: 'Paid', partiallyPaid: 'Partially Paid' };
      const payableFee = resource?.payableFee;
      const paidFee = resource?.paidFee;

      if (payableFee && paidFee) {
        if (payableFee < paidFee) {
          return paymentStatuses.partiallyPaid;
        } else {
          return paymentStatuses.fullyPaid;
        }
      }
      return null;
    })(),
    payableFee: resource?.payableFee,
    paidFee: resource?.paidFee,
  };

  return (
    <div>
      <ProCard
        title={
          // <Link key={'event-list'} to={'/event/list'}>
          //   <Button type="primary">Back to Events</Button>
          // </Link>
          'Update Student'
        }
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
        tabs={{
          tabPosition,
          activeKey: tab,
          items: [
            {
              disabled: false,
              label: `Personal Info`,
              key: 'personal-info',
              children: (
                <PersonalInfo
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateStudent={updateStudent}
                  personalInfo={personalInfo}
                />
              ),
            },

            {
              // disabled: !currentId,
              label: `Address Info`,
              key: 'address-info',
              children: (
                <AddressInfo
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateStudent={updateStudent}
                  addressInfo={addressInfo}
                />
              ),
            },

            {
              // disabled: !currentId,
              label: `Civil Info`,
              key: 'civil-info',
              children: (
                <CivilInfo
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateStudent={updateStudent}
                  civilInfo={civilInfo}
                />
              ),
            },
            {
              // disabled: !currentId,
              label: `Career Info`,
              key: 'career-info',
              children: (
                <CareerInfo
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateStudent={updateStudent}
                  careerInfo={careerInfo}
                />
              ),
            },
            {
              // disabled: !currentId,
              label: `Payment Info`,
              key: 'payment-info',
              children: (
                <PaymentInfo
                  setTab={setTab}
                  resource={resource}
                  setResource={setResource}
                  updateStudent={updateStudent}
                  paymentInfo={paymentInfo}
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
