import api from '../axios';

export const assignTraining = async (payload: any) => (await api.post('/training/assign', payload)).data;
export const trainingProgress = async (employeeId: string) => (await api.get(`/training/progress/${employeeId}`)).data;
