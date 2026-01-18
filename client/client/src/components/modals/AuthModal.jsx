import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hook-тары
import { loginUser, registerUser } from "../../store/authSlice"; // Register thunk-ын да қосыңыз

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  // Store-дан керек мәліметтерді аламыз
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Егер логин сәтті өтсе (user пайда болса), модальды жабамыз
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email қажет";
    if (!formData.password) newErrors.password = "Құпия сөз қажет";

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Аты-жөніңіз қажет";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Құпия сөздер сәйкес келмейді";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        // ЛОГИН: /auth/login
        dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        );
      } else {
        // ТІРКЕЛУ: /auth/register
        // Backend-ке жіберілетін объект Swagger-ге сай болуы керек
        dispatch(
          registerUser({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        );
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            {isLogin ? "Кіру" : "Тіркелу"} {isLoading && "..."}
          </h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Backend-тен келген қате болса шығарамыз */}
          {error && (
            <div className="error-message" style={{ marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Аты-жөніңіз</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Құпия сөз</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Құпия сөзді растау</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="error-message">{errors.confirmPassword}</div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
              disabled={isLoading}>
              {isLoading ? "Жүктелуде..." : isLogin ? "Кіру" : "Тіркелу"}
            </button>
          </form>

          <div
            className="auth-toggle"
            style={{ marginTop: "1rem", textAlign: "center" }}>
            <button onClick={toggleAuthMode} className="link-button">
              {isLogin
                ? "Тіркелмегенсіз бе? Тіркелу"
                : "Аккаунтыңыз бар ма? Кіру"}
            </button>
          </div>
        </div>
      </div>
      <style>{`

        .form-group {

          margin-bottom: 1rem;

        }

       

        .form-group label {

          display: block;

          margin-bottom: 0.5rem;

          font-weight: 500;

        }

       

        .form-group input {

          width: 100%;

          padding: 0.75rem;

          border: 1px solid #ddd;

          border-radius: 4px;

          font-size: 1rem;

        }

       

        .form-group input.error {

          border-color: var(--danger);

        }

       

        .error-message {

          color: var(--danger);

          font-size: 0.85rem;

          margin-top: 0.25rem;

        }

       

        .link-button {

          background: none;

          border: none;

          color: var(--primary);

          text-decoration: underline;

          cursor: pointer;

          font-size: 0.9rem;

        }

       

        .link-button:hover {

          color: var(--primary-dark);

        }

      `}</style>
    </div>
  );
}

export default AuthModal;
