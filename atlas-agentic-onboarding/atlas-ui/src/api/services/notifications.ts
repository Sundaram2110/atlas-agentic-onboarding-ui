import api from '../axios';

export const notifyHR = async (payload: any) => (await api.post('/notifications/hr', payload)).data;
