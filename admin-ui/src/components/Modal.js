import React from 'react';
import { Modal as ModalAnt } from 'antd';

const Modal = ({ title, content, open, handleOk, handleCancel }) => {
  return (
    <ModalAnt title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <p>{content}</p>
    </ModalAnt>
  );
};

export default Modal;
