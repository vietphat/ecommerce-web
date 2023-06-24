const ORDER_STATUS = {
  ordered: 'Đã đặt hàng',
  approved: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao hàng',
  completed: 'Đã hoàn thành',
  canceled: 'Đã hủy bỏ',
  returned: 'Đã hoàn trả',
};

export const ORDER_STATUS_BADGES = {
  ordered: 'badge bg-info text-dark',
  approved: 'badge bg-primary',
  processing: 'badge bg-danger',
  shipped: 'badge bg-warning text-dark',
  completed: 'badge bg-success',
  canceled: 'badge bg-secondary',
  returned: 'badge bg-dark',
};

export default ORDER_STATUS;
