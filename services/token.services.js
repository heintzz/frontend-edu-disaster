import Cookie from 'js-cookie';

const setAccessToken = (token) => {
  Cookie.set('access_token', token);
};

const getAccessToken = () => {
  return Cookie.get('access_token');
};

const getUserLoginStatus = () => {
  return getAccessToken() ? true : false;
};

const removeAccessToken = () => {
  Cookie.remove('access_token');
};

export const tokenServices = {
  setAccessToken,
  getAccessToken,
  getUserLoginStatus,
  removeAccessToken,
};
