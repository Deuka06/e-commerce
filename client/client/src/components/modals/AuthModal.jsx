import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/authSlice";

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  // Redux store-дан күйлерді аламыз
  const { isLoading, error, user } = useSelector((state) => state.auth);

  // Сәтті кірген жағдайда модальды жабу
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
      if (!formData.phone) newErrors.phone = "Телефон нөмірі қажет";
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
  };

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isLogin ? "Кіру" : "Тіркелу"}</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Backend-тен келген қате болса шығарамыз */}
          {error && (
            <div
              className="error-message"
              style={{
                marginBottom: "1rem",
                padding: "10px",
                background: "#ffebee",
                borderRadius: "4px",
                textAlign: "center",
              }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
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
                <div className="form-group">
                  <label htmlFor="phone">Телефон нөмірі</label>
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
    </div>
  );
}

export default AuthModal;
