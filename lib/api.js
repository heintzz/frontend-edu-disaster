import axios from 'axios';

const BASE_URL = process.env.BASE_API_ENDPOINT || 'http://localhost:3008/api/v1';

const apiV1 = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiV1;
