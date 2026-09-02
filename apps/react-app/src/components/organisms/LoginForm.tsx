import { type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Divider } from '../molecules/Divider';
import { FormField } from '../molecules/FormField';
import { SocialButton } from '../molecules/SocialButton';

export function LoginForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Login logic
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 md:p-8">
      <Typography variant="h1" className="text-center">Boas-vindas!</Typography>
      <Typography className="text-center mb-8 text-[var(--text)]">
        Entre na sua conta para continuar
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          required
        />
        
        <div className="space-y-1">
          <FormField
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            required
          />
          <div className="flex justify-end">
            <Button variant="link" type="button" className="text-sm">
              Esqueceu a senha?
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full mt-4">
          Entrar
        </Button>
      </form>

      <Divider>ou entre com</Divider>

      <div className="space-y-3">
        <SocialButton provider="google">Entrar com Google</SocialButton>
        <SocialButton provider="github">Entrar com GitHub</SocialButton>
      </div>

      <div className="mt-8 text-center text-sm text-[var(--text)]">
        Ainda não tem uma conta?{' '}
        <Button variant="link" className="font-semibold text-[var(--text-h)] hover:text-accent">
          Cadastre-se
        </Button>
      </div>
    </div>
  );
}
