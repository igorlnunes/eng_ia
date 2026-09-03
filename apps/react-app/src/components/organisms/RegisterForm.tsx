import { type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { Checkbox } from '../atoms/Checkbox';
import { Typography } from '../atoms/Typography';
import { Divider } from '../molecules/Divider';
import { FormField } from '../molecules/FormField';
import { SocialButton } from '../molecules/SocialButton';

interface RegisterFormProps {
  onNavigateToLogin?: () => void;
}

export function RegisterForm({ onNavigateToLogin }: RegisterFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col justify-center py-2">
      <Typography variant="h1" className="mb-1 text-2xl md:text-3xl font-bold text-white text-left">
        Cadastro
      </Typography>
      <Typography className="mb-5 text-xs sm:text-sm text-gray-300 text-left font-normal">
        Olá! Preencha seus dados.
      </Typography>

      <form onSubmit={handleSubmit} className="w-full">
        <FormField
          id="register-name"
          label="Nome"
          type="text"
          placeholder="Nome completo"
          required
          className="mb-4"
        />

        <FormField
          id="register-email"
          label="Email"
          type="email"
          placeholder="Digite seu email"
          required
          className="mb-4"
        />

        <FormField
          id="register-password"
          label="Senha"
          type="password"
          placeholder="******"
          required
          className="mb-3"
        />

        <div className="flex items-center mt-2 mb-5 text-xs">
          <Checkbox id="register-remember" label="Lembrar-me" />
        </div>

        <Button
          type="submit"
          className="w-full bg-brand-green hover:bg-brand-green-hover text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors shadow-md"
        >
          <span>Cadastrar</span>
          <span className="text-base font-bold">→</span>
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
