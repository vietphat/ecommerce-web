import { Navigate } from 'react-router-dom';

export const OpenRoutes = ({ children }) => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : '';

  if (user) {
    return <Navigate to={'/admin'} replace={true} />;
  }

  return children;
};
