import cookie from 'react-cookies';

export const currentUser = () => {
  let user = {};
  if (cookie.load('DIS_IQ')) {
    user = cookie.load('DIS_IQ');
  }
  return user;
};
