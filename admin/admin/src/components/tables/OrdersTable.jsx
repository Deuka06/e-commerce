import React, { useState } from 'react';
import { formatPrice } from '../../utils/helpers';
import OrderStatusModal from '../modals/OrderStatusModal';

function OrdersTable({ orders, onUpdateStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  // Backend-тегі (Prisma) статус түрлеріне сәйкестендіру
  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { class: 'status-pending', text: 'В ожидании' },
      ACCEPTED: { class: 'status-shipped', text: 'В процессе' },
      DELIVERED: { class: 'status-completed', text: 'Завершен' },
      CANCELLED: { class: 'status-cancelled', text: 'Отклонен' },
    };
    return statusMap[status] || { class: '', text: status };
  };

  return (
    <>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Товары</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);

            return (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {/* Тауарлар тізімін қысқаша көрсету */}
                  {order.items?.map((item) => item.name).join(', ') ||
                    'Товара нет'}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{formatPrice(order.totalAmount)} ₸</td>
                <td>
                  <span className={`status-badge ${badge.class}`}>
                    {badge.text}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenModal(order)}
                  >
                    Изменить
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <OrderStatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        onUpdateStatus={onUpdateStatus}
      />
    </>
  );
}

export default OrdersTable;
