import { useState } from 'react';
import './auth-page.css'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (activeTab === 'login') {
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      console.log('Register:', formData);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="tab-header">
          <button
            onClick={() => switchTab('login')}
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => switchTab('register')}
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          >
            Register
          </button>
        </div>

        <div className="auth-content">
          <div className="auth-header">
            <h2 className="auth-title">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="auth-subtitle">
              {activeTab === 'login'
                ? 'Please sign in to your account'
                : 'Please fill in your information'}
            </p>
          </div>

          <div>
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input password-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="show-password-btn"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="submit-btn"
            >
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>

        <div className="bottom-text">
          {activeTab === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => switchTab('register')}
                className="link-button"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => switchTab('login')}
                className="link-button"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}