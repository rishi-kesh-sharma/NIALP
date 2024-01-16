import CustomUpload from '@/components/CustomUpload';
import getFormProps from '@/data/getFormProps';
import { proFormPaymentInfoFieldValidation } from '@/data/util';
import useGetFileFromUrl from '@/hooks/useGetFileFromUrl';
import { getUrlExtension } from '@/utils';
import ProForm, { ProFormMoney, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';

const PaymentInfo = ({ setTab, resource, updateStudent, paymentInfo }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const files = useGetFileFromUrl({
    resource: paymentInfo,
    multiple: false,
    fieldName: 'paymentProof',
  });
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('payableFee', values.payableFee);
    formData.append('paidFee', values.paidFee);
    for (let i = 0; i < fileList.length; i++) {
      formData.append('paymentProof', fileList?.[i]?.originFileObj);
    }
    await updateStudent(formData);
  };

  console.log(paymentInfo.paymentProof);
  console.log(fileList, 'fileList');
  useEffect(() => {
    setFileList(files);
  }, [files]);
  return (
    <div>
      <ProForm {...getFormProps({ form, onFinish, resource: paymentInfo })}>
        <ProFormText
          width="lg"
          label="Payment Status"
          name="paymentStatus"
          // rules={proFormPaymentInfoFieldValidation.paymentStatus}
          disabled
        />
        <ProFormMoney
          width="lg"
          label="Total Payable Fee"
          name="payableFee"
          locale="es-ES"
          rules={proFormPaymentInfoFieldValidation.payableFee}
          placeholder="Please enter total payable fee"
        />
        <ProFormMoney
          width="lg"
          label="Paid Fee"
          name="paidFee"
          locale="es-ES"
          rules={proFormPaymentInfoFieldValidation.paidFee}
          placeholder="Please enter fee paid"
        />
        <ProForm.Item name="image" style={{ marginLeft: '' }} label="Payment Proof">
          <CustomUpload
            multiple={false}
            fileList={fileList}
            setFileList={setFileList}
            maxFileLength={1}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default PaymentInfo;
