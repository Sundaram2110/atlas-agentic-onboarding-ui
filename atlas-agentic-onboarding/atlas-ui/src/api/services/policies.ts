import api from '../axios';

export const searchPolicies = async (query: string) => (await api.get('/policies/search', { params: { query } })).data;
