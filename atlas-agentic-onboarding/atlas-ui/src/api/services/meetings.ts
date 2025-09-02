import api from '../axios';

export const scheduleOrientation = async (payload: any) => (await api.post('/meetings/orientation', payload)).data;
export const scheduleWithManager = async (payload: any) => (await api.post('/meetings/manager', payload)).data;
