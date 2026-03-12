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
                  {/* Сурет пен ақпаратты біріктіретін сол жақ блок */}
                  <div className="basket-item-main">
                    <div className="basket-item-image">
                      <img
                        src={item.image || item.imageUrl}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/60";
                        }}
                      />
                    </div>
                    <div className="basket-item-info">
                      <div className="basket-item-name">{item.name}</div>
                      <div className="basket-item-price">
                        {formatPrice(item.price)} ₸
                      </div>
                    </div>
                  </div>

                  {/* Басқару батырмалары (Оң жақ блок) */}
                  <div className="basket-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(index, -1)}>
                        -
                      </button>
                      <span className="quantity-display">
                        {item.quantity || 1}
                      </span>
                      <button
                        className="quantity-btn"
                        onClick={() => onUpdateQuantity(index, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="delete-btn"
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
          border-bottom: 1px solid #f0f0f0;
          gap: 1rem;
        }

        .basket-item-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .basket-item-image {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid #eee;
        }

        .basket-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }



        .basket-item-info {
          flex: 1;
          min-width: 0;
        }

        .basket-item-name {
          font-weight: 600;
          font-size: 0.95rem;
          line-height: 1.2;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Аты тым ұзын болса 2 жолдан соң қияды */
          -webkit-box-orient: vertical;
          overflow: hidden;
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
            flex-direction: row !important; /* Баған емес, қатар болып қалуы керек */
            padding: 0.75rem;
            gap: 0.5rem;
          }

          .basket-item-main {
            gap: 0.5rem;
          }

          .basket-item-image {
            width: 50px;
            height: 50px;
          }

          .basket-item-name {
            font-size: 0.85rem;
          }

          .basket-item-info {
            width: 100%;
          }

          .basket-item-controls {
            flex-direction: column-reverse; /* Мобильдіде батырмаларды ыңғайлы орналастыру */
            align-items: flex-end;
            gap: 0.5rem;
          }

          .quantity-controls {
            padding: 0.15rem;
          }

          .quantity-btn {
            min-width: 28px !important;
            height: 28px;
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
      `}</style>
    </div>
  );
}

export default BasketModal;
