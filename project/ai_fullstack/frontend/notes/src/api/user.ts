import axios from './config';
import type { Credential } from '@/types';

export const doLogin = (data: Credential) => {
  return axios.post('/auth/login', data);
}

