import { api } from './client';

export const fetchRoute = async (from: string, to: string) => {
  const response = await api.post('/route', { from, to });
  return response.data;
};