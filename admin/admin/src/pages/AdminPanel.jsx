import React, { useState } from "react";
import ProductGrid from "../../../../client/client/src/components/ProductGrid";
import OrdersTable from "../components/tables/OrdersTable";
import StatsGrid from "../components/dashboard/StatsGrid";

function AdminPanel({
  products,
  orders,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="admin-panel" style={{ display: "block" }}>
      <div className="container">
        <div className="admin-header">
          <h2>Админ панелі</h2>
          <button className="btn btn-primary" onClick={onAddProduct}>
            <i className="fas fa-plus"></i>
            <span>Жаңа тауар қосу</span>
          </button>
        </div>

        <div className="admin-tabs">
          {["dashboard", "products", "orders", "analytics"].map((tab) => (
            <div
              key={tab}
              className={`admin-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}>
              {tab === "dashboard" && (
                <>
                  <i className="fas fa-tachometer-alt"></i> Бақылау тақтасы
                </>
              )}
              {tab === "products" && (
                <>
                  <i className="fas fa-box-open"></i> Тауарлар
                </>
              )}
              {tab === "orders" && (
                <>
                  <i className="fas fa-shopping-cart"></i> Тапсырыстар
                </>
              )}
              {tab === "analytics" && (
                <>
                  <i className="fas fa-chart-line"></i> Аналитика
                </>
              )}
            </div>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div>
            <h3 style={{ marginBottom: "1.5rem" }}>Жалпы статистика</h3>
            <StatsGrid orders={orders} />
            <div className="chart-container">
              <h3 style={{ marginBottom: "1.5rem" }}>Соңғы тапсырыстар</h3>
              <OrdersTable
                orders={orders.slice(-3)}
                onUpdateStatus={onUpdateOrderStatus}
              />
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <h3 style={{ marginBottom: "1.5rem" }}>Тауарларды басқару</h3>
            <ProductGrid
              products={products}
              onDelete={onDeleteProduct}
              isAdmin={true}
            />
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h3 style={{ marginBottom: "1.5rem" }}>Тапсырыстар</h3>
            <OrdersTable orders={orders} onUpdateStatus={onUpdateOrderStatus} />
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h3 style={{ marginBottom: "1.5rem" }}>Сатылым аналитикасы</h3>
            <StatsGrid orders={orders} isAnalytics={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
