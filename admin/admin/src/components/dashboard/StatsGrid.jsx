import React from "react";
import { formatPrice } from "../../utils/helpers";

function StatsGrid({ orders, isAnalytics }) {
  if (isAnalytics) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">Смартфондар</div>
          <div className="stat-label">Ең көп сатылған тауар</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Ноутбуктер</div>
          <div className="stat-label">Ең көп ізделінген тауар</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">18-35 жас</div>
          <div className="stat-label">Негізгі клиенттер жасы</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">Алматы</div>
          <div className="stat-label">Көп тапсырыс берілген қала</div>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className="stat-value">{orders.length}</div>
        <div className="stat-label">Барлығы тапсырыстар</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-dollar-sign"></i>
        </div>
        <div className="stat-value">{formatPrice(totalRevenue)} ₸</div>
        <div className="stat-label">Жалпы табыс</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-value">{completedOrders}</div>
        <div className="stat-label">Аяқталған тапсырыстар</div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-clock"></i>
        </div>
        <div className="stat-value">{pendingOrders}</div>
        <div className="stat-label">Күтіліп жатқан тапсырыстар</div>
      </div>
    </div>
  );
}

export default StatsGrid;
