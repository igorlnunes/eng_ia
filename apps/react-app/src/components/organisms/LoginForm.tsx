import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Typography } from '../atoms/Typography';
import { Divider } from '../molecules/Divider';
import { FormField } from '../molecules/FormField';
import { SocialButton } from '../molecules/SocialButton';
import { authService } from '../../services/auth.service';

interface LoginFormProps {
  onNavigateToRegister?: () => void;
  onSuccess?: (token: string) => void;
}

export function LoginForm({ onNavigateToRegister, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      onSuccess?.(data.access_token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setErrorMessage('Email ou senha incorretos.');
        } else {
          const apiMessage = err.response?.data?.message;
          setErrorMessage(
            Array.isArray(apiMessage)
              ? apiMessage.join(', ')
              : (apiMessage || 'Erro ao realizar login. Tente novamente.')
          );
        }
      } else {
        setErrorMessage('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center py-2">
      <Typography variant="h1" className="mb-1 text-2xl md:text-3xl font-bold text-white text-left">
        Login
      </Typography>
      <Typography className="mb-5 text-xs sm:text-sm text-gray-300 text-left font-normal">
        Boas-vindas! Faça seu login.
      </Typography>

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-2.5 bg-red-950/60 border border-red-500/60 rounded text-red-200 text-xs text-left"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <FormField
          id="email"
          label="Email ou usuário"
          type="text"
          placeholder="usuario123"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="mb-4"
        />
        
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="mb-3"
        />

        <div className="flex items-center justify-between mt-2 mb-5 text-xs">
          <Checkbox id="login-remember" label="Lembrar-me" defaultChecked disabled={loading} />
          <a href="#forgot" className="text-gray-300 hover:text-white underline underline-offset-2">
            Esqueci a senha
          </a>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-green hover:bg-brand-green-hover text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors shadow-md"
        >
          <span>{loading ? 'Entrando...' : 'Login'}</span>
          {!loading && <span className="text-base font-bold">→</span>}
        </Button>
      </form>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex items-center justify-center gap-6 my-2">
        <SocialButton provider="github">Github</SocialButton>
        <SocialButton provider="google">Gmail</SocialButton>
      </div>

      <div className="mt-5 text-center text-xs space-y-1">
        <p className="text-gray-300 text-xs">Ainda não tem conta?</p>
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="inline-flex items-center justify-center gap-1.5 text-brand-green font-bold text-xs hover:underline mt-1 bg-transparent border-0 cursor-pointer"
        >
          <span>Crie seu cadastro!</span>
          <span role="img" aria-label="clipboard">📋</span>
        </button>
      </div>
    </div>
  );
}
