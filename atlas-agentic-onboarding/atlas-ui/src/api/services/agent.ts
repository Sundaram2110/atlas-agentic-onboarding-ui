import api from '../axios';

export const chatAgent = async (prompt: string, context: any = {}) => {
  const res = await api.post('/agent/chat', { prompt, context });
  return res.data;
};

export const getAgents = async () => {
  const res = await api.get('/api/agent');
  return res.data.agents;
};

export const createAgent = async (agentData: { name: string; model: string; description: string }) => {
  const res = await api.post('/api/agent', agentData);
  return res.data;
};

export const updateAgent = async (id: string, agentData: { name: string; model: string; description: string }) => {
  const res = await api.put(`/api/agent/${id}`, agentData);
  return res.data;
};
