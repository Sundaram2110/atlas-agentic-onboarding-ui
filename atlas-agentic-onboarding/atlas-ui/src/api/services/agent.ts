import api from '../axios';

export const chatAgent = async (prompt: string, context: any = {}) => {
  const res = await api.post('/agent/chat', { prompt, context });
  return res.data;
};