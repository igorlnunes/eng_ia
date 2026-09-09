import { api } from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const authService = {
  async login(credentials: LoginPayload): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    if (response.data?.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  async getProfile(): Promise<UserResponse> {
    const response = await api.get<UserResponse>('/auth/profile');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  },
};
