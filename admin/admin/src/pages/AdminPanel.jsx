import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Redux қосылды
import { loginUser, logout } from '../store/authSlice';
import DashboardTab from '../components/tabs/DashboardTab';
import ProductsTab from '../components/tabs/ProductsTab';
import AddProductTab from '../components/tabs/AddProductTab';
import OrdersTab from '../components/tabs/OrdersTab';
import CourierOrdersTab from '../components/tabs/CourierOrdersTab';
import AnalyticsTab from '../components/tabs/AnalyticsTab';
import CategoriesTab from '../components/tabs/CategoriesTab';
import { styles } from '../styles/adminPanelStyles';

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
  const dispatch = useDispatch();
  const {
    token,
    user,
    loading,
    error: loginErrorRedux,
  } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Backend көбінесе 'email' және 'password' күтеді
    const result = await dispatch(
      loginUser({
        email: loginForm.email,
        password: loginForm.password,
      }),
    );

    if (loginUser.fulfilled.match(result)) {
      console.log('Жүйеге сәтті кірдіңіз!');
    }
  };

  useEffect(() => {
    // Check if admin is already logged in
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (loggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Redux-тағы токен мен қолданушыны тазалау
    setActiveTab('dashboard');
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!token) {
    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.box}>
          <form onSubmit={handleLoginSubmit} style={loginStyles.form}>
            <div style={loginStyles.formGroup}>
              <label style={loginStyles.label}>Электрондық пошта</label>
              <input
                style={loginStyles.input}
                type="email"
                name="email" // username-ді email-ға ауыстырдық
                value={loginForm.email}
                onChange={handleLoginInputChange}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div style={loginStyles.formGroup}>
              <label style={loginStyles.label}>Құпия сөз</label>
              <input
                style={loginStyles.input}
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Redux-тан келген қатені көрсету */}
            {loginErrorRedux && (
              <div style={loginStyles.errorMessage}>
                {typeof loginErrorRedux === 'string'
                  ? loginErrorRedux
                  : 'Қате пайдаланушы аты немесе құпия сөз'}
              </div>
            )}

            <button type="submit" style={loginStyles.button} disabled={loading}>
              {loading ? 'Кіру...' : 'Кіру'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Бақылау тақтасы', icon: '📊' },
    { id: 'products', label: 'Тауарлар', icon: '📦' },
    { id: 'add-product', label: 'Жаңа тауар', icon: '➕' },
    { id: 'orders', label: 'Тапсырыстар', icon: '🛒' },
    { id: 'courier-orders', label: 'Курьерлік тапсырыстар', icon: '🚚' },
    { id: 'analytics', label: 'Аналитика', icon: '📈' },
    { id: 'categories', label: 'Категориялар', icon: '📂' },
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
        }}
      >
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🛍️</div>
          <span style={styles.logoText}>Admin Pro</span>
          {isMobile && (
            <button
              style={styles.closeSidebarBtn}
              onClick={() => setSidebarOpen(false)}
            >
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
              }}
            >
              <span style={styles.navIcon}>{tab.icon}</span>
              <span style={styles.navLabel}>{tab.label}</span>
              {activeTab === tab.id && <div style={styles.activeIndicator} />}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={styles.userName}>{user?.name || 'Админ'}</div>
              <div style={styles.userRole}>
                {user?.email || 'admin@example.com'}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            Шығу 🚪
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          ...styles.main,
          ...(isMobile ? styles.mainMobile : {}),
        }}
      >
        {/* Header */}
        <header
          style={{
            ...styles.header,
            ...(isMobile ? styles.headerMobile : {}),
          }}
        >
          <div style={styles.headerLeft}>
            {isMobile && (
              <button
                style={styles.hamburgerBtn}
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            )}
            <div>
              <h1
                style={{
                  ...styles.pageTitle,
                  ...(isMobile ? styles.pageTitleMobile : {}),
                }}
              >
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
          }}
        >
          {activeTab === 'dashboard' && (
            <DashboardTab orders={orders} isMobile={isMobile} />
          )}
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              categories={categories}
              onDeleteProduct={onDeleteProduct}
              isMobile={isMobile}
            />
          )}
          {activeTab === 'add-product' && (
            <AddProductTab onAddProduct={onAddProduct} isMobile={isMobile} />
          )}
          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
              isMobile={isMobile}
            />
          )}
          {activeTab === 'courier-orders' && (
            <CourierOrdersTab
              courierOrders={courierOrders}
              onUpdateCourierOrderStatus={onUpdateCourierOrderStatus}
              isMobile={isMobile}
            />
          )}
          {activeTab === 'analytics' && (
            <AnalyticsTab orders={orders} isMobile={isMobile} />
          )}
          {activeTab === 'categories' && (
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

const loginStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  box: {
    background: '#fff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
    margin: '20px',
    overflow: 'hidden',
  },
  header: {
    padding: '40px 40px 32px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
  },
  logoIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '15px',
    opacity: 0.9,
    margin: 0,
  },
  form: {
    padding: '40px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    marginTop: '8px',
  },
  errorMessage: {
    padding: '12px 16px',
    background: '#fee',
    color: '#c33',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '16px',
    textAlign: 'center',
  },
  footer: {
    padding: '20px 40px 32px',
    textAlign: 'center',
  },
  hint: {
    color: '#8492a6',
    fontSize: '13px',
  },
};

const logoutBtnStyle = {
  width: '100%',
  marginTop: '12px',
  padding: '10px 16px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

export default AdminPanel;
