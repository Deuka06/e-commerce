import React, { useState } from "react";
import { formatPrice } from "../utils/helpers";
import { createOrder, resetOrderState } from "../store/ordersSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstitutions } from "../store/institutionsSlice"; // жолын тексер

function Payment({ cartItems, onClose, onPaymentSuccess, showNavBar = true }) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    customerName: "", // Аты-жөні
    phone: "", // Телефон
    institutionId: "", // Мекеме ID-і (Select-тен келеді)
    nameOfRecipient: "", // Кімге жеткізу керек
  });
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    loading: orderLoading,
    success: orderSuccess,
    error: orderError,
  } = useSelector((state) => state.orders);
  const { list: institutions, loading: instLoading } = useSelector(
    (state) => state.institutions,
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  useEffect(() => {
    if (orderSuccess) {
      setSuccess(true); // Компоненттің ішкі success күйі
      setTimeout(() => {
        dispatch(resetOrderState()); // State-ті тазалау
        if (onPaymentSuccess) onPaymentSuccess();
        if (onClose) onClose();
        else window.location.href = "/";
      }, 2000);
    }
  }, [orderSuccess, dispatch]);

  useEffect(() => {
    dispatch(fetchInstitutions());
  }, [dispatch]);

  useEffect(() => {
    if (institutions.length > 0 && !formData.institution) {
      setFormData((prev) => ({ ...prev, institution: institutions[0].name }));
    }
  }, [institutions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => {
    if (onClose && typeof onClose === "function") {
      onClose();
    } else {
      window.history.back();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Серверге кететін объектіні дайындау (image_2d1abe.png бойынша)
    const orderPayload = {
      customerName: formData.customerName,
      phoneNumber: formData.phone,
      institutionsId: Number(formData.institutionId), // Сан түрінде жіберу
      deliveryTo: formData.nameOfRecipient,
      totalAmount: total,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    };

    dispatch(createOrder(orderPayload));
  };

  if (success) {
    return (
      <div
        style={{
          background: "var(--light)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          paddingTop: showNavBar ? "100px" : "2rem",
          paddingBottom: showNavBar ? "80px" : "2rem",
        }}>
        <div
          style={{
            textAlign: "center",
            background: "white",
            padding: "3rem 2rem",
            borderRadius: "12px",
            boxShadow: "var(--card-shadow)",
            maxWidth: "500px",
            width: "100%",
          }}>
          <i
            className="fas fa-check-circle"
            style={{
              fontSize: "4rem",
              color: "var(--success)",
              marginBottom: "1rem",
              display: "block",
            }}></i>
          <h2 style={{ color: "var(--dark)", marginBottom: "1rem" }}>
            Заказ принят!
          </h2>
          <p
            style={{
              color: "var(--gray)",
              marginBottom: "1rem",
              lineHeight: "1.6",
              fontSize: "0.95rem",
            }}>
            Мы проверяем оплату.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--gray)" }}>
            Вы будете перенаправлены на главную страницу...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "var(--light)",
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "100px",
      }}>
      <div className="container" style={{ paddingTop: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={handleGoBack}
            style={{
              background: "var(--primary)",
              color: "white",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "var(--transition)",
              fontSize: "1rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 7px 15px rgba(108, 99, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}>
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: "0.5rem" }}></i>
            Назад
          </button>
        </div>

        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "1.5rem",
              color: "var(--dark)",
            }}>
            Оплата
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
            className="payment-grid">
            {/* LEFT COLUMN - Order Summary and Kaspi Instructions */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Order Summary */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  boxShadow: "var(--card-shadow)",
                  height: "fit-content",
                }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "var(--primary)",
                  }}>
                  <i
                    className="fas fa-shopping-cart"
                    style={{ marginRight: "0.5rem" }}></i>
                  Сведение о заказе
                </h2>

                <div
                  style={{
                    marginBottom: "1.5rem",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}>
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.8rem 0",
                        borderBottom: "1px solid #e0e0e0",
                        fontSize: "0.95rem",
                      }}>
                      <span
                        style={{
                          color: "var(--dark)",
                          wordBreak: "break-word",
                        }}>
                        {item.name} {item.quantity > 1 && `x${item.quantity}`}
                      </span>
                      <span
                        style={{
                          fontWeight: "600",
                          color: "var(--primary)",
                          whiteSpace: "nowrap",
                          marginLeft: "0.5rem",
                        }}>
                        {formatPrice(item.price * (item.quantity || 1))} ₸
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: "1rem 0",
                    borderTop: "2px solid var(--primary)",
                    borderBottom: "2px solid var(--primary)",
                    marginBottom: "1rem",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                    }}>
                    <span>Итого:</span>
                    <span style={{ color: "var(--primary)" }}>
                      {formatPrice(total)} ₸
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(108, 99, 255, 0.1)",
                    padding: "1rem",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    color: "var(--gray)",
                    lineHeight: "1.5",
                  }}>
                  <i
                    className="fas fa-shield-alt"
                    style={{
                      color: "var(--primary)",
                      marginRight: "0.5rem",
                    }}></i>
                  Ваши платежные данные хранятся в безопасности.
                </div>
              </div>

              {/* Kaspi Payment Instructions */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  boxShadow: "var(--card-shadow)",
                  height: "fit-content",
                }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "var(--primary)",
                  }}>
                  <i
                    className="fas fa-info-circle"
                    style={{ marginRight: "0.5rem" }}></i>
                  Инструкции по оплате
                </h2>

                <div
                  style={{
                    background: "rgba(108, 99, 255, 0.05)",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    borderLeft: "4px solid var(--primary)",
                  }}>
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: "1.2rem",
                      color: "var(--dark)",
                      lineHeight: "1.8",
                      fontSize: "0.95rem",
                    }}>
                    <li style={{ marginBottom: "0.8rem" }}>
                      <strong>Сначала</strong> оплатите полную сумму через Kaspi
                    </li>
                    <li style={{ marginBottom: "0.8rem" }}>
                      После оплаты <strong>заполните форму</strong>
                    </li>
                    <li style={{ marginBottom: "0.8rem" }}>
                      Допустимый вес одной посылки — <strong>20 кг</strong>.
                      Доплата за каждую последующую посылку —{" "}
                      <strong>2000₸</strong>
                    </li>
                    <li style={{ marginBottom: "0.8rem" }}>
                      После заполнения формы ваш платеж будет отправлен на{" "}
                      <strong>проверку</strong>
                    </li>
                    <li>
                      <strong>Ожидайте</strong> — мы проверяем ваш заказ
                    </li>
                  </ol>
                </div>

                <button
                  onClick={() =>
                    window.open("https://pay.kaspi.kz/pay/wrwp3m82", "_blank")
                  }
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #f14635 0%, #d42727 100%)",
                    color: "white",
                    border: "none",
                    padding: "1rem 1.5rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 7px 15px rgba(241, 70, 53, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}>
                  <i
                    className="fas fa-wallet"
                    style={{ marginRight: "0.5rem", fontSize: "1.2rem" }}></i>
                  Перейти на Kaspi
                </button>

                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.8rem",
                    background: "rgba(52, 199, 89, 0.1)",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    color: "var(--gray)",
                    textAlign: "center",
                  }}>
                  <i
                    className="fas fa-lock"
                    style={{
                      color: "#34c759",
                      marginRight: "0.4rem",
                    }}></i>
                  Безопасная оплата через Kaspi
                </div>
              </div>
            </div>

            {/* Payment Form - RIGHT on laptop, BOTTOM on mobile */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "var(--card-shadow)",
              }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "1.5rem",
                  color: "var(--primary)",
                }}>
                <i
                  className="fas fa-credit-card"
                  style={{ marginRight: "0.5rem" }}></i>
                Контактные данные
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Payment Method Selection */}

                {paymentMethod === "card" && (
                  <>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                          color: "var(--dark)",
                        }}>
                        Ваше ФИО
                      </label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Ержан"
                        required
                        maxLength="19"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          transition: "var(--transition)",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary)";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(108, 99, 255, 0.2)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e0e0e0";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </>
                )}

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="institution"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Выберите учреждение *{" "}
                    {instLoading && <i className="fas fa-spinner fa-spin"></i>}
                  </label>
                  <select
                    id="institution"
                    name="institutionId"
                    value={formData.institutionId}
                    onChange={handleChange}
                    required
                    disabled={instLoading}
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                      cursor: instLoading ? "not-allowed" : "pointer",
                    }}>
                    <option value="">Выберите...</option>
                    {institutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="nameOfRecipient"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Кому доставить *
                  </label>
                  <input
                    type="text"
                    id="nameOfRecipient"
                    name="nameOfRecipient"
                    value={formData.nameOfRecipient}
                    onChange={handleChange}
                    placeholder="Напишите имя получателя"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    width: "100%",
                    background: processing ? "var(--gray)" : "var(--gradient)",
                    color: "white",
                    border: "none",
                    padding: "1rem",
                    borderRadius: "8px",
                    cursor: processing ? "not-allowed" : "pointer",
                    transition: "var(--transition)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    opacity: processing ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!processing) {
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow =
                        "0 7px 15px rgba(108, 99, 255, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!processing) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }
                  }}>
                  {processing ? (
                    <>
                      <i
                        className="fas fa-spinner fa-spin"
                        style={{ marginRight: "0.5rem" }}></i>
                      Обработка...
                    </>
                  ) : (
                    <>
                      <i
                        className="fas fa-check"
                        style={{ marginRight: "0.5rem" }}></i>
                      Завершить оплату
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
