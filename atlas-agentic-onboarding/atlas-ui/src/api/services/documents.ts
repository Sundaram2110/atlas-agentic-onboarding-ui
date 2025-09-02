import api from '../axios';

export const listDocuments = async () => (await api.get('/documents')).data;
export const uploadDocuments = async (employeeId: string, documents: any[]) => (await api.post('/documents/upload', { employeeId, documents })).data;
export const checkDocumentStatus = async (employeeId: string) => (await api.get(`/documents/status/${employeeId}`)).data;
