import api from '../axios';

export const generateESignLink = async (payload: any) => (await api.post('/esignature/generate', payload)).data;
