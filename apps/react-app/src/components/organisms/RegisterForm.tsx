import { useState, type FormEvent } from 'react';
import axios from 'axios';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Typography } from '../atoms/Typography';
import { Divider } from '../molecules/Divider';
import { FormField } from '../molecules/FormField';
import { SocialButton } from '../molecules/SocialButton';
import { usersService } from '../../services/users.service';

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
  onSuccess?: () => void;
}

export function RegisterForm({ onNavigateToLogin, onSuccess }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await usersService.register({ name, email, password });
      setSuccessMessage('Cadastro realizado com sucesso! Redirecionando...');
      onSuccess?.();
      onNavigateToLogin?.();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setErrorMessage('Este e-mail já está cadastrado.');
        } else {
          const apiMessage = err.response?.data?.message;
          setErrorMessage(
            Array.isArray(apiMessage)
              ? apiMessage.join(', ')
              : (apiMessage || 'Erro ao criar conta. Tente novamente.')
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
        Cadastro
      </Typography>
      <Typography className="mb-5 text-xs sm:text-sm text-gray-300 text-left font-normal">
        Olá! Preencha seus dados.
      </Typography>

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-2.5 bg-red-950/60 border border-red-500/60 rounded text-red-200 text-xs text-left"
        >
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-4 p-2.5 bg-green-950/60 border border-green-500/60 rounded text-green-200 text-xs text-left"
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <FormField
          id="register-name"
          label="Nome"
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          className="mb-4"
        />

        <FormField
          id="register-email"
          label="Email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="mb-4"
        />

        <FormField
          id="register-password"
          label="Senha"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="mb-3"
        />

        <div className="flex items-center mt-2 mb-5 text-xs">
          <Checkbox id="register-remember" label="Lembrar-me" disabled={loading} />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-green hover:bg-brand-green-hover text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors shadow-md"
        >
          <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
          {!loading && <span className="text-base font-bold">→</span>}
        </Button>
      </form>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex items-center justify-center gap-6 my-2">
        <SocialButton provider="github">Github</SocialButton>
        <SocialButton provider="google">Gmail</SocialButton>
      </div>

      <div className="mt-5 text-center text-xs space-y-1">
        <p className="text-gray-300 text-xs">Já tem conta?</p>
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-flex items-center justify-center gap-1.5 text-brand-green font-bold text-xs hover:underline mt-1 bg-transparent border-0 cursor-pointer"
        >
          <span>Faça seu login!</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
