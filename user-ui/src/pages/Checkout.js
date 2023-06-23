import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import formatCurrency from '../utils/format_currency';
import Container from '../components/Container';
import { deleteCartAfterOrder, getCart } from '../features/cart/cartSlice';
import Input from '../components/Input';
import { createOrder } from '../features/order/orderSlice';
import PaypalButton from '../components/PaypalButton';
import Meta from '../components/Meta';

const orderSchema = Yup.object({
  firstName: Yup.string().required('Tên không được để trống'),
  lastName: Yup.string().required('Họ không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
  paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
  notes: Yup.string(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: '',
      phoneNumber: user?.phoneNumber,
      notes: '',
      paymentMethod: '',
    },
    isInitialValid: false,
    validationSchema: orderSchema,
    onSubmit: async (values) => {
      if (formik.values.paymentMethod === 'cod') {
        // dữ liệu
        const data = {
          user: user._id,
          shippingInfo: {
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            address: formik.values.address,
            notes: formik.values.notes,
          },
          paymentMethod: formik.values.paymentMethod,
          orderItems: cart.map((c) => {
            return {
              product: c.product._id,
              color: c.color._id,
              quantity: c.quantity,
              price: c.price,
            };
          }),
          totalPrice: totalPrice,
          totalPriceAfterDiscount: totalPrice, // sửa sau
        };

        // create order
        const orderResult = await dispatch(createOrder(data));

        // xóa giỏ hàng
        if (orderResult.meta.requestStatus === 'fulfilled') {
          const cartIds = cart.map((c) => c._id);
          dispatch(deleteCartAfterOrder(cartIds));
        }
        formik.resetForm();
        navigate('/');
      }
      // dispatch(addEnquiry(values));
      // navigate('/');
    },
  });

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <>
      <Meta title='Techzone | Thanh toán' />
      <Container class1='checkout-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-7'>
            <div className='checkout-left-data'>
              <h3 className='website-name'>Techzone</h3>
              <nav
                style={{ '--bs-breadcrumb-divider': '>' }}
                aria-label='breadcrumb'
              >
                <ol className='breadcrumb'>
                  <li className='breadcrumb-item'>
                    <Link
                      className='text-dark total-price'
                      to='/cart'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp;/
                  <li
                    className='breadcrumb-item active total-price'
                    aria-current='page'
                  >
                    Thông tin
                  </li>
                  &nbsp;/
                  <li className='breadcrumb-item active total-price'>
                    Vận chuyển
                  </li>
                  &nbsp;/
                  <li
                    className='breadcrumb-item active total-price'
                    aria-current='page'
                  >
                    Thanh toán
                  </li>
                </ol>
              </nav>

              <h4 className='title total'>Thông tin liên hệ</h4>
              <p className='user-details total'>
                {user.firstName} ({user.email})
              </p>

              <h4 className='mb-3'>Thông tin giao hàng</h4>

              <form
                onSubmit={formik.handleSubmit}
                className='d-flex gap-15 flex-wrap justify-content-between'
              >
                <div className='flex-grow-1'>
                  <Input
                    type='text'
                    name='lastName'
                    containerClassnames='w-100'
                    placeholder='Họ'
                    value={formik.values.lastName}
                    onChange={formik.handleChange('lastName')}
                    onBlur={formik.handleBlur('lastName')}
                  />
                  <div className='error w-100 mt-2'>
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className='flex-grow-1'>
                  <Input
                    type='text'
                    name='firstName'
                    containerClassnames='w-100'
                    placeholder='Tên'
                    value={formik.values.firstName}
                    onChange={formik.handleChange('firstName')}
                    onBlur={formik.handleBlur('firstName')}
                  />
                  <div className='error w-100 mt-2'>
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div>
                  <Input
                    type='text'
                    name='phoneNumber'
                    containerClassnames='w-100'
                    placeholder='Số điện thoại'
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange('phoneNumber')}
                    onBlur={formik.handleBlur('phoneNumber')}
                  />
                  <div className='error w-100'>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </div>
                </div>

                <Input
                  type='text'
                  name='address'
                  containerClassnames='w-100'
                  placeholder='Địa chỉ'
                  value={formik.values.address}
                  onChange={formik.handleChange('address')}
                  onBlur={formik.handleBlur('address')}
                />
                <div className='error w-100'>
                  {formik.touched.address && formik.errors.address}
                </div>

                <select
                  className='form-select'
                  name='paymentMethod'
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange('paymentMethod')}
                  onBlur={formik.handleBlur('paymentMethod')}
                >
                  <option value={''}>Phương thức thanh toán</option>
                  <option value={'online'}>Trực tuyến</option>
                  <option value={'cod'}>COD (Trả tiền khi nhận hàng)</option>
                </select>
                <div className='error w-100'>
                  {formik.touched.paymentMethod && formik.errors.paymentMethod}
                </div>

                <div>
                  <textarea
                    className='w-100 form-control'
                    cols={100}
                    rows={5}
                    name='notes'
                    placeholder='Ghi chú'
                    value={formik.values.notes}
                    onChange={formik.handleChange('notes')}
                    onBlur={formik.handleBlur('notes')}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                <div className='error w-100'>
                  {formik.touched.notes && formik.errors.notes}
                </div>

                <div className='w-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <Link
                      to='/cart'
                      className='text-dark'
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <BiArrowBack className='me-2' />
                      Quay về giỏ hàng
                    </Link>
                    {formik.values.paymentMethod === 'online' ? (
                      <PaypalButton
                        totalPrice={totalPrice}
                        user={user}
                        shippingInfo={{
                          firstName: formik.values.firstName,
                          lastName: formik.values.lastName,
                          address: formik.values.address,
                          notes: formik.values.notes,
                        }}
                        paymentMethod={formik.values.paymentMethod}
                        orderItems={cart.map((c) => {
                          return {
                            product: c.product._id,
                            color: c.color._id,
                            quantity: c.quantity,
                            price: c.price,
                          };
                        })}
                        totalPriceAfterDiscount={totalPrice}
                        cart={cart}
                        formik={formik}
                      />
                    ) : (
                      <button
                        disabled={!formik.isValid}
                        type='submit'
                        className='button border-0'
                      >
                        Đặt hàng
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className='col-5'>
            <div className='border-bottom py-4'>
              {cart?.length > 0 ? (
                cart?.map((c) => {
                  return (
                    <div
                      key={c._id}
                      className='d-flex gap-10 mb-2 align-items-center'
                    >
                      <div className='w-75 d-flex gap-10'>
                        <div className='w-25 position-relative'>
                          <span
                            style={{ top: '-10px', right: '2px' }}
                            className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
                          >
                            {c.quantity}
                          </span>
                          <img
                            className='img-fluid'
                            src={c.product.images[0].url}
                            alt='product'
                          />
                        </div>

                        <div>
                          <h5 className='total-price'>{c.product.title}</h5>
                          <p className='total-price d-flex align-items-center gap-1'>
                            {formatCurrency(c.price)} /{' '}
                            <li
                              style={{
                                backgroundColor: c.color.title,
                                listStyle: 'none',
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                              }}
                            />
                          </p>
                        </div>
                      </div>

                      <div className='flex-grow-1'>
                        <h5 className='total'>
                          {formatCurrency(c.price * c.quantity)}
                        </h5>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='text-center fs-5'>Empty</div>
              )}
            </div>

            <div className='border-bottom py-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='total'>Thành tiền</p>
                <p className='total-price'>{formatCurrency(totalPrice)}</p>
              </div>

              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total'>Vận chuyển</p>
                <p className='mb-0 total-price'>
                  {formatCurrency(totalPrice < 3000000 ? 25000 : 0)}
                </p>
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total'>Tổng</h4>
              <h5 className='total-price'>
                {formatCurrency(
                  totalPrice + (totalPrice < 3000000 ? 25000 : 0)
                )}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
