import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './App.css';

type Page = 'login' | 'register';

function App() {
  const [page, setPage] = useState<Page>('login');

  return page === 'register' ? (
    <RegisterPage onNavigateToLogin={() => setPage('login')} />
  ) : (
    <LoginPage onNavigateToRegister={() => setPage('register')} />
  );
}

export default App;
