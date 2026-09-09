import { api } from './api';
import type { UserResponse } from './auth.service';

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export const usersService = {
  async register(payload: CreateUserPayload): Promise<UserResponse> {
    const response = await api.post<UserResponse>('/users', payload);
    return response.data;
  },
};
