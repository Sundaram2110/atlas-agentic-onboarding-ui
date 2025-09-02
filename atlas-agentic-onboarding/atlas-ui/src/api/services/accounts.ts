import api from '../axios';

export const createUserAccount = async (payload: any) => (await api.post('/accounts/create', payload)).data;
