import { AuthBanner } from '../components/organisms/AuthBanner';
import { LoginForm } from '../components/organisms/LoginForm';
import { AuthLayout } from '../components/templates/AuthLayout';

export function LoginPage() {
  return (
    <AuthLayout banner={<AuthBanner />}>
      <LoginForm />
    </AuthLayout>
  );
}
