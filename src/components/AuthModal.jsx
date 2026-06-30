import React, { useContext, useState } from 'react';
import { X, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { AppContext } from '../App';
import './AuthModal.css';

const AuthModal = () => {
  const { authModal, setAuthModal, login, register } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(authModal === 'login');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const set = (field) => (e) => { setForm(p => ({ ...p, [field]: e.target.value })); setError(''); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = login(form.email, form.password);
      if (!result.success) setError(result.error);
    } else {
      if (!form.name.trim()) return setError('Name is required');
      const result = register(form.name, form.email, form.password);
      if (!result.success) setError(result.error);
    }
  };

  return (
    <div className="auth-overlay" onClick={() => setAuthModal(null)}>
      <div className="auth-modal glass" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={() => setAuthModal(null)}><X size={20} /></button>

        <div className="auth-header">
          <div className="auth-logo">Watch<span>Shop</span></div>
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue shopping' : 'Join WatchShop today'}</p>
        </div>

        <div className="auth-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => { setIsLogin(true); setError(''); }}>
            <LogIn size={15} /> Sign In
          </button>
          <button className={!isLogin ? 'active' : ''} onClick={() => { setIsLogin(false); setError(''); }}>
            <UserPlus size={15} /> Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} required />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <div className="pass-wrap">
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={set('password')} required minLength={6} />
              <button type="button" className="eye-btn" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {isLogin && (
          <div className="auth-hint">
            <p>👑 <strong>Super Admin:</strong> super@gmail.com / super123</p>
            <p>🔧 <strong>Admin:</strong> admin@gmail.com / admin123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
