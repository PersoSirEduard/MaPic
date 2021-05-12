import axios from 'axios';
import config from 'config';

export default axios.create({
  baseURL: config.ApiUrl,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});