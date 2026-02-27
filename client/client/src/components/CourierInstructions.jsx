import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourierOrder } from '../store/courierSlice';
import { fetchInstitutions } from '../store/institutionsSlice';

function CourierInstructions({ onClose }) {
  const dispatch = useDispatch();
  const { list: institutions, loading: instLoading } = useSelector(
    (state) => state.institutions || { list: [] },
  );
  const { loading, error } = useSelector((state) => state.auth || {});
  const { success: courierSuccess } = useSelector(
    (state) => state.courier || {},
  );
  const [formData, setFormData] = useState({
    fullName: '', // Backend-ке сай 'name' -> 'fullName'
    phoneNumber: '', // Backend-ке сай 'phone' -> 'phoneNumber'
    address: '',
    institution: '', // Default value
    deliveryTo: '', // Backend-ке сай 'nameOfRecipient' -> 'deliveryTo'
    description: '', // Backend-ке сай 'notes' -> 'description'
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchInstitutions());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Redux арқылы серверге жіберу
    const result = await dispatch(createCourierOrder(formData));

    if (createCourierOrder.fulfilled.match(result)) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'var(--transition)',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 7px 15px rgba(108, 99, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: '0.5rem' }}
            ></i>
            Қайта оралу
          </button>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              marginBottom: '2rem',
              color: 'var(--dark)',
            }}
          >
            Доставка посылок курьерской службой.
          </h1>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--primary)',
              }}
            >
              <i className="fas fa-truck" style={{ marginRight: '0.5rem' }}></i>
              Что такое курьерская служба?
            </h2>
            <p
              style={{
                color: 'var(--gray)',
                lineHeight: '1.8',
                marginBottom: '1rem',
              }}
            >
              Курьерская служба — это быстрый и безопасный способ доставки
              товаров. Мы доставляем вашу посылку быстро и надежно, что помогает
              вам легко доставить товар в выбранное вами место.
            </p>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: 'var(--primary)',
              }}
            >
              <i
                className="fas fa-list-check"
                style={{ marginRight: '0.5rem' }}
              ></i>
              Права и обязанности
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--dark)',
                }}
              >
                <i
                  className="fas fa-check"
                  style={{
                    marginRight: '0.5rem',
                    color: 'var(--success)',
                  }}
                ></i>
                Права курьера:
              </h3>
              <ul
                style={{
                  marginLeft: '2rem',
                  color: 'var(--gray)',
                  lineHeight: '1.8',
                }}
              >
                <li>Безопасная доставка всех товаров</li>
                <li>Надежно хранить ваши посылки</li>
                <li>Круглосуточная поддержка</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--dark)',
                }}
              >
                <i
                  className="fas fa-user"
                  style={{
                    marginRight: '0.5rem',
                    color: 'var(--primary)',
                  }}
                ></i>
                Ваши обязанности:
              </h3>
              <ul
                style={{
                  marginLeft: '2rem',
                  color: 'var(--gray)',
                  lineHeight: '1.8',
                }}
              >
                <li>Выбрать учреждение</li>
                <li>Будьте готовы отправить посылку в нужное время</li>
                <li>Сообщайте о проблемах по мере их возникновения</li>
              </ul>
            </div>
          </div>

          {/* Courier Order Form */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: 'var(--primary)',
              }}
            >
              <i className="fas fa-edit" style={{ marginRight: '0.5rem' }}></i>
              Заполните курьерскую заявку
            </h2>

            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'rgba(46, 204, 113, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--success)',
                }}
              >
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    display: 'block',
                  }}
                ></i>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                  Заказ успешно отправлен!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Аты-жөні */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>ФИО *</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="fullName" // name -> fullName
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ваше полное фио"
                    required
                  />
                </div>

                {/* Телефон */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Номер телефона *</label>
                  <input
                    style={inputStyle}
                    type="tel"
                    name="phoneNumber" // phone -> phoneNumber
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>

                {/* Мекен-жайы */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Ваш адрес *</label>
                  <textarea
                    style={inputStyle}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Откуда (Адрес)"
                    rows="3"
                    required
                  />
                </div>

                {/* Мекеме */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Выберите учреждение *</label>
                  <select
                    style={inputStyle}
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    disabled={instLoading} // Жүктеліп жатқанда жауып тастаймыз
                  >
                    <option value="">
                      {instLoading ? 'Загрузка...' : 'Выберите учреждение'}
                    </option>

                    {/* Массив екенін тексеріп барып map іске қосамыз */}
                    {Array.isArray(institutions) &&
                      institutions.map((inst) => (
                        <option key={inst.id || inst._id} value={inst.name}>
                          {inst.name}
                        </option>
                      ))}
                  </select>

                  {/* Егер тізім бос болса ескерту */}
                  {!instLoading && institutions.length === 0 && (
                    <p
                      style={{
                        color: 'orange',
                        fontSize: '0.8rem',
                        marginTop: '5px',
                      }}
                    >
                      Список учреждений не найден.
                    </p>
                  )}
                </div>

                {/* Кімге */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Кому доставить *</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="deliveryTo" // nameOfRecipient -> deliveryTo
                    value={formData.deliveryTo}
                    onChange={handleChange}
                    placeholder="Напишите имя получателя"
                    required
                  />
                </div>

                {/* Ескертпелер */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Дополнительные примечания</label>
                  <textarea
                    style={inputStyle}
                    name="description" // notes -> description
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Особый запрос"
                    rows="3"
                  />
                </div>

                {/* Қате шықса көрсету */}
                {error && (
                  <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? '#ccc' : 'var(--gradient)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                  }}
                >
                  <i
                    className="fas fa-check"
                    style={{ marginRight: '0.5rem' }}
                  ></i>
                  {loading ? 'Загрузка...' : 'Отправить курьерский заказ'}
                </button>
              </form>
            )}
          </div>

          <div
            style={{
              background: 'rgba(108, 99, 255, 0.1)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              borderLeft: '4px solid var(--primary)',
            }}
          >
            <h3
              style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: 'var(--dark)',
              }}
            >
              <i
                className="fas fa-info-circle"
                style={{ marginRight: '0.5rem', color: 'var(--primary)' }}
              ></i>
              Важные примечания
            </h3>
            <ul
              style={{
                marginLeft: '2rem',
                color: 'var(--dark)',
                lineHeight: '1.8',
              }}
            >
              <li>
                Для использования курьерской службы необходимо быть старше 18
                лет
              </li>
              <li>Товары не должны содержать никаких запрещенных веществ</li>
              <li>
                Если у вас возникнут вопросы, пожалуйста, свяжитесь со службой
                поддержки!
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                color: 'var(--primary)',
                border: '2px solid var(--primary)',
                padding: '1rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontSize: '1.1rem',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--primary)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--primary)';
              }}
            >
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: '0.5rem' }}
              ></i>
              Вернуться на главную страницу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '600',
  color: 'var(--dark)',
};
const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  fontSize: '1rem',
  boxSizing: 'border-box',
};

export default CourierInstructions;
