import React from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
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

const data2 = [];
for (let i = 0; i < 46; i++) {
  data2.push({
    key: i,
    name: `Edward King ${i}`,
    product: `Macbook Air ${i}`,
    status: `Đang giao hàng`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: 'Tháng Một',
      sales: 38,
    },
    {
      type: 'Tháng Hai',
      sales: 52,
    },
    {
      type: 'Tháng Ba',
      sales: 61,
    },
    {
      type: 'Tháng Tư',
      sales: 145,
    },
    {
      type: 'Tháng Năm',
      sales: 48,
    },
    {
      type: 'Tháng Sáu',
      sales: 38,
    },
    {
      type: 'Tháng Bảy',
      sales: 38,
    },
    {
      type: 'Tháng Tám',
      sales: 38,
    },
    {
      type: 'Tháng Chín',
      sales: 38,
    },
    {
      type: 'Tháng Mười',
      sales: 38,
    },
    {
      type: 'Tháng Mười Một',
      sales: 38,
    },
    {
      type: 'Tháng Mười Hai',
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'months',
      },
      sales: {
        alias: 'income',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rouned-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>16.000.000đ</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'>
              <BsArrowDownRight /> 32%
            </h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rouned-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>16.000.000đ</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'>
              <BsArrowDownRight /> 32%
            </h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rouned-3'>
          <div>
            <p className='desc'>Total</p>
            <h4 className='mb-0 sub-title'>16.000.000đ</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'>
              <BsArrowUpRight /> 32%
            </h6>
            <p className='mb-0 desc'>Compare To April 2022</p>
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='mb-5'>Thống kê thu nhập</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='mb-5'>Các đơn hàng gần đây</h3>
        <div>
          <Table columns={columns} dataSource={data2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
