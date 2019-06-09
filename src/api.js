import axios from 'axios';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      console.log(err);
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
