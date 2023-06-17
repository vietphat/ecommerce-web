import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createOrder } from '../features/order/orderSlice';
import { deleteCartAfterOrder } from '../features/cart/cartSlice';

const PaypalButton = ({
  totalPrice,
  user,
  shippingInfo,
  paymentMethod,
  orderItems,
  totalPriceAfterDiscount,
  cart,
  formik,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'AUUgYMQozNK_mYGgRAXaAHzoKEBvrgkMB_q41ya4ZRj2S_mkyyS3bOrclPIWHSeoLh1z6PY9Gt1-XtLV',
      }}
    >
      <PayPalButtons
        disabled={!formik.isValid}
        style={{ layout: 'horizontal' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: totalPrice,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(async function (details) {
            const data = {
              user: user._id,
              shippingInfo,
              paymentMethod,
              orderItems,
              totalPrice,
              totalPriceAfterDiscount,
              paid: true,
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
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
