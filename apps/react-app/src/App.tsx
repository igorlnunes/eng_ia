import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router';
import { AuthProvider, useAuth } from './contexts';
import { FeedPage } from './pages/FeedPage';
import { LoginPage } from './pages/LoginPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

function LoginRoute() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  return (
    <LoginPage
      onNavigateToRegister={() => navigate('/register')}
      onSuccess={async () => {
        await refreshUser();
        navigate('/');
      }}
    />
  );
}

function RegisterRoute() {
  const navigate = useNavigate();

  return (
    <RegisterPage
      onNavigateToLogin={() => navigate('/login')}
      onSuccess={() => navigate('/login')}
    />
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/register" element={<RegisterRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
