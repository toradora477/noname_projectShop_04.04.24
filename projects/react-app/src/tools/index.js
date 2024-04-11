import axios from 'axios';

const request_platform = async (checkType, url, dataDynamic, callback, onError) => {
  try {
    let response;

    switch (checkType) {
      case 'post':
        response = await axios.post(`${process.env.REACT_APP_API}${url}`, dataDynamic);
        break;
      case 'delete':
        response = await axios.delete(`${process.env.REACT_APP_API}${url}${dataDynamic}`);
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
    await request_platform('post', url, data, callback, onError);
  },
  async delete(url, id, callback, onError) {
    await request_platform('delete', url, id, callback, onError);
  },
};

export { request };
