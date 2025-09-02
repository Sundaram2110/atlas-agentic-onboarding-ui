import api from '../axios';

export const submitITRequest = async (payload: any) => (await api.post('/it/request', payload)).data;
