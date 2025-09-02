import api from '../axios';

export const listEmployees = async () => (await api.get('/employees')).data;
export const sendWelcomeEmail = async (id: string) => (await api.post(`/employees/${id}/welcome`)).data;
export const assignBuddy = async (id: string, buddyId: string) => (await api.post(`/employees/${id}/buddy`, { buddyId })).data;
