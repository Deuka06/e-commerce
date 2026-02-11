import React from 'react';
import { formatPrice } from '../../utils/helpers';

function StatsGrid({ orders, isAnalytics }) {
  if (isAnalytics) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">Смартфон</div>
          <div className="stat-label">Самый продаваемый товар</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Ноутбук</div>
          <div className="stat-label">Самый популярный продукт</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">18-35 лет</div>
          <div className="stat-label">Возраст основных клиентов</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Алматы</div>
          <div className="stat-label">Город с большим количеством заказов</div>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter((o) => o.status === 'completed').length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className="stat-value">{orders.length}</div>
        <div className="stat-label">Все заказы</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-dollar-sign"></i>
        </div>
        <div className="stat-value">{orders.totalAmount} ₸</div>
        <div className="stat-label">Общий доход</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-value">{completedOrders}</div>
        <div className="stat-label">Выполненные заказы</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-clock"></i>
        </div>
        <div className="stat-value">{pendingOrders}</div>
        <div className="stat-label">Заказы в ожидании</div>
      </div>
    </div>
  );
}

export default StatsGrid;
