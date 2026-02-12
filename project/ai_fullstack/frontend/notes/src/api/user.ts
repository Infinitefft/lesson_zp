import axios from './config';
import type { Credential } from '@/types';

export const doLogin = (data: Credential) => {
  return axios.post('/auth/login', data);
}

export const getAiAvatar = (name: string) => {
  return axios.get(`/ai/avatar?name=${name}`);
}