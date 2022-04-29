import QS from 'qs';
import { useNavigate } from 'react-router-dom';

export const getCurrentUrl = () => {
  try {
    return decodeURI(`${window.location.pathname}${window.location.search}`);
  } catch (e) {
    return '/';
  }
};

export const attachObjectQueriesToUrl = (url = '/', object = {}, encode = false) => {
  const currentQSIndex = url.indexOf('?');
  if (currentQSIndex > -1) {
    return `${url}&${QS.stringify(object, { encode })}`;
  }
  return `${url}?${QS.stringify(object, { encode })}`;
};

export const redirect = ({ url, backUrl }) => {
  const navigate = useNavigate();
  const finalUrl = !!backUrl
    ? attachObjectQueriesToUrl(url, { backUrl: backUrl || getCurrentUrl() })
    : url;
  if (!finalUrl) return;
  return navigate(url);
};
