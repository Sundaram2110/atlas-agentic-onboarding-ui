import api from '../axios';

// export const chatAgent = async (message: string) => {
//   const res = await api.post('/agent/chat', { message });
//   return res.data;
// };
export async function chatAgent(request: RequestInfo, options?: RequestInit): Promise<any> {
  return fetch(request, options).then(res => res.json());
}