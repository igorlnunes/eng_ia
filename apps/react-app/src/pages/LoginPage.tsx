import { AuthBanner } from '../components/organisms/AuthBanner';
import { LoginForm } from '../components/organisms/LoginForm';
import { AuthLayout } from '../components/templates/AuthLayout';

interface LoginPageProps {
  onNavigateToRegister?: () => void;
}

export function LoginPage({ onNavigateToRegister }: LoginPageProps) {
  return (
    <AuthLayout banner={<AuthBanner />}>
      <LoginForm onNavigateToRegister={onNavigateToRegister} />
    </AuthLayout>
  );
}
