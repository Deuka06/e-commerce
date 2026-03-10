import React from "react";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "500px",
      maxHeight: "80vh",
      overflowY: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
    },
    total: {
      marginTop: "20px",
      textAlign: "right",
      fontWeight: "bold",
      fontSize: "18px",
    },
    closeBtn: {
      marginTop: "20px",
      width: "100%",
      padding: "12px",
      backgroundColor: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3>Заказ #{order.id} - Детали</h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}>
            &times;
          </button>
        </div>

        <div>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div key={index} style={styles.item}>
                <div>
                  <div style={{ fontWeight: "500" }}>{item.name}</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    {item.quantity} шт. &times; {item.price?.toLocaleString()} ₸
                  </div>
                </div>
                <div style={{ fontWeight: "500" }}>
                  {(item.price * item.quantity)?.toLocaleString()} ₸
                </div>
              </div>
            ))
          ) : (
            <p>Тауарлар тізімі бос</p>
          )}
        </div>

        <div style={styles.total}>
          Итого: {order.totalAmount?.toLocaleString()} ₸
        </div>

        <button onClick={onClose} style={styles.closeBtn}>
          Жабу
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
