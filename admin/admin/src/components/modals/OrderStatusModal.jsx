import React, { useState } from 'react';

function OrderStatusModal({ isOpen, onClose, order, onUpdateStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(
    order?.status || 'PENDING',
  );

  if (!isOpen || !order) return null;

  const statusOptions = [
    { value: 'PENDING', label: 'Тексерілуде', color: '#fbbf24' },
    { value: 'ACCEPTED', label: 'Қабылданды', color: '#3b82f6' },
    { value: 'DELIVERED', label: 'Жеткізілді', color: '#10b981' },
    { value: 'CANCELLED', label: 'Бас тартылды', color: '#ef4444' },
  ];

  const handleSubmit = () => {
    onUpdateStatus(order.id, selectedStatus);
    onClose();
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  const modalHeaderStyle = {
    marginBottom: '20px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
  };

  const modalTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
  };

  const orderInfoStyle = {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const orderInfoRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px',
  };

  const orderInfoLabelStyle = {
    color: '#6b7280',
    fontWeight: '500',
  };

  const orderInfoValueStyle = {
    color: '#111827',
    fontWeight: '600',
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

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  };

  const buttonBaseStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  };

  const cancelButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
  };

  const submitButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3b82f6',
    color: '#fff',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeaderStyle}>
          <h2 style={modalTitleStyle}>Тапсырыс статусын өзгерту</h2>
        </div>

        <div style={orderInfoStyle}>
          <div style={orderInfoRowStyle}>
            <span style={orderInfoLabelStyle}>Тапсырыс ID:</span>
            <span style={orderInfoValueStyle}>#{order.id}</span>
          </div>
          <div style={orderInfoRowStyle}>
            <span style={orderInfoLabelStyle}>Клиент:</span>
            <span style={orderInfoValueStyle}>{order.customerName}</span>
          </div>
          <div style={orderInfoRowStyle}>
            <span style={orderInfoLabelStyle}>Сома:</span>
            <span style={orderInfoValueStyle}>
              {order.totalAmount?.toLocaleString()} ₸
            </span>
          </div>
          <div style={orderInfoRowStyle}>
            <span style={orderInfoLabelStyle}>Ағымдағы статус:</span>
            <span style={orderInfoValueStyle}>
              {statusOptions.find((s) => s.value === order.status)?.label}
            </span>
          </div>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
            }}
          >
            Жаңа статусты таңдаңыз:
          </label>
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
        </div>

        <div style={buttonGroupStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>
            Болдырмау
          </button>
          <button
            style={submitButtonStyle}
            onClick={handleSubmit}
            disabled={selectedStatus === order.status}
          >
            Сақтау
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusModal;
