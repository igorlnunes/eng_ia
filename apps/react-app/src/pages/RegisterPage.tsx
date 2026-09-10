import { AuthBanner } from '../components/organisms/AuthBanner';
import { RegisterForm } from '../components/organisms/RegisterForm';
import { AuthLayout } from '../components/templates/AuthLayout';

interface RegisterPageProps {
  onNavigateToLogin?: () => void;
  onSuccess?: () => void;
}

export function RegisterPage({
  onNavigateToLogin,
  onSuccess,
}: RegisterPageProps) {
  return (
    <AuthLayout
      banner={
        <AuthBanner
          src="/cadastro-banner.webp"
          alt="Code Connect Cadastro Banner"
        />
      }
    >
      <RegisterForm
        onNavigateToLogin={onNavigateToLogin}
        onSuccess={onSuccess}
      />
    </AuthLayout>
  );
}
