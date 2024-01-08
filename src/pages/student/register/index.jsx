import React, { useEffect, useRef, useState } from 'react';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import styles from './style.less';
import Personal from './forms/step-form/Personal';
import Address from './forms/step-form/Address';
import Career from './forms/step-form/Career';
import Civil from './forms/step-form/Civil';
import { classes, getClasses, getShifts, save } from '../service';

const StepResult = (props) => {
  return (
    <Result
      status="success"
      title="Operation Successful"
      subTitle="Expected to be credited within two hours"
      // extra={
      //   <>
      //     <Button type="primary" onClick={props.onFinish}>
      //       Transfer Again
      //     </Button>
      //     <Button>View Statement</Button>
      //   </>
      // }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const StepForm = () => {
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [stepData, setStepData] = useState({});
  const [current, setCurrent] = useState(0);
  const formRef = useRef();

  const [fileList, setFileList] = useState([]);
  const [mobileString, setMobileString] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const onFinish = async (values) => {
    console.log(values, 'values');
    console.log(values.shift, 'values.shift');

    const formData = new FormData();

    // todo:personal info
    formData.append('name', values?.name);
    formData.append('mobile', mobileString);
    formData.append('email', values?.email);
    formData.append('dob', values?.dob);
    formData.append('sex', values?.sex);
    formData.append('telePhone', values?.telePhone);

    console.log(fileList, 'filelist');

    for (let i = 0; i < fileList.length; i++) {
      formData.append('image', fileList?.[i]?.originFileObj);
    }
    // todo:address info
    formData.append('address', values.address);
    formData.append('locality', values.locality);
    formData.append('postal', values.postal);
    formData.append('municipality', values.municipality);
    formData.append('district', values.district);

    // todo:career info
    formData.append('educationLevel', values.educationLevel);
    formData.append('employmentStatus', values.employmentStatus);
    formData.append('employmentLocality', values.employmentLocality);
    formData.append('functionality', values.dob);

    // todo:civil info
    formData.append('birthPlace', values.birthPlace);
    formData.append('residencyNo', values.residencyNo);
    formData.append('segurancaSocialNo', values.segurancaSocialNo);
    formData.append('nifNo', values.nifNo);
    formData.append('expireDate', values.expireDate);

    // TODO:CALL API
    const result = await save(values.class, values.shift, formData);
    if (result instanceof Error || result.status == 'error' || result.success == false) {
      message.error(result.message || 'Could not register!!');
    } else {
      message.success(result.message || 'Registered successfully!!');
      formRef.current?.resetFields();
      setCurrent(0);
    }
  };

  const fetchShifts = async (classId) => {
    const result = await getShifts(classId);
    setShifts(result?.data?.shifts);
  };
  const handleClassChange = async (value) => {
    console.log(value, 'class value');
    await fetchShifts(value);
  };

  const fetchClasses = async () => {
    const result = await getClasses();
    setClasses(result?.data);
  };

  console.log(shifts, 'shifts');
  useEffect(async () => {
    fetchClasses();
  }, []);

  const classesOptions = classes?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
  const shiftsOptions = shifts?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
  return (
    <PageContainer content="Register here for portugese language class">
      <Card bordered={false}>
        <StepsForm
          formRef={formRef}
          onFinish={onFinish}
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 5) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            layout="vertical"
            size="large"
            colProps={{ span: 7 }}
            rowProps={{ gutter: 12 }}
            grid={true}
            formRef={formRef}
            title="Personal "
            onFinish={async (values) => {
              console.log(values, 'values');
              setStepData(values);
              return true;
            }}
          >
            <Personal
              fileList={fileList}
              setFileList={setFileList}
              mobileString={mobileString}
              setMobileString={setMobileString}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            layout="vertical"
            size="large"
            colProps={{ span: 7 }}
            rowProps={{ gutter: 12 }}
            grid={true}
            formRef={formRef}
            title="Address "
            initialValues={stepData}
            onFinish={async (values) => {
              console.log(values, 'values');

              setStepData(values);

              return true;
            }}
          >
            <Address />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            layout="vertical"
            size="large"
            colProps={{ span: 7 }}
            rowProps={{ gutter: 12 }}
            grid={true}
            formRef={formRef}
            title="Civil "
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <Civil />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            layout="vertical"
            size="large"
            colProps={{ span: 7 }}
            rowProps={{ gutter: 12 }}
            grid={true}
            formRef={formRef}
            title="Career "
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <Career />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="Completion">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="After submitting the information, you will be registered to take the classes"
                style={{
                  marginBottom: 24,
                }}
              />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
            </div>

            <ProFormSelect
              options={classesOptions}
              label={'Choose Class'}
              name={'class'}
              onMetaChange={handleClassChange}
              onChange={handleClassChange}
            />
            <ProFormSelect name={'shift'} options={shiftsOptions} label={'Choose Shift'} />
            {isFormSubmitted && (
              <StepResult
                onFinish={async () => {
                  setCurrent(0);
                  formRef.current?.resetFields();
                }}
              />
            )}
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        {/* <div className={styles.desc}>
          <h3>Instructions</h3>
          <h4>Transfer to Alipay Account</h4>
          <p>
            If necessary, common questions about the product can be placed here. If necessary,
            common questions about the product can be placed here. If necessary, common questions
            about the product can be placed here.
          </p>
          <h4>Transfer to Bank Account</h4>
          <p>
            If necessary, common questions about the product can be placed here. If necessary,
            common questions about the product can be placed here. If necessary, common questions
            about the product can be placed here.
          </p>
        </div> */}
      </Card>
    </PageContainer>
  );
};

export default StepForm;
