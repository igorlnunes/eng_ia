import { AuthBanner } from '../components/organisms/AuthBanner';
import { LoginForm } from '../components/organisms/LoginForm';
import { AuthLayout } from '../components/templates/AuthLayout';

interface LoginPageProps {
  onNavigateToRegister?: () => void;
  onSuccess?: (token: string) => void;
}

export function LoginPage({
  onNavigateToRegister,
  onSuccess,
}: LoginPageProps) {
  return (
    <AuthLayout banner={<AuthBanner />}>
      <LoginForm
        onNavigateToRegister={onNavigateToRegister}
        onSuccess={onSuccess}
      />
    </AuthLayout>
  );
}
