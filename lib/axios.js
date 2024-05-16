import axios from 'axios';

const apiV1 = axios.create({
  baseURL: 'http://localhost:3008/api/v1',
});

export default apiV1;
