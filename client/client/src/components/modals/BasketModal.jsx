import React from "react";
import { formatPrice } from "../../utils/helpers";

function BasketModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <div className="modal" style={{ display: "flex" }} onClick={onClose}>
      <div
        className="modal-content basket-modal-content"
        onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Корзина</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p className="empty-message">Корзина пуста</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="basket-item">
                  <div className="basket-item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="basket-item-img"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="basket-item-info">
                    <div className="basket-item-name">{item.name}</div>
                    <div className="basket-item-price">
                      {formatPrice(item.price)} ₸{" "}
                      {item.quantity > 1 && (
                        <span className="basket-item-subtotal">
                          × {item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="basket-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="btn btn-secondary quantity-btn"
                        onClick={() => onUpdateQuantity(index, -1)}>
                        -
                      </button>
                      <span className="quantity-display">
                        {item.quantity || 1}
                      </span>
                      <button
                        className="btn btn-secondary quantity-btn"
                        onClick={() => onUpdateQuantity(index, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-secondary delete-btn"
                      onClick={() => onRemoveItem(index)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="basket-total">Итого: {formatPrice(total)} ₸</div>
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              onCheckout();
            }}>
            Оформить заказ
          </button>
        )}
      </div>

      <style>{`
        .basket-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          gap: 1rem;
        }

        .basket-item-info {
          flex: 1;
          min-width: 0;
        }

        .basket-item-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
          word-break: break-word;
        }

        .basket-item-price {
          color: var(--gray);
          font-size: 0.95rem;
        }

        .basket-item-subtotal {
          color: var(--primary);
          font-weight: 600;
          margin-left: 0.25rem;
        }

        .basket-item-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f5f5f5;
          border-radius: 8px;
          padding: 0.25rem;
        }

        .quantity-btn {
          padding: 0.25rem 0.5rem !important;
          min-width: 32px !important;
          height: 32px;
          font-size: 1rem;
          font-weight: 600;
        }

        .quantity-display {
          min-width: 24px;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
        }

        .delete-btn {
          min-width: 36px !important;
          height: 36px;
          padding: 0.5rem !important;
        }

        .basket-total {
          padding: 1rem;
          font-size: 1.2rem;
          font-weight: 700;
          border-top: 2px solid #e0e0e0;
          background: white;
        }

        @media (max-width: 768px) {
          .modal {
            align-items: center !important;
            padding: 1rem;
          }

          .basket-modal-content {
            max-width: 100% !important;
            width: 100% !important;
            max-height: 90vh !important;
            margin: 0 !important;
            border-radius: 16px !important;
            display: flex;
            flex-direction: column;
          }

          .modal-header {
            flex-shrink: 0;
            padding: 1.5rem !important;
          }

          .modal-body {
            flex: 1;
            overflow-y: auto !important;
            padding: 0 !important;
            min-height: 0;
          }

          .basket-item {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem;
            gap: 0.75rem;
          }

          .basket-item-info {
            width: 100%;
          }

          .basket-item-controls {
            width: 100%;
            justify-content: space-between;
          }

          .quantity-controls {
            flex: 1;
            justify-content: center;
            padding: 0.5rem;
          }

          .quantity-btn {
            min-width: 40px !important;
            height: 40px;
            font-size: 1.1rem;
          }

          .quantity-display {
            min-width: 32px;
            font-size: 1.1rem;
          }

          .delete-btn {
            min-width: 44px !important;
            height: 44px;
            padding: 0.75rem !important;
          }

          .basket-total {
            font-size: 1.1rem;
            padding: 1rem;
            position: sticky;
            bottom: 0;
            margin: 0;
          }

          .btn-primary {
            margin: 1rem !important;
            width: calc(100% - 2rem) !important;
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .modal {
            padding: 0.75rem;
          }

          .basket-modal-content {
            max-height: 78vh !important;
            border-radius: 12px !important;
          }

          .modal-header {
            padding: 1.25rem !important;
          }

          .basket-item {
            padding: 0.875rem;
            gap: 0.5rem;
          }

          .basket-item-name {
            font-size: 0.95rem;
          }

          .basket-item-price {
            font-size: 0.85rem;
          }

          .quantity-controls {
            padding: 0.4rem;
          }

          .quantity-btn {
            min-width: 36px !important;
            height: 36px;
            font-size: 1rem;
          }

          .quantity-display {
            min-width: 28px;
            font-size: 1rem;
          }

          .delete-btn {
            min-width: 40px !important;
            height: 40px;
          }

          .basket-total {
            font-size: 1rem;
            padding: 0.875rem 1rem;
          }

          .btn-primary {
            margin: 0.875rem !important;
            width: calc(100% - 1.75rem) !important;
          }
        }

        /* Сурет контейнері */
.basket-item-image-container {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
  border: 1px solid #eee;
}

/* Нақты суреттің стилі */
.basket-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Мобильді нұсқа үшін түзету (media max-width: 768px ішіне салыңыз) */
@media (max-width: 768px) {
  .basket-item {
    flex-direction: row !important; /* Сурет пен текст қатар тұруы үшін */
    align-items: center !important;
  }
  
  .basket-item-image-container {
    width: 50px;
    height: 50px;
  }
}
      `}</style>
    </div>
  );
}

export default BasketModal;
