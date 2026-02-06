import React, { useState } from 'react';
import { formatPrice } from '../utils/helpers';

function Payment({ cartItems, onClose, onPaymentSuccess, showNavBar = true }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
    institution: '',
    nameOfRecipient: '',
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    } else {
      window.history.back();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        if (onPaymentSuccess && typeof onPaymentSuccess === 'function') {
          onPaymentSuccess();
        }
        if (onClose && typeof onClose === 'function') {
          onClose();
        } else {
          window.location.href = '/';
        }
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div
        style={{
          background: 'var(--light)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          paddingTop: showNavBar ? '100px' : '2rem',
          paddingBottom: showNavBar ? '80px' : '2rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            background: 'white',
            padding: '3rem 2rem',
            borderRadius: '12px',
            boxShadow: 'var(--card-shadow)',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <i
            className="fas fa-check-circle"
            style={{
              fontSize: '4rem',
              color: 'var(--success)',
              marginBottom: '1rem',
              display: 'block',
            }}
          ></i>
          <h2 style={{ color: 'var(--dark)', marginBottom: '1rem' }}>
            Төлем сәтті өтті!
          </h2>
          <p
            style={{
              color: 'var(--gray)',
              marginBottom: '1rem',
              lineHeight: '1.6',
              fontSize: '0.95rem',
            }}
          >
            Сіздің тапсырысы қабылданды. Жеткізу деталстарын электронды
            поштаңызға жібереміз.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
            Сіз басты бетке қайтарылысыз...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--light)',
        minHeight: '100vh',
        paddingTop: '20px',
        paddingBottom: '100px',
      }}
    >
      <div className="container" style={{ paddingTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={handleGoBack}
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

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              color: 'var(--dark)',
            }}
          >
            Төлем
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
            }}
            className="payment-grid"
          >
            {/* LEFT COLUMN - Order Summary and Kaspi Instructions */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* Order Summary */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: 'var(--card-shadow)',
                  height: 'fit-content',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--primary)',
                  }}
                >
                  <i
                    className="fas fa-shopping-cart"
                    style={{ marginRight: '0.5rem' }}
                  ></i>
                  Тапсырыстың ұйғарымы
                </h2>

                <div
                  style={{
                    marginBottom: '1.5rem',
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }}
                >
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.8rem 0',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--dark)',
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.name} {item.quantity > 1 && `x${item.quantity}`}
                      </span>
                      <span
                        style={{
                          fontWeight: '600',
                          color: 'var(--primary)',
                          whiteSpace: 'nowrap',
                          marginLeft: '0.5rem',
                        }}
                      >
                        {formatPrice(item.price * (item.quantity || 1))} ₸
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: '1rem 0',
                    borderTop: '2px solid var(--primary)',
                    borderBottom: '2px solid var(--primary)',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                    }}
                  >
                    <span>Барлығы:</span>
                    <span style={{ color: 'var(--primary)' }}>
                      {formatPrice(total)} ₸
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(108, 99, 255, 0.1)',
                    padding: '1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--gray)',
                    lineHeight: '1.5',
                  }}
                >
                  <i
                    className="fas fa-shield-alt"
                    style={{
                      color: 'var(--primary)',
                      marginRight: '0.5rem',
                    }}
                  ></i>
                  Сіздің төлем ақпараты қауіпсіз болып сақталған.
                </div>
              </div>

              {/* Kaspi Payment Instructions */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: 'var(--card-shadow)',
                  height: 'fit-content',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--primary)',
                  }}
                >
                  <i
                    className="fas fa-info-circle"
                    style={{ marginRight: '0.5rem' }}
                  ></i>
                  Төлем нұсқауы
                </h2>

                <div
                  style={{
                    background: 'rgba(108, 99, 255, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    borderLeft: '4px solid var(--primary)',
                  }}
                >
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      color: 'var(--dark)',
                      lineHeight: '1.8',
                      fontSize: '0.95rem',
                    }}
                  >
                    <li style={{ marginBottom: '0.8rem' }}>
                      <strong>Бірінші</strong> толық сумманы Kaspi арқылы
                      төлеңіз
                    </li>
                    <li style={{ marginBottom: '0.8rem' }}>
                      Төлем жасап болғаннан кейін,{' '}
                      <strong>форманы толтырыңыз</strong>
                    </li>
                    <li style={{ marginBottom: '0.8rem' }}>
                      Форманы толтырғаннан кейін төлеміңіз{' '}
                      <strong>тексеріске</strong> болады
                    </li>
                    <li>
                      <strong>Күтіңіз</strong> - біз тапсырысыңызды тексереміз
                    </li>
                  </ol>
                </div>

                <button
                  onClick={() =>
                    window.open('https://pay.kaspi.kz/pay/wrwp3m82', '_blank')
                  }
                  style={{
                    width: '100%',
                    background:
                      'linear-gradient(135deg, #f14635 0%, #d42727 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow =
                      '0 7px 15px rgba(241, 70, 53, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <i
                    className="fas fa-wallet"
                    style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}
                  ></i>
                  Kaspi-ге өту
                </button>

                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.8rem',
                    background: 'rgba(52, 199, 89, 0.1)',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--gray)',
                    textAlign: 'center',
                  }}
                >
                  <i
                    className="fas fa-lock"
                    style={{
                      color: '#34c759',
                      marginRight: '0.4rem',
                    }}
                  ></i>
                  Қауіпсіз төлем Kaspi арқылы
                </div>
              </div>
            </div>

            {/* Payment Form - RIGHT on laptop, BOTTOM on mobile */}
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
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
                <i
                  className="fas fa-credit-card"
                  style={{ marginRight: '0.5rem' }}
                ></i>
                Төлем деталстары
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Payment Method Selection */}

                {paymentMethod === 'card' && (
                  <>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: '600',
                          color: 'var(--dark)',
                        }}
                      >
                        Карта нөмірі *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength="19"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          transition: 'var(--transition)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary)';
                          e.target.style.boxShadow =
                            '0 0 0 3px rgba(108, 99, 255, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e0e0e0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label
                        style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontWeight: '600',
                          color: 'var(--dark)',
                        }}
                      >
                        Карта иесінің аты *
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        placeholder="Аты Фамилиасы"
                        required
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          transition: 'var(--transition)',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary)';
                          e.target.style.boxShadow =
                            '0 0 0 3px rgba(108, 99, 255, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e0e0e0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: 'var(--dark)',
                          }}
                        >
                          Аяқталу датасы *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow =
                              '0 0 0 3px rgba(108, 99, 255, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '600',
                            color: 'var(--dark)',
                          }}
                        >
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          required
                          maxLength="3"
                          style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'var(--transition)',
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow =
                              '0 0 0 3px rgba(108, 99, 255, 0.2)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e0e0e0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: 'var(--dark)',
                    }}
                  >
                    Электронды пошта *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'var(--transition)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(108, 99, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="pickupTime"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: 'var(--dark)',
                    }}
                  >
                    Жеткізу мекемесін таңдаңыз *
                  </label>
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'var(--transition)',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(108, 99, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="Учреждение 12 (бывшее 99)">
                      Учреждение 12 (бывшее 99)
                    </option>
                    <option value="Учреждение 14 (бывшее 103)">
                      Учреждение 14 (бывшее 103)
                    </option>
                    <option value="Учреждение 57 (бывшее 71)">
                      Учреждение 57 (бывшее 71)
                    </option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="nameOfRecipient"
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: 'var(--dark)',
                    }}
                  >
                    Кімге жеткізілуі керек *
                  </label>
                  <input
                    type="text"
                    id="nameOfRecipient"
                    name="nameOfRecipient"
                    value={formData.nameOfRecipient}
                    onChange={handleChange}
                    placeholder="Қабылдаушының атын жазыңыз"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'var(--transition)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(108, 99, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '600',
                      color: 'var(--dark)',
                    }}
                  >
                    Телефон нөмірі *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'var(--transition)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--primary)';
                      e.target.style.boxShadow =
                        '0 0 0 3px rgba(108, 99, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e0e0e0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    width: '100%',
                    background: processing ? 'var(--gray)' : 'var(--gradient)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    opacity: processing ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!processing) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow =
                        '0 7px 15px rgba(108, 99, 255, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!processing) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {processing ? (
                    <>
                      <i
                        className="fas fa-spinner fa-spin"
                        style={{ marginRight: '0.5rem' }}
                      ></i>
                      Өңдеу...
                    </>
                  ) : (
                    <>
                      <i
                        className="fas fa-check"
                        style={{ marginRight: '0.5rem' }}
                      ></i>
                      Төлемді аяқтау
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .payment-grid {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 1024px) {
          .payment-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem !important;
          }

          h2 {
            font-size: 1.2rem !important;
          }

          div[style*="padding: 2rem"] {
            padding: 1.5rem !important;
          }

          input,
          select,
          textarea {
            font-size: 16px !important;
          }

          label {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="gap: 2rem"] {
            gap: 1rem !important;
          }

          div[style*="padding: 1.5rem"] {
            padding: 1rem !important;
          }

          h1 {
            font-size: 1.25rem !important;
          }

          h2 {
            font-size: 1rem !important;
          }

          button:not(.bottom-nav-item) {
            padding: 0.8rem 1rem !important;
            font-size: 0.95rem !important;
          }

          input,
          select {
            padding: 0.7rem 0.75rem !important;
            font-size: 16px !important;
          }

          div[style*="display: grid"] div[style*="gap: 1rem"] {
            grid-template-columns: 1fr !important;
          }

          span:not(.bottom-nav-item span):not(.cart-badge) {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Payment;
