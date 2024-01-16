import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import { toBase64 } from '@/utils';

const CustomUpload = ({
  fileList,
  setFileList,
  maxFileLength = 1,
  multiple = false,
  text = 'Image',
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  if (fileList.length > maxFileLength) {
    return null;
  }

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await toBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  return (
    <>
      <Upload
        onPreview={handlePreview}
        multiple={multiple}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        style={{ display: 'flex !important', gap: '1rem', alignItems: 'center' }}
      >
        {/* <Button disabled={fileList.length >= maxFileLength} size="large" icon={<UploadOutlined />}>
          {text}
        </Button> */}

        {fileList.length < maxFileLength && <PlusOutlined />}
      </Upload>
      <Modal
        oncancel={handleCancel}
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
export default CustomUpload;
