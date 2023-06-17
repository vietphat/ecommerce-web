import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : '';

  if (!user) {
    return <Navigate to={'/login'} replace={true} />;
  }

  return children;
};
