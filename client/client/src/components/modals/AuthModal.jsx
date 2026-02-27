import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../store/authSlice';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  // Redux store-дан күйлерді аламыз
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Сәтті кірген жағдайда модальды жабу және форманы тазалау
  useEffect(() => {
    if (user) {
      onClose();
      // Форманы тазалау
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
      });
      setErrors({});
    }
  }, [user, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Требуется email';
    if (!formData.password) newErrors.password = 'Требуется пароль';

    if (!isLogin) {
      if (!formData.name) newErrors.name = 'ФИО';
      if (!formData.phone) newErrors.phone = 'Необходим номер телефона.';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // Логин үшін тек email мен password жібереміз
        dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        );
      } else {
        // Тіркелу үшін барлық мәліметті жібереміз
        dispatch(
          registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }),
        );
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    // Очистить пароли при переключении режимов
    setFormData({
      ...formData,
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Backend-тен келген қате болса шығарамыз */}
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="name">ФИО</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите свое имя"
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Номер телефона</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="+7 707 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone}</div>
                  )}
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Пороль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </form>

          <div className="auth-toggle">
            <p
              style={{
                color: '#666',
                marginBottom: '0.75rem',
                fontSize: '0.9rem',
              }}
            >
              {isLogin ? 'У вас нет аккаунта?' : 'У вас есть аккаунт?'}
            </p>
            <button onClick={toggleAuthMode} className="link-button">
              {isLogin ? 'Регистрация' : 'Войти'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 90%;
          max-width: 450px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #3498db;
          border-radius: 20px 20px 0 0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.75rem;
          color: white;
          font-weight: 700;
        }

        .close-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 1.75rem;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          line-height: 1;
        }

        .close-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 2rem;
        }

        .alert {
          padding: 1rem 1.25rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .alert-error {
          background: linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%);
          border-left: 4px solid #f44336;
          color: #d32f2f;
          justify-content: center;
          text-align: center;
        }

        .alert span {
          font-weight: 500;
        }

        .auth-form {
          animation: fadeInForm 0.4s ease;
        }

        @keyframes fadeInForm {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #3498db;
          background: white;
          box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.1);
        }

        .form-group input::placeholder {
          color: #999;
        }

        .error-message {
          color: #f44336;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          animation: shake 0.3s ease;
        }

        .error-message:before {
          content: '⚠';
          font-size: 1rem;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .btn {
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: none;
        }

        .btn-primary {
          background: #3498db;
          color: white;
          width: 100%;
          margin-top: 1rem;
          font-size: 1.05rem;
          padding: 1rem;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        }

        .btn-primary:hover:not(:disabled) {
          background: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .link-button {
          background: rgba(52, 152, 219, 0.1);
          border: 2px solid #3498db;
          color: #3498db;
          cursor: pointer;
          font-size: 0.95rem;
          padding: 0.75rem 1.5rem;
          transition: all 0.3s ease;
          font-weight: 600;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .link-button:hover {
          background: #3498db;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        .link-button:active {
          transform: translateY(0);
        }

        .auth-toggle {
          margin-top: 1.5rem;
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid #f0f0f0;
        }

        /* Scrollbar styling */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: #3498db;
          border-radius: 10px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #2980b9;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            margin: 1rem;
          }

          .modal-header {
            padding: 1.25rem 1.5rem;
          }

          .modal-header h2 {
            font-size: 1.5rem;
          }

          .modal-body {
            padding: 1.5rem;
          }

          .form-group input {
            padding: 0.75rem;
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
          }

          .modal-header {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default AuthModal;
