import api from '../axios';

export const chatAgent = async (message: string) => {
  const res = await api.post('/agent/chat', { message });
  return res.data;
};