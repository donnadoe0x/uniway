import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://YOUR_BACKEND_IP:5000/api',
  timeout: 10000,
});
