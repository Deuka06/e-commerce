import React from "react";
import { formatPrice } from "../../utils/helpers";

function OrdersTable({ orders, onUpdateStatus }) {
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: "status-pending", text: "Күтілуде" },
      shipped: { class: "status-shipped", text: "Жеткізілді" },
      completed: { class: "status-completed", text: "Аяқталды" },
    };
    return statusMap[status] || { class: "", text: "" };
  };

  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th>Тапсырыс ID</th>
          <th>Клиент</th>
          <th>Тауар</th>
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
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.date}</td>
              <td>{formatPrice(order.amount)} ₸</td>
              <td>
                <span className={`status-badge ${badge.class}`}>
                  {badge.text}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => onUpdateStatus(order.id)}>
                  Өзгерту
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default OrdersTable;
