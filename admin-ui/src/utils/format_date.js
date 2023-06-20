const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB').split('/').join('/');
};

export default formatDate;
