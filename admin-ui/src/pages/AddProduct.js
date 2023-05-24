import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import Input from '../components/Input';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event);
  };

  return (
    <div>
      <h3 className='mb-4 title'>Thêm sản phẩm</h3>

      <div>
        <Input type='text' label='Tên sản phẩm' />

        <div className='mb-3'>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <Input type='number' label='Giá' />

        <select name='' id='' className='form-control py-3 mb-3'>
          <option value=''>Chọn loại sản phẩm</option>
        </select>

        <select name='' id='' className='form-control py-3 mb-3'>
          <option value=''>Chọn màu</option>
        </select>

        <select name='' id='' className='form-control py-3 mb-3'>
          <option value=''>Chọn thương hiệu</option>
        </select>

        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>

        <form action=''>
          <button
            type='submit'
            className='btn btn-success border-0 ronded-3 my-5'
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
