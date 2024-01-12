import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Result,
  Button,
  Descriptions,
  Divider,
  Alert,
  Statistic,
  message,
  Typography,
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-form';
import styles from './style.less';
import Personal from './forms/step-form/Personal';
import Address from './forms/step-form/Address';
import Career from './forms/step-form/Career';
import Civil from './forms/step-form/Civil';
import { classes, getClasses, getShifts, save } from '../service';
import LogoImage from '../../../assets/logo.png';

const StepResult = (props) => {
  return (
    <Result
      style={{ background: 'white !important' }}
      status="success"
      title="Congratulations !!! Registered Successfully"
      subTitle="Admin will contact you shortly"
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const sizes = { small: 'sm', medium: 'md', large: 'lg' };
const StepForm = () => {
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [stepData, setStepData] = useState({});
  const [current, setCurrent] = useState(0);
  const [currentSize, setCurrentSize] = useState(null);
  const formRef = useRef();
  const personalFormRef = useRef();
  const civilFormRef = useRef();
  const careerFormRef = useRef();
  const completeFormRef = useRef();
  const [residentCardCopyFileList, setResidentCardCopyFileList] = useState([]);
  const [paymentProofFileList, setPaymentProofFileList] = useState([]);
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
    formData.append('age', values?.age);
    formData.append('sex', values?.sex);
    formData.append('telePhone', values?.telePhone);

    for (let i = 0; i < residentCardCopyFileList.length; i++) {
      formData.append('residentCardCopy', residentCardCopyFileList?.[i]?.originFileObj);
    }
    for (let i = 0; i < paymentProofFileList.length; i++) {
      formData.append('paymentProof', residentCardCopyFileList?.[i]?.originFileObj);
    }
    // todo:address info
    formData.append('address', values.address);
    formData.append('locality', values.locality);
    formData.append('postal', values.postal);
    formData.append('municipality', values.municipality);
    formData.append('district', values.district);

    // todo:career info

    // todo:educational info
    formData.append('educationLevel', values.educationLevel);
    // todo:employment info
    formData.append('employmentStatus', values.employmentStatus);
    //todo:professional info
    formData.append('entityEmployer', values.entityEmployer);
    formData.append('noOfEmployees', values.noOfEmployees);
    formData.append('professionLocality', values.professionLocality);
    formData.append('functionality', values.functionality);

    // todo:civil info
    formData.append('nationality', values.nationality);
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
      setIsFormSubmitted(true);
      formRef.current.resetFields();
      setTimeout(() => {
        // setCurrent(0);
        // setIsFormSubmitted(false);
      }, 3000);
    }
  };

  console.log(formRef, 'formREf');
  const handleDone = () => {
    console.log(formRef, 'form ref');
    personalFormRef.current?.resetFields();
    careerFormRef.current?.resetFields();
    civilFormRef.current?.resetFields();
    completeFormRef.current?.resetFields();
    setResidentCardCopyFileList([]);
    setPaymentProofFileList([]);
    setMobileString('');
    setClasses([]);
    setShifts([]);
    setCurrent(0);
    setIsFormSubmitted(false);
  };

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

  const handleWindowResize = () => {
    if (window.innerWidth < 425) {
      setCurrentSize(sizes.small);
    }
    if (window.innerWidth >= 425 && window.innerWidth < 768) {
      setCurrentSize(sizes.medium);
    }
    if (window.innerWidth >= 768) {
      setCurrentSize(sizes.large);
    }
  };
  useEffect(() => {
    if (window.innerWidth < 425) {
      setCurrentSize(sizes.small);
    }
    if (window.innerWidth > 425 && window.innerWidth < 768) {
      setCurrentSize(sizes.medium);
    }
    if (window.innerWidth >= 768) {
      setCurrentSize(sizes.large);
    }
    window.addEventListener('resize', handleWindowResize);
  }, []);

  const classesOptions = classes?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
  const shiftsOptions = shifts?.map((item) => {
    return { name: item.name, label: item.name.toUpperCase(), value: item?._id };
  });
  return (
    <PageContainer
      title={false}
      content={
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <img style={{ height: '3rem', width: '10rem', objectFit: 'contain' }} src={LogoImage} />
          <h3 style={{ fontWeight: 'bold' }}> REGISTRATION FOR PORTUGUESE LANGUAGE COURSE</h3>
        </div>
      }
    >
      <Card bordered={false} style={{ overflowX: 'hidden !important', width: '300px !important' }}>
        <StepsForm
          formRef={formRef}
          onFinish={onFinish}
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 3 && isFormSubmitted && residentCardCopyFileList.length > 0) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm
            formRef={personalFormRef}
            layout="vertical"
            size="large"
            // colProps={{ span: 7 }}
            colProps={{ sm: { span: 24 }, md: { span: 10 }, lg: { span: 7 } }}
            rowProps={{ gutter: 12 }}
            grid={true}
            title="Personal"
            onFinish={async (values) => {
              console.log(values, 'values');
              if (residentCardCopyFileList.length == 0) {
                message.error('Resident card copy  is required');
                return false;
              }
              if (paymentProofFileList.length == 0) {
                message.error('Payment Proof  is required');
                return false;
              }
              if (mobileString.length < 8) {
                message.error('Mobile Number is required');
                return false;
              }
              // if (Number(values.age) < 16) {
              //   message.error('Age must at least 16 years!');
              //   return false;
              // }
              setStepData(values);
              return true;
            }}
          >
            <Personal
              currentSize={currentSize}
              residentCardCopyFileList={residentCardCopyFileList}
              setResidentCardCopyFileList={setResidentCardCopyFileList}
              paymentProofFileList={paymentProofFileList}
              setPaymentProofFileList={setPaymentProofFileList}
              mobileString={mobileString}
              setMobileString={setMobileString}
            />
          </StepsForm.StepForm>
          {/* <StepsForm.StepForm
            layout="vertical"
            size="large"
            colProps={{ span: 7 }}
            rowProps={{ gutter: 12 }}
            grid={true}
            title="Address "
            initialValues={stepData}
            onFinish={async (values) => {
              console.log(values, 'values');

              setStepData(values);

              return true;
            }}
          >
            <Address />
          </StepsForm.StepForm> */}
          <StepsForm.StepForm
            formRef={civilFormRef}
            layout="vertical"
            size="large"
            colProps={{ sm: { span: 24 }, md: { span: 10 }, lg: { span: 7 } }}
            rowProps={{ gutter: 12 }}
            grid={true}
            title="Civil "
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <Civil currentSize={currentSize} />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            formRef={careerFormRef}
            layout="vertical"
            size="large"
            colProps={{ sm: { span: 24 }, md: { span: 10 }, lg: { span: 7 } }}
            rowProps={{ gutter: 12 }}
            grid={true}
            title="Career"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <Career currentSize={currentSize} />
          </StepsForm.StepForm>

          {isFormSubmitted ? (
            <StepResult>
              <Button onClick={handleDone} type="primary">
                Done
              </Button>
            </StepResult>
          ) : (
            <StepsForm.StepForm formRef={completeFormRef} title="Completion">
              <>
                {/* <ProFormTextArea
                  width="xl"
                  label="FUNCTIONALITY"
                  name="functionality"
                  // rules={proFormAddressInfoFieldValidation.functionality}
                  placeholder="Please enter queries(if any)"
                /> */}

                <ProFormSelect
                  width={currentSize}
                  options={classesOptions}
                  label={'Choose Class'}
                  name={'class'}
                  onMetaChange={handleClassChange}
                  onChange={handleClassChange}
                  rules={[{ required: true }]}
                />
                <ProFormSelect
                  width={currentSize}
                  rules={[{ required: true }]}
                  name={'shift'}
                  options={shiftsOptions}
                  label={'Choose Shift'}
                />
                <div
                  style={{
                    width: `${currentSize == 'sm' ? '220px' : 'auto'}`,
                    maxWidth: '100vw !important',
                  }}
                >
                  <Alert
                    closable
                    showIcon
                    message="After submitting the information, you will be registered for class"
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
              </>
            </StepsForm.StepForm>
          )}
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
