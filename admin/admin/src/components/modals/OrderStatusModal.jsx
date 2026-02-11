import React, { useState, useEffect } from 'react';

function OrderStatusModal({ isOpen, onClose, order, onUpdateStatus }) {
  // 1. Модаль ашылған сайын таңдалған статусты order-ге сәйкестендіру
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order, isOpen]); // order өзгергенде немесе модаль ашылғанда орындалады

  if (!isOpen || !order) return null;

  const statusOptions = [
    { value: 'PENDING', label: 'В ожидании', color: '#fbbf24' },
    { value: 'ACCEPTED', label: 'В процессе', color: '#3b82f6' },
    { value: 'DELIVERED', label: 'Завершен', color: '#10b981' },
    { value: 'CANCELLED', label: 'Отклонен', color: '#ef4444' },
  ];

  const handleSubmit = () => {
    // onUpdateStatus функциясын шақыру
    onUpdateStatus(order.id, selectedStatus);
    onClose();
  };

  // --- Стильдер (Сенің жазған стильдерің өзгеріссіз қалады) ---
  const modalOverlayStyle = {
    /* ... сенің кодың ... */ position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  const modalContentStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  };
  const statusGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  };

  const statusOptionStyle = (isSelected, color) => ({
    padding: '16px',
    border: `2px solid ${isSelected ? color : '#e5e7eb'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: isSelected ? `${color}10` : '#fff',
    transition: 'all 0.2s',
    fontWeight: '500',
    color: isSelected ? color : '#6b7280',
  });

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Изменить статус заказа
          </h2>
        </div>

        <div
          style={{
            backgroundColor: '#f9fafb',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span style={{ color: '#6b7280' }}>Заказ ID:</span>
            <span style={{ fontWeight: '600' }}>#{order.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Текущий статус:</span>
            <span
              style={{
                fontWeight: '600',
                color: statusOptions.find((s) => s.value === order.status)
                  ?.color,
              }}
            >
              {statusOptions.find((s) => s.value === order.status)?.label ||
                order.status}
            </span>
          </div>
        </div>

        <div style={statusGridStyle}>
          {statusOptions.map((option) => (
            <div
              key={option.value}
              style={statusOptionStyle(
                selectedStatus === option.value,
                option.color,
              )}
              onClick={() => setSelectedStatus(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>

        <div
          style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#f3f4f6',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            Отменить
          </button>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor:
                selectedStatus === order.status ? '#93c5fd' : '#3b82f6',
              color: '#fff',
              cursor:
                selectedStatus === order.status ? 'not-allowed' : 'pointer',
            }}
            onClick={handleSubmit}
            disabled={selectedStatus === order.status}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusModal;
