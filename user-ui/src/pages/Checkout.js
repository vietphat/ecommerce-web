import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';

import formatCurrency from '../utils/format_currency';
import Container from '../components/Container';
import { deleteCartAfterOrder, getCart } from '../features/cart/cartSlice';
import Input from '../components/Input';
import { createOrder } from '../features/order/orderSlice';
// import PaypalButton from '../components/PaypalButton';
import Meta from '../components/Meta';
import Colors from '../components/Colors';

const orderSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđÀÁẠÃẢÂẦẤẬẪẨĂẰẮẶẴẲÈÉẸẼẺÊỀẾỆỄỂÌÍỊĨỈÒÓỌÕỎÔỒỐỘỖỔƠỜỚỢỠỞÙÚỤŨỦƯỪỨỰỮỬỲÝỴỸỶĐ]+$/,
      'Tên không hợp lệ'
    )
    .required('Tên không được để trống'),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z\sàáạãảâầấậẫẩăằắặẵẳèéẹẽẻêềếệễểìíịĩỉòóọõỏôồốộỗổơờớợỡởùúụũủưừứựữửỳýỵỹỷđÀÁẠÃẢÂẦẤẬẪẨĂẰẮẶẴẲÈÉẸẼẺÊỀẾỆỄỂÌÍỊĨỈÒÓỌÕỎÔỒỐỘỖỔƠỜỚỢỠỞÙÚỤŨỦƯỪỨỰỮỬỲÝỴỸỶĐ]+$/,
      'Tên không hợp lệ'
    )
    .required('Họ không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  // paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
  notes: Yup.string(),
});

const Checkout = () => {
  const [shippingFee, setShippingFee] = useState(25000);
  const [couponCode, setCouponCode] = useState('');
  const [reducedPrice, setReducedPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading: isOrdering } = useSelector((state) => state.order);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      address: user?.address,
      phoneNumber: user?.phoneNumber,
      notes: '',
      // paymentMethod: 'online',
    },
    validationSchema: orderSchema,
    onSubmit: async (values) => {
      // dữ liệu
      const data = {
        user: user._id,
        shippingInfo: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          notes: values.notes,
        },
        paymentMethod: 'cod', // values.paymentMethod,
        orderItems: cart.map((c) => {
          return {
            product: c.product._id,
            color: c.color._id,
            quantity: c.quantity,
            price: c.price,
          };
        }),
        totalPrice: totalPrice + shippingFee,
        totalPriceAfterDiscount: totalPrice + shippingFee - reducedPrice,
      };

      console.log(data);

      // create order
      const orderResult = await dispatch(createOrder(data));

      // xóa giỏ hàng
      if (orderResult.meta.requestStatus === 'fulfilled') {
        const cartIds = cart.map((c) => c._id);
        dispatch(deleteCartAfterOrder(cartIds));
      }
      formik.resetForm();
      navigate('/');
    },
  });

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (totalPrice && totalPrice > 3000000) {
      setShippingFee(0);
    }
  }, [totalPrice]);

  const handleApplyCoupon = async (couponCode, price) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/coupons/apply-coupon',
        {
          couponCode,
          price,
        }
      );

      if (res.status === 200) {
        setReducedPrice(res.data.data.reducedPrice);
        setDiscountPercent(res.data.data.coupon.discount);
        setCouponCode('');

        toast.success(
          `Bạn đã áp dụng mã giảm giá ${res.data.data.coupon.name} thành công! 
          (đã giảm ${res.data.data.coupon.discount}% vào giá trị đơn hàng)!`
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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

                {/* <select
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
                </div> */}

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
                    {/* {formik.values.paymentMethod === 'online' ? (
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
                        className={`button border-0 ${
                          formik.isValid ? '' : 'invalid-button'
                        }`}
                      >
                        Đặt hàng
                      </button>
                    )} */}

                    {isOrdering ? (
                      <div>
                        Đang đặt hàng
                        <div class='spinner-border text-dark' role='status'>
                          <span class='visually-hidden'>Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        disabled={!formik.isValid}
                        type='submit'
                        className={`button border-0 ${
                          formik.isValid ? '' : 'invalid-button'
                        }`}
                        onClick={formik.handleSubmit}
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
                          <Link
                            to={`/product/${c.product._id}`}
                            className='total-price text-dark fw-bold'
                          >
                            {c.product.title}
                          </Link>
                          <div className='total-price d-flex align-items-center gap-1'>
                            {formatCurrency(c.price)} /{' '}
                            <Colors colors={c.product.colors} class1='mb-0' />
                          </div>
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
                <p className='total fw-bold'>Thành tiền</p>
                <p
                  className={`total-price ${
                    reducedPrice > 0 && 'text-decoration-line-through'
                  }`}
                >
                  {formatCurrency(totalPrice)}
                </p>
              </div>

              {reducedPrice > 0 && (
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='total fw-bold'>
                    Thành tiền sau khi giảm giá ({discountPercent}%)
                  </p>
                  <p className='total-price'>
                    {formatCurrency(totalPrice - reducedPrice)}
                  </p>
                </div>
              )}

              <div className='d-flex justify-content-between align-items-center'>
                <p className='mb-0 total fw-bold'>
                  Vận chuyển (miễn phí cho các đơn hàng trên 3tr đồng)
                </p>
                <p className='mb-0 total-price'>
                  {formatCurrency(shippingFee)}
                </p>
              </div>
            </div>

            <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
              <h4 className='total'>Tổng cộng</h4>
              <h5 className='total-price'>
                {formatCurrency(totalPrice + shippingFee - reducedPrice)}
              </h5>
            </div>

            <div className='d-flex justify-content-between py-4'>
              <input
                className='form-control'
                type='text'
                placeholder='Mã giảm giá'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />

              <button
                disabled={couponCode === ''}
                type='button'
                className='btn btn-danger'
                onClick={() => handleApplyCoupon(couponCode, totalPrice)}
              >
                MÃ GIẢM GIÁ (nếu có)
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
