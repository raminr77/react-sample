import { useNavigate } from 'react-router-dom';

export const redirect = ({ url }) => {
  const navigate = useNavigate();
  return navigate(url);
};
