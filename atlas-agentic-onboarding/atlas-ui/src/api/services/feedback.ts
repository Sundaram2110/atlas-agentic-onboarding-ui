import api from '../axios';

export const triggerSurvey = async (payload: any) => (await api.post('/feedback/survey', payload)).data;
export const analyzeFeedback = async (employeeId: string) => (await api.get(`/feedback/analyze/${employeeId}`)).data;
