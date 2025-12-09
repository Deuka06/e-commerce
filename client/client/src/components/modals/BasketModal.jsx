import React from "react";
import { formatPrice } from "../../utils/helpers";

function BasketModal({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Себет</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p className="empty-message">Себет бос</p>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="basket-item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid #e0e0e0",
                  }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ color: "var(--gray)" }}>
                      {formatPrice(item.price)} ₸
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => onRemoveItem(index)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
              <div
                style={{
                  padding: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}>
                Барлығы: {formatPrice(total)} ₸
              </div>
            </>
          )}
        </div>
        {cartItems.length > 0 && (
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
            onClick={onCheckout}>
            Тапсырыс беру
          </button>
        )}
      </div>
    </div>
  );
}

export default BasketModal;
