import { describe, it, expect, beforeEach } from 'vitest';
import type { InternalAxiosRequestConfig } from 'axios';
import { api, API_BASE_URL } from './api';

describe('api client', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('possui a baseURL configurada', () => {
    expect(api.defaults.baseURL).toBe(API_BASE_URL);
  });

  it('injeta o token Bearer no header se access_token existir no localStorage', async () => {
    localStorage.setItem('access_token', 'token-teste-123');

    // Executa os interceptors registrados
    const requestInterceptor = (api.interceptors.request as any).handlers[0];
    const config = { headers: {} } as InternalAxiosRequestConfig;

    const modifiedConfig = await requestInterceptor.fulfilled(config);
    expect(modifiedConfig.headers.Authorization).toBe('Bearer token-teste-123');
  });

  it('não injeta o Authorization se access_token não existir no localStorage', async () => {
    const requestInterceptor = (api.interceptors.request as any).handlers[0];
    const config = { headers: {} } as InternalAxiosRequestConfig;

    const modifiedConfig = await requestInterceptor.fulfilled(config);
    expect(modifiedConfig.headers.Authorization).toBeUndefined();
  });

  it('rejeita no error handler do interceptor', async () => {
    const requestInterceptor = (api.interceptors.request as any).handlers[0];
    const error = new Error('request error');
    await expect(requestInterceptor.rejected(error)).rejects.toThrow('request error');
  });
});
