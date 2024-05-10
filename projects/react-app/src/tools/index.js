import axios from 'axios';
import { HTTP_METHODS } from '../common_constants/business';

const { getFormattedDateWithRelativeDays } = require('./dateUtils');
const { useClientViewData } = require('./hooks');

const prepareUsers = (list) => {
  window.users = {};
  const _users = {};
  list.forEach?.((i) => {
    window.users[i.email] = i;
    _users[i._id] = i;
  });
  return _users;
};

const getTokenData = (token) => (token ? JSON.parse(window.atob(token.split('.')[1])) : false);

const request_platform = async (checkType, url, dataDynamic, callback, onError) => {
  try {
    const token = window.localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };
    let response;

    switch (checkType) {
      case HTTP_METHODS.POST:
        response = await axios.post(`${process.env.REACT_APP_API}${url}`, dataDynamic, {
          headers: headers,
        });
        break;
      case HTTP_METHODS.DELETE:
        response = await axios.delete(`${process.env.REACT_APP_API}${url}${dataDynamic}`, {
          headers: headers,
        });
        break;
      case HTTP_METHODS.GET:
        response = await axios.get(`${process.env.REACT_APP_API}${url}`, {
          headers: headers,
          params: dataDynamic,
        });
        break;
      case HTTP_METHODS.PUT:
        response = await axios.put(`${process.env.REACT_APP_API}${url}`, dataDynamic, {
          headers: headers,
        });
        break;
      case HTTP_METHODS.PATCH:
        response = await axios.patch(`${process.env.REACT_APP_API}${url}`, dataDynamic, {
          headers: headers,
        });
        break;
      default:
        break;
    }

    if (!response.data.status) {
      if (typeof onError === 'function') onError('', '', response.data);
      else {
        console.error(response.data.errorMessage, response.data);
      }
      return;
    }
    return callback(response.data);
  } catch (err) {
    console.error(err);
    if (typeof onError === 'function') onError('', '', err);
  }
};

const request = {
  async post(url, data, callback, onError) {
    await request_platform(HTTP_METHODS.POST, url, data, callback, onError);
  },
  async delete(url, id, callback, onError) {
    await request_platform(HTTP_METHODS.DELETE, url, id, callback, onError);
  },
  async get(url, params, callback, onError) {
    await request_platform(HTTP_METHODS.GET, url, params, callback, onError);
  },
  async put(url, data, callback, onError) {
    await request_platform(HTTP_METHODS.PUT, url, data, callback, onError);
  },
  async patch(url, data, callback, onError) {
    await request_platform(HTTP_METHODS.PATCH, url, data, callback, onError);
  },
};

export { request, prepareUsers, getTokenData, getFormattedDateWithRelativeDays, useClientViewData };
