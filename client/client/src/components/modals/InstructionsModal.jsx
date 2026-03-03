import React from "react";

function InstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      zIndex: 1000,
      animation: "fadeIn 0.3s ease",
    },
    container: {
      background: "white",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "700px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      animation: "slideUp 0.3s ease",
      "@media (max-width: 768px)": {
        maxHeight: "85vh",
        margin: 0,
      },
      "@media (max-width: 480px)": {
        maxHeight: "80vh",
      },
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.5rem 1.5rem 1rem",
      borderBottom: "1px solid #e0e0e0",
    },
    title: {
      margin: 0,
      fontSize: "1.4rem",
      color: "#333",
      "@media (max-width: 768px)": {
        fontSize: "1.2rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "1.1rem",
      },
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "2rem",
      cursor: "pointer",
      color: "#666",
      padding: 0,
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "color 0.2s",
      ":hover": {
        color: "#3498db",
      },
      "@media (max-width: 768px)": {
        fontSize: "1.75rem",
        width: "36px",
        height: "36px",
      },
    },
    body: {
      padding: "1.5rem",
      color: "#333",
      "@media (max-width: 768px)": {
        padding: "1.25rem",
      },
      "@media (max-width: 480px)": {
        padding: "1rem",
      },
    },
    instructionStep: {
      marginBottom: "1.5rem",
      "@media (max-width: 768px)": {
        marginBottom: "1.25rem",
      },
    },
    stepHeader: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "0.5rem",
      "@media (max-width: 768px)": {
        gap: "0.5rem",
      },
    },
    stepIcon: {
      color: "#3498db",
      fontSize: "1.2rem",
      minWidth: "24px",
      "@media (max-width: 768px)": {
        fontSize: "1.1rem",
      },
    },
    stepTitle: {
      margin: 0,
      fontSize: "1.1rem",
      color: "#3498db",
      "@media (max-width: 768px)": {
        fontSize: "1rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "0.95rem",
      },
    },
    stepText: {
      margin: "0 0 0 2.5rem",
      color: "#666",
      lineHeight: "1.6",
      fontSize: "0.95rem",
      "@media (max-width: 768px)": {
        marginLeft: "2rem",
        fontSize: "0.9rem",
      },
      "@media (max-width: 480px)": {
        marginLeft: "1.75rem",
      },
      "@media (max-width: 360px)": {
        marginLeft: "1.5rem",
        fontSize: "0.85rem",
      },
    },
    infoBox: {
      background: "rgba(108, 99, 255, 0.1)",
      padding: "1.25rem",
      borderRadius: "8px",
      borderLeft: "4px solid #3498db",
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      marginTop: "2rem",
      "@media (max-width: 768px)": {
        padding: "1rem",
        flexDirection: "column",
        gap: "0.5rem",
      },
      "@media (max-width: 480px)": {
        padding: "0.875rem",
      },
    },
    infoIcon: {
      color: "#3498db",
      fontSize: "1.2rem",
      flexShrink: 0,
      marginTop: "2px",
      "@media (max-width: 768px)": {
        marginTop: 0,
      },
    },
    infoContent: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      "@media (max-width: 480px)": {
        gap: "0.125rem",
      },
    },
    infoStrong: {
      color: "#333",
      fontSize: "0.95rem",
      "@media (max-width: 480px)": {
        fontSize: "0.85rem",
      },
    },
    infoText: {
      color: "#333",
      fontSize: "0.9rem",
      lineHeight: "1.5",
      "@media (max-width: 480px)": {
        fontSize: "0.85rem",
      },
    },
    emailLink: {
      color: "#6c63ff",
      textDecoration: "none",
      fontWeight: "500",
      ":hover": {
        textDecoration: "underline",
      },
    },
    footer: {
      padding: "1rem 1.5rem",
      borderTop: "1px solid #e0e0e0",
      textAlign: "right",
      "@media (max-width: 768px)": {
        padding: "1rem 1.25rem",
      },
    },
    primaryButton: {
      padding: "0.7rem 2rem",
      border: "none",
      borderRadius: "6px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.2s",
      background: "#3498db",
      color: "white",
      ":hover": {
        background: "#2980b9",
        transform: "translateY(-1px)",
      },
      "@media (max-width: 768px)": {
        padding: "0.6rem 1.75rem",
        width: "100%",
      },
    },
  };

  // Функция для применения медиа-запросов
  const applyMediaQueries = (baseStyle) => {
    const result = { ...baseStyle };
    Object.keys(baseStyle).forEach((key) => {
      if (key.startsWith("@media")) {
        const mediaQuery = key;
        const mediaStyles = baseStyle[key];
        delete result[mediaQuery];
        // В реальном проекте лучше использовать CSS или styled-components
        // Здесь просто игнорируем медиа-запросы для inline стилей
      }
    });
    return result;
  };

  return (
    <div style={applyMediaQueries(styles.overlay)}>
      <div style={applyMediaQueries(styles.container)}>
        <div style={applyMediaQueries(styles.header)}>
          <h3 style={applyMediaQueries(styles.title)}>
            Инструкция по использованию сервиса Qamkor
          </h3>
          <button
            style={applyMediaQueries(styles.closeButton)}
            onClick={onClose}>
            &times;
          </button>
        </div>

        <div style={applyMediaQueries(styles.body)}>
          <div style={applyMediaQueries(styles.instructionStep)}>
            <div style={applyMediaQueries(styles.stepHeader)}>
              <i
                className="fas fa-search"
                style={applyMediaQueries(styles.stepIcon)}></i>
              <h4 style={applyMediaQueries(styles.stepTitle)}>
                1. Регистрация и вход
              </h4>
            </div>
            <p style={applyMediaQueries(styles.stepText)}>
              Для того чтобы воспользоваться всеми функциями сервиса, пройдите
              быструю регистрацию или войдите в личный кабинет. Это позволит вам
              отслеживать ваши заказы и сохранять контактные данные для будущих
              отправок.
            </p>
          </div>

          <div style={applyMediaQueries(styles.instructionStep)}>
            <div style={applyMediaQueries(styles.stepHeader)}>
              <i
                className="fas fa-shopping-cart"
                style={applyMediaQueries(styles.stepIcon)}></i>
              <h4 style={applyMediaQueries(styles.stepTitle)}>
                2. Поиск и выбор товаров
              </h4>
            </div>
            <p style={applyMediaQueries(styles.stepText)}>
              Вы можете выбрать необходимые товары напрямую из нашего каталога.
              Добавляйте их в корзину, формируя ваш общий заказ. Если у вас уже
              есть готовая посылка, вы можете оформить её доставку через наших
              курьеров.
            </p>
          </div>

          <div style={applyMediaQueries(styles.instructionStep)}>
            <div style={applyMediaQueries(styles.stepHeader)}>
              <i
                className="fas fa-list"
                style={applyMediaQueries(styles.stepIcon)}></i>
              <h4 style={applyMediaQueries(styles.stepTitle)}>
                3. Оформление заказа и вызов курьера
              </h4>
            </div>
            <p style={applyMediaQueries(styles.stepText)}>
              Перейдите в корзину и нажмите «Оформить заказ». В разделе
              «Контактные данные» обязательно укажите: Ваше полное ФИО; Выберите
              учреждение (место доставки); Укажите данные получателя и
              контактный номер телефона.
            </p>
          </div>

          <div style={applyMediaQueries(styles.instructionStep)}>
            <div style={applyMediaQueries(styles.stepHeader)}>
              <i
                className="fas fa-credit-card"
                style={applyMediaQueries(styles.stepIcon)}></i>
              <h4 style={applyMediaQueries(styles.stepTitle)}>
                4. Оплата и подтверждение
              </h4>
            </div>
            <p style={applyMediaQueries(styles.stepText)}>
              Оплатите полную стоимость через Kaspi. После оплаты заполните
              форму подтверждения. Важно: допустимый вес одной посылки — 20 кг.
              За каждое дополнительное место взимается доплата в размере 2 000
              ₸.
            </p>
          </div>

          <div style={applyMediaQueries(styles.instructionStep)}>
            <div style={applyMediaQueries(styles.stepHeader)}>
              <i
                className="fas fa-truck"
                style={applyMediaQueries(styles.stepIcon)}></i>
              <h4 style={applyMediaQueries(styles.stepTitle)}>
                5. График и сроки доставки
              </h4>
            </div>
            <p style={applyMediaQueries(styles.stepText)}>
              Мы осуществляем доставку в учреждения по фиксированному графику:
              Дни доставки: Понедельник, Среда, Пятница. Срок: Ваш заказ будет
              доставлен в ближайший из этих трех дней после оформления.
              Контроль: Вы можете отслеживать статус своих отправлений в разделе
              «Мои заказы» в личном профиле.
            </p>
          </div>

          <div style={applyMediaQueries(styles.infoBox)}>
            <i
              className="fas fa-info-circle"
              style={applyMediaQueries(styles.infoIcon)}></i>
            <div style={applyMediaQueries(styles.infoContent)}>
              <strong style={applyMediaQueries(styles.infoStrong)}>
                Есть вопросы?
              </strong>
              <span style={applyMediaQueries(styles.infoText)}>
                Свяжитесь с нашей службой поддержки{" "}
                <a
                  href="mailto:info@qamkor.kz"
                  style={applyMediaQueries(styles.emailLink)}>
                  по электронной почте
                </a>{" "}
              </span>
            </div>
          </div>
        </div>

        <div style={applyMediaQueries(styles.footer)}>
          <button
            style={applyMediaQueries(styles.primaryButton)}
            onClick={onClose}>
            Я понял
          </button>
        </div>
      </div>

      {/* Добавляем CSS для анимаций и медиа-запросов в style тег */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (max-width: 768px) {
            .modal-container {
              max-height: 85vh !important;
              margin: 0 !important;
            }
            .modal-header {
              padding: 1.25rem 1.25rem 0.75rem !important;
            }
            .modal-header h3 {
              font-size: 1.2rem !important;
            }
            .close-button {
              font-size: 1.75rem !important;
              width: 36px !important;
              height: 36px !important;
            }
            .modal-body {
              padding: 1.25rem !important;
            }
            .instruction-step {
              margin-bottom: 1.25rem !important;
            }
            .step-header {
              gap: 0.5rem !important;
            }
            .step-icon {
              font-size: 1.1rem !important;
            }
            .step-title {
              font-size: 1rem !important;
            }
            .step-text {
              margin-left: 2rem !important;
              font-size: 0.9rem !important;
            }
            .info-box {
              padding: 1rem !important;
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            .primary-button {
              padding: 0.6rem 1.75rem !important;
              width: 100% !important;
            }
          }
          @media (max-width: 480px) {
            .modal-container {
              max-height: 80vh !important;
            }
            .modal-header {
              padding: 1rem 1rem 0.5rem !important;
            }
            .modal-header h3 {
              font-size: 1.1rem !important;
            }
            .modal-body {
              padding: 1rem !important;
            }
            .step-text {
              margin-left: 1.75rem !important;
            }
            .info-box {
              padding: 0.875rem !important;
            }
            .info-strong, .info-text {
              font-size: 0.85rem !important;
            }
          }
          @media (max-width: 360px) {
            .step-text {
              margin-left: 1.5rem !important;
              font-size: 0.85rem !important;
            }
            .step-title {
              font-size: 0.95rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default InstructionsModal;
