const BASE_URL = process.env.BASE_API_ENDPOINT || 'http://localhost:3008/api/v1';

const apiV1 = (path, options) => {
  return fetch(
    BASE_URL + path,
    options || {
      method: 'GET',
    }
  );
};

export default apiV1;
