import { AuthBanner } from '../components/organisms/AuthBanner';
import { RegisterForm } from '../components/organisms/RegisterForm';
import { AuthLayout } from '../components/templates/AuthLayout';

interface RegisterPageProps {
  onNavigateToLogin?: () => void;
}

export function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  return (
    <AuthLayout
      banner={
        <AuthBanner
          src="/cadastro-banner.png"
          alt="Code Connect Cadastro Banner"
        />
      }
    >
      <RegisterForm onNavigateToLogin={onNavigateToLogin} />
    </AuthLayout>
  );
}
