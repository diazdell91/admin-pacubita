import { PublicRoute } from '@/components/auth/AuthGuard';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}