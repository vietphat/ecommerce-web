const formatCurrency = (number) => {
  return number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export default formatCurrency;
