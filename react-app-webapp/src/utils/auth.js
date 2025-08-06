// Token hantering.

import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  };
};

export const isTokenValid = (token) => {
  if (!token) {
    return false;
  };

  try {
    const decoded = decodeToken(token);

    if (!decoded) {
      return false;
    };

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  };
};

export const saveUserData = (token) => {
  try {
    localStorage.setItem('token', token);

    const userInfo = getUserInfoFromToken(token);

    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    console.log('User data saved:', { token, userInfo });
  } catch (error) {
    console.error('Error saving user data.', error);
  };
};

export const getUserData = () => {
  try {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');

    if (!token || !isTokenValid(token)) {
      clearUserData();
      return null;
    }

    return {
      token,
      userInfo: userInfo ? JSON.parse(userInfo) : null
    };
  } catch (error) {
    console.error('Error getting user data.', error);
    clearUserData();
    return null;
  };
};

export const clearUserData = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Error clearing user data.', error);
  };
};

export const getUserInfoFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);

    if (!decoded) {
      return null;
    }

    console.log('Decoded token.', decoded);

    return {
      id: decoded.id,
      user: decoded.user,
      avatar: decoded.avatar,
      email: decoded.email,
      exp: decoded.exp,
      iat: decoded.iat
    };
  } catch (error) {
    console.error('Error extracting user data from token.', error);
    return null;
  };
};