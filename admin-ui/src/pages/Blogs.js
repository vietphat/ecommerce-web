import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'STT',
    dataIndex: 'key',
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    product: `Macbook Air ${i}`,
    status: `Đang giao hàng`,
  });
}

const Blogs = () => {
  return (
    <div>
      <h3 className='mt-4 title'>Danh sách bài viết</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Blogs;
