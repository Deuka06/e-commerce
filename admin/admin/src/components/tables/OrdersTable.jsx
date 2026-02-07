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
      PENDING: { class: 'status-pending', text: 'Тексерілуде' },
      ACCEPTED: { class: 'status-shipped', text: 'Қабылданды' },
      DELIVERED: { class: 'status-completed', text: 'Жеткізілді' },
      CANCELLED: { class: 'status-cancelled', text: 'Бас тартылды' },
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
            <th>Тауарлар</th>
            <th>Күні</th>
            <th>Сома</th>
            <th>Статус</th>
            <th>Әрекеттер</th>
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
                    'Тауар жоқ'}
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
                    Өзгерту
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
