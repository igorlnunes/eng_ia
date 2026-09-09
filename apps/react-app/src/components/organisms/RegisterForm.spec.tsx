import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { RegisterForm } from './RegisterForm';
import { usersService } from '../../services/users.service';

vi.mock('../../services/users.service', () => ({
  usersService: {
    register: vi.fn(),
  },
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form heading and subtitle', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('heading', { name: /^cadastro$/i })).toBeInTheDocument();
    expect(screen.getByText(/olá! preencha seus dados/i)).toBeInTheDocument();
  });

  it('renders all input fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/^nome$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^senha$/i)).toBeInTheDocument();
  });

  it('renders the Lembrar-me checkbox', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('checkbox', { name: /lembrar-me/i })).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();
  });

  it('renders social login buttons', () => {
    render(<RegisterForm />);
    expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gmail/i })).toBeInTheDocument();
  });

  it('renders the navigate-to-login link button', () => {
    const handleNavigate = vi.fn();
    render(<RegisterForm onNavigateToLogin={handleNavigate} />);
    expect(screen.getByRole('button', { name: /faça seu login/i })).toBeInTheDocument();
  });

  it('submits form successfully and calls onNavigateToLogin', async () => {
    const handleNavigate = vi.fn();
    vi.mocked(usersService.register).mockResolvedValueOnce({
      id: '1',
      name: 'João',
      email: 'joao@example.com',
      createdAt: '2026-09-09',
    });

    render(<RegisterForm onNavigateToLogin={handleNavigate} />);

    fireEvent.change(screen.getByLabelText(/^nome$/i), {
      target: { value: 'João Silva' },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'joao@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'senha123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(usersService.register).toHaveBeenCalledWith({
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'senha123',
      });
      expect(handleNavigate).toHaveBeenCalled();
    });
  });

  it('displays error message when registration fails with 409 conflict', async () => {
    const axiosError = new axios.AxiosError(
      'Conflict',
      '409',
      undefined,
      undefined,
      {
        status: 409,
        statusText: 'Conflict',
        data: { message: 'Email already registered' },
        headers: {},
        config: {} as any,
      }
    );
    vi.mocked(usersService.register).mockRejectedValueOnce(axiosError);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/^nome$/i), {
      target: { value: 'João Silva' },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'joao@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'senha123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/este e-mail já está cadastrado/i);
    });
  });

  it('disables button and displays loading text while submitting', async () => {
    let resolveRegister: (val: any) => void = () => {};
    const pendingPromise = new Promise((resolve) => {
      resolveRegister = resolve;
    });
    vi.mocked(usersService.register).mockReturnValueOnce(pendingPromise as any);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/^nome$/i), {
      target: { value: 'João Silva' },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'joao@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^senha$/i), {
      target: { value: 'senha123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

    expect(screen.getByRole('button', { name: /cadastrando.../i })).toBeDisabled();

    resolveRegister({ id: '1', name: 'João', email: 'joao@example.com', createdAt: '2026-09-09' });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cadastrar/i })).not.toBeDisabled();
    });
  });
});
