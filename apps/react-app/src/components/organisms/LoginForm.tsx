import { type FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { Divider } from '../molecules/Divider';
import { FormField } from '../molecules/FormField';
import { SocialButton } from '../molecules/SocialButton';

export function LoginForm() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-col justify-center py-2">
      <Typography variant="h1" className="mb-1 text-2xl md:text-3xl font-bold text-white text-left">
        Login
      </Typography>
      <Typography className="mb-5 text-xs sm:text-sm text-gray-300 text-left font-normal">
        Boas-vindas! Faça seu login.
      </Typography>

      <form onSubmit={handleSubmit} className="w-full">
        <FormField
          id="email"
          label="Email ou usuário"
          type="text"
          placeholder="usuario123"
          required
          className="mb-4"
        />
        
        <FormField
          id="password"
          label="Senha"
          type="password"
          placeholder="******"
          required
          className="mb-3"
        />

        <div className="flex items-center justify-between mt-2 mb-5 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-gray-300 select-none">
            <input
              type="checkbox"
              defaultChecked
              className="w-3.5 h-3.5 accent-[#59F588] rounded bg-gray-700 border-0 cursor-pointer"
            />
            <span>Lembrar-me</span>
          </label>
          <a href="#forgot" className="text-gray-300 hover:text-white underline underline-offset-2">
            Esqueci a senha
          </a>
        </div>

        <Button type="submit" className="w-full bg-[#59F588] hover:bg-[#42E86E] text-black font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors shadow-md">
          <span>Login</span>
          <span className="text-base font-bold">→</span>
        </Button>
      </form>

      <Divider>ou entre com outras contas</Divider>

      <div className="flex items-center justify-center gap-6 my-2">
        <SocialButton provider="github">Github</SocialButton>
        <SocialButton provider="google">Gmail</SocialButton>
      </div>

      <div className="mt-5 text-center text-xs space-y-1">
        <p className="text-gray-300 text-xs">Ainda não tem conta?</p>
        <a href="#register" className="inline-flex items-center justify-center gap-1.5 text-[#59F588] font-bold text-xs hover:underline mt-1">
          <span>Crie seu cadastro!</span>
          <span role="img" aria-label="clipboard">📋</span>
        </a>
      </div>
    </div>
  );
}

