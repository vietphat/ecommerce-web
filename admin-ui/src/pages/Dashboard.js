import { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import format_currency from '../utils/format_currency';
import MONTH from '../utils/month';
import ORDER_STATUSES from '../utils/order_status';
import {
  getMonthlyIncomeReport,
  getYearlyIncomeReport,
  getRecentlyOrders,
} from '../features/auth/authSlice';

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'link',
  },
  {
    title: 'Thành tiền',
    dataIndex: 'amount',
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
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyOrderData, setMonthlyOrderData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthlyIncomeReport());
    dispatch(getYearlyIncomeReport());
    dispatch(getRecentlyOrders());
  }, [dispatch]);

  const { monthlyIncomeReport, yearlyIncomeReport, recentlyOrders } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (monthlyIncomeReport?.length > 0) {
      setMonthlyIncomeData(() => {
        return monthlyIncomeReport.map((data) => {
          return {
            month: MONTH[data._id.month],
            income: data.amount,
          };
        });
      });

      setMonthlyOrderData(() => {
        return monthlyIncomeReport.map((data) => {
          return {
            month: MONTH[data._id.month],
            ordersCount: data.totalOrders,
          };
        });
      });
    }
  }, [monthlyIncomeReport]);

  const incomeStaticConfig = {
    data: monthlyIncomeData,
    xField: 'month',
    yField: 'income',
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
      month: {
        alias: 'month',
      },
      income: {
        alias: 'income',
      },
    },
  };

  const ordersStaticConfig = {
    data: monthlyOrderData,
    xField: 'month',
    yField: 'ordersCount',
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
      month: {
        alias: 'month',
      },
      income: {
        alias: 'ordersCount',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rouned-3'>
          <div>
            <p className='desc'>Tổng thu nhập</p>
            <h4 className='mb-0 sub-title'>
              {yearlyIncomeReport.length > 0
                ? format_currency(yearlyIncomeReport[0]?.totalAmountEarned)
                : 'đang tải...'}
            </h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <p className='mb-0 desc'>{new Date().getFullYear()}</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rouned-3'>
          <div>
            <p className='desc'>Tổng số đơn hàng</p>
            <h4 className='mb-0 sub-title'>
              {yearlyIncomeReport.length > 0
                ? yearlyIncomeReport[0]?.totalOrders
                : 'đang tải...'}
            </h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <p className='mb-0 desc'>{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className='mt-4 d-flex justify-content-space-around gap-3'>
        <div className='flex-grow-1 w-50'>
          <h3 className='mb-5'>Thống kê thu nhập</h3>
          <div>
            <Column {...incomeStaticConfig} />
          </div>
        </div>

        <div className='flex-grow-1 w-50'>
          <h3 className='mb-5'>Thống kê số đơn hàng</h3>
          <div>
            <Column {...ordersStaticConfig} />
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='mb-5'>Các đơn hàng gần đây</h3>
        <div>
          <Table
            columns={columns}
            dataSource={recentlyOrders.map((order, index) => {
              return {
                key: order._id,
                index: index + 1,
                name: order.user.lastName + ' ' + order.user.firstName,
                email: order.user.email,
                link: (
                  <Link
                    to={`/admin/order-details/${order._id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Xem chi tiết
                  </Link>
                ),
                amount: format_currency(order.totalPriceAfterDiscount),
                status: ORDER_STATUSES[order.orderStatus],
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
