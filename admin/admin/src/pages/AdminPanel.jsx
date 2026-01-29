import React, { useState, useEffect } from "react";
import DashboardTab from "../components/tabs/DashboardTab";
import ProductsTab from "../components/tabs/ProductsTab";
import AddProductTab from "../components/tabs/AddProductTab";
import OrdersTab from "../components/tabs/OrdersTab";
import CourierOrdersTab from "../components/tabs/CourierOrdersTab";
import AnalyticsTab from "../components/tabs/AnalyticsTab";
import CategoriesTab from "../components/tabs/CategoriesTab";
import { styles } from "../styles/adminPanelStyles";

function AdminPanel({
  products,
  orders,
  courierOrders,
  categories,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateCourierOrderStatus,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Бақылау тақтасы", icon: "📊" },
    { id: "products", label: "Тауарлар", icon: "📦" },
    { id: "add-product", label: "Жаңа тауар", icon: "➕" },
    { id: "orders", label: "Тапсырыстар", icon: "🛒" },
    { id: "courier-orders", label: "Курьерлік тапсырыстар", icon: "🚚" },
    { id: "analytics", label: "Аналитика", icon: "📈" },
    { id: "categories", label: "Категориялар", icon: "📂" },
  ];

  return (
    <div style={styles.wrapper}>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          ...(isMobile ? styles.sidebarMobile : {}),
          ...(isMobile && sidebarOpen ? styles.sidebarMobileOpen : {}),
        }}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🛍️</div>
          <span style={styles.logoText}>Admin Pro</span>
          {isMobile && (
            <button
              style={styles.closeSidebarBtn}
              onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          )}
        </div>

        <nav style={styles.nav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                ...styles.navButton,
                ...(activeTab === tab.id ? styles.navButtonActive : {}),
              }}>
              <span style={styles.navIcon}>{tab.icon}</span>
              <span style={styles.navLabel}>{tab.label}</span>
              {activeTab === tab.id && <div style={styles.activeIndicator} />}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>A</div>
            <div>
              <div style={styles.userName}>Админ</div>
              <div style={styles.userRole}>Менеджер</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          ...styles.main,
          ...(isMobile ? styles.mainMobile : {}),
        }}>
        {/* Header */}
        <header
          style={{
            ...styles.header,
            ...(isMobile ? styles.headerMobile : {}),
          }}>
          <div style={styles.headerLeft}>
            {isMobile && (
              <button
                style={styles.hamburgerBtn}
                onClick={() => setSidebarOpen(true)}>
                ☰
              </button>
            )}
            <div>
              <h1
                style={{
                  ...styles.pageTitle,
                  ...(isMobile ? styles.pageTitleMobile : {}),
                }}>
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              {!isMobile && (
                <p style={styles.breadcrumb}>
                  Басты бет / {tabs.find((t) => t.id === activeTab)?.label}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div
          style={{
            ...styles.content,
            ...(isMobile ? styles.contentMobile : {}),
          }}>
          {activeTab === "dashboard" && (
            <DashboardTab orders={orders} isMobile={isMobile} />
          )}
          {activeTab === "products" && (
            <ProductsTab
              products={products}
              onDeleteProduct={onDeleteProduct}
              isMobile={isMobile}
            />
          )}
          {activeTab === "add-product" && (
            <AddProductTab onAddProduct={onAddProduct} isMobile={isMobile} />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
              isMobile={isMobile}
            />
          )}
          {activeTab === "courier-orders" && (
            <CourierOrdersTab
              courierOrders={courierOrders}
              onUpdateCourierOrderStatus={onUpdateCourierOrderStatus}
              isMobile={isMobile}
            />
          )}
          {activeTab === "analytics" && (
            <AnalyticsTab orders={orders} isMobile={isMobile} />
          )}
          {activeTab === "categories" && (
            <CategoriesTab
              categories={categories}
              onAddCategory={onAddCategory}
              onDeleteCategory={onDeleteCategory}
              onUpdateCategory={onUpdateCategory}
              isMobile={isMobile}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
