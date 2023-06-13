import { useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { FaClipboardList, FaBloggerB, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineManageSearch } from 'react-icons/md';
import { IoIosNotifications } from 'react-icons/io';
import { RiCouponLine } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <h2 className='text-white fs-5 text-center py-4 mb-0'>
            <span className='sm-logo'>CAD</span>
            <span className='lg-logo'>Code And Die</span>
          </h2>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
              title: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Khách hàng',
              title: 'Khách hàng',
            },
            {
              key: 'management',
              icon: <MdOutlineManageSearch className='fs-4' />,
              label: 'Quản lý',
              title: 'Quản lý',
              children: [
                {
                  key: 'add-product',
                  // icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Thêm sản phẩm',
                  title: 'Thêm sản phẩm',
                },
                {
                  key: 'products-list',
                  // icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Danh sách sản phẩm',
                  title: 'Danh sách sản phẩm',
                },
                {
                  key: 'add-brand',
                  // icon: <SiBrandfolder className='fs-4' />,
                  label: 'Thêm thương hiệu',
                  title: 'Thêm thương hiệu',
                },
                {
                  key: 'brands-list',
                  // icon: <SiBrandfolder className='fs-4' />,
                  label: 'Danh sách thương hiệu',
                  title: 'Danh sách thương hiệu',
                },
                {
                  key: 'add-product-category',
                  // icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Thêm loại sản phẩm',
                  title: 'Thêm loại sản phẩm',
                },
                {
                  key: 'product-categories-list',
                  // icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Danh sách loại sản phẩm',
                  title: 'Danh sách loại sản phẩm',
                },
                {
                  key: 'add-color',
                  // icon: <MdColorLens className='fs-4' />,
                  label: 'Thêm màu sản phẩm',
                  title: 'Thêm màu sản phẩm',
                },
                {
                  key: 'colors-list',
                  // icon: <MdColorLens className='fs-4' />,
                  label: 'Danh sách màu sản phẩm',
                  title: 'Danh sách màu sản phẩm',
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Đơn đặt hàng',
              title: 'Đơn đặt hàng',
            },
            {
              key: 'coupons',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Mã khuyến mãi',
              title: 'Mã khuyến mãi',
              children: [
                {
                  key: 'add-coupon',
                  // icon: <FaBloggerB className='fs-4' />,
                  label: 'Thêm mã khuyến mãi',
                  title: 'Thêm mã khuyến mãi',
                },
                {
                  key: 'coupons-list',
                  // icon: <FaBloggerB className='fs-4' />,
                  label: 'Danh sách mã khuyến mãi',
                  title: 'Danh sách mã khuyến mãi',
                },
              ],
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              title: 'Blogs',
              children: [
                {
                  key: 'add-blog',
                  // icon: <FaBloggerB className='fs-4' />,
                  label: 'Thêm bài viết',
                  title: 'Thêm bài viết',
                },
                {
                  key: 'blogs-list',
                  // icon: <FaBloggerB className='fs-4' />,
                  label: 'Danh sách bài viết',
                  title: 'Danh sách bài viết',
                },
                {
                  key: 'add-blog-category',
                  label: 'Thêm danh mục bài viết',
                  title: 'Thêm danh mục bài viết',
                },
                {
                  key: 'blog-categories-list',
                  // icon: <FaBloggerB className='fs-4' />,
                  label: 'Danh mục bài viết',
                  title: 'Danh mục bài viết',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <FaQuestionCircle className='fs-4' />,
              label: 'Phản hồi của khách hàng',
              title: 'Phản hồi của khách hàng',
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='d-flex gap-4 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div>

            <div className='d-flex gap-3 align-items-center dropdown'>
              <div>
                <img
                  width={32}
                  height={32}
                  src='https://laughingsquid.com/wp-content/uploads/walt.jpg'
                  alt=''
                  className='img-fluid'
                />
              </div>

              <div
                role='button'
                id='dropdownMenuLink'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <h5 className='mb-0'>PhatLe</h5>
                <p className='mb-0'>vietphatt1909@gmail.com</p>
              </div>

              <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
                <li>
                  <Link
                    to='/'
                    className='dropdown-item py-1 mb-1'
                    style={{ height: 'auto', lineHeight: '20px' }}
                  >
                    Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='dropdown-item py-1 mb-1'
                    style={{ height: 'auto', lineHeight: '20px' }}
                  >
                    Đăng xuất
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position='top-right'
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme='light'
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
