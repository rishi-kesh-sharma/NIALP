import React, { useEffect, useState } from 'react';
import { Form, Card, message, Select, Upload } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { getCategory, getSubCategory, save } from '../service';
import { Municipality } from '@/data/Municipalities';
import { Districts } from '@/data/Districts';
import GoogleMapComponent from '@/data/GoogleMapComponent';

const EntryForm = (props) => {
  const [fileList, setFileList] = useState([]);

  ////function f=s for picking the location of the doctors
  const [form] = Form.useForm();
  const onChange = (info) => {
    if (info.file.type.startsWith('image/')) {
      setFileList(info.fileList);
    } else {
      message.error('File type must be image');
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
  };
  const onFinish = async (values) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }
    for (const file of fileList) {
      formData.append('images', file.originFileObj);
    }
    console.log(formData.get('images'));
    const result = await save(formData);
    if (result instanceof Error || result.status == 'error' || !result.success) {
      message.error(result.message);
    } else {
      message.success(result.message);
      form.resetFields();
      // setRole(null);
    }
  };

  return (
    <PageContainer pageHeaderRender={false}>
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          onFinish={(v) => onFinish(v)}
          form={form}
        >
          <ProFormText
            width="lg"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter  name',
              },
            ]}
            placeholder="Please enter  name"
          />

          <ProFormText
            width="lg"
            label="Alias"
            name="alias"
            rules={[
              {
                required: false,
                message: 'Please enter the alias',
              },
            ]}
            placeholder="Please enter  alias"
          />
          <ProFormText
            width="lg"
            label="Descripton"
            name="description"
            rules={[
              {
                required: false,
                message: 'Please enter the description',
              },
            ]}
            placeholder="Please enter the description"
          />
          <label>Images</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple="true"
            className="m-auto"
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
