import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { LoginForm } from './LoginForm';
import { authService } from '../../services/auth.service';

vi.mock('../../services/auth.service', () => ({
  authService: {
    login: vi.fn(),
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<LoginForm />);
    expect(screen.getByRole('heading', { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email ou usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders social buttons', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument();
  });

  it('executes successful login and triggers onSuccess', async () => {
    const handleSuccess = vi.fn();
    vi.mocked(authService.login).mockResolvedValueOnce({
      access_token: 'fake-token-123',
    });

    render(<LoginForm onSuccess={handleSuccess} />);

    fireEvent.change(screen.getByLabelText(/email ou usuário/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secret123',
      });
      expect(handleSuccess).toHaveBeenCalledWith('fake-token-123');
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('displays error message when login fails with 401', async () => {
    const axiosError = new axios.AxiosError(
      'Unauthorized',
      '401',
      undefined,
      undefined,
      {
        status: 401,
        statusText: 'Unauthorized',
        data: { message: 'Unauthorized' },
        headers: {},
        config: {} as any,
      }
    );
    vi.mocked(authService.login).mockRejectedValueOnce(axiosError);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email ou usuário/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/email ou senha incorretos/i);
    });
  });

  it('disables button and displays loading text while submitting', async () => {
    let resolveLogin: (val: any) => void = () => {};
    const pendingPromise = new Promise((resolve) => {
      resolveLogin = resolve;
    });
    vi.mocked(authService.login).mockReturnValueOnce(pendingPromise as any);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email ou usuário/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('button', { name: /entrando.../i })).toBeDisabled();

    resolveLogin({ access_token: 'token' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
    });
  });
});
