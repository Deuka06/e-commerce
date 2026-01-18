import React, { useState, useEffect } from 'react';
import ProductGrid from '../../../../client/client/src/components/ProductGrid';
import OrdersTable from '../components/tables/OrdersTable';
import StatsGrid from '../components/dashboard/StatsGrid';

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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [courierOrdersPage, setCourierOrdersPage] = useState(1);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const ordersPerPage = 6;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  // Category form state
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: '',
    image: '',
  });
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result);
        setCategoryFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      ...formData,
      price: parseFloat(formData.price),
    });
    // Reset form and switch to products tab
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
    });
    setActiveTab('products');
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEditingCategory) {
      onUpdateCategory(categoryFormData.id, {
        name: categoryFormData.name,
        image: categoryFormData.image,
      });
    } else {
      onAddCategory({
        name: categoryFormData.name,
        image: categoryFormData.image,
      });
    }
    // Reset form
    setCategoryFormData({
      id: null,
      name: '',
      image: '',
    });
    setCategoryImagePreview(null);
    setIsEditingCategory(false);
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      id: category.id,
      name: category.name,
      image: category.image || '',
    });
    setCategoryImagePreview(category.image || null);
    setIsEditingCategory(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setCategoryFormData({
      id: null,
      name: '',
      image: '',
    });
    setCategoryImagePreview(null);
    setIsEditingCategory(false);
  };

  // Pagination logic for dashboard
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  // Pagination logic for all orders tab
  const indexOfLastAllOrder = ordersPage * ordersPerPage;
  const indexOfFirstAllOrder = indexOfLastAllOrder - ordersPerPage;
  const currentAllOrders =
    orders?.slice(indexOfFirstAllOrder, indexOfLastAllOrder) || [];
  const totalAllOrdersPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  // Pagination logic for courier orders tab
  const indexOfLastCourierOrder = courierOrdersPage * ordersPerPage;
  const indexOfFirstCourierOrder = indexOfLastCourierOrder - ordersPerPage;
  const currentCourierOrders =
    courierOrders?.slice(indexOfFirstCourierOrder, indexOfLastCourierOrder) ||
    [];
  const totalCourierOrdersPages = Math.ceil(
    (courierOrders?.length || 0) / ordersPerPage,
  );

  // Pagination logic for categories tab
  const indexOfLastCategory = categoriesPage * ordersPerPage;
  const indexOfFirstCategory = indexOfLastCategory - ordersPerPage;
  const currentCategories =
    categories?.slice(indexOfFirstCategory, indexOfLastCategory) || [];
  const totalCategoriesPages = Math.ceil(
    (categories?.length || 0) / ordersPerPage,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrdersPageChange = (pageNumber) => {
    setOrdersPage(pageNumber);
  };

  const handleCourierOrdersPageChange = (pageNumber) => {
    setCourierOrdersPage(pageNumber);
  };

  const handleCategoriesPageChange = (pageNumber) => {
    setCategoriesPage(pageNumber);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1); // Reset pagination when changing tabs
    setOrdersPage(1); // Reset orders pagination
    setCourierOrdersPage(1); // Reset courier orders pagination
    setCategoriesPage(1); // Reset categories pagination
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
            <div style={styles.dashboardGrid}>
              <div style={styles.fullWidth}>
                <div style={styles.card}>
                  <div
                    style={{
                      ...styles.cardHeader,
                      ...(isMobile ? styles.cardHeaderMobile : {}),
                    }}
                  >
                    <h3
                      style={{
                        ...styles.cardTitle,
                        ...(isMobile ? styles.cardTitleMobile : {}),
                      }}
                    >
                      📊 Жалпы статистика
                    </h3>
                  </div>
                  <div
                    style={{
                      ...styles.cardBody,
                      ...(isMobile ? styles.cardBodyMobile : {}),
                    }}
                  >
                    <div style={isMobile ? styles.statsGridMobile : {}}>
                      <StatsGrid orders={orders} />
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.fullWidth}>
                <div style={styles.card}>
                  <div
                    style={{
                      ...styles.cardHeader,
                      ...(isMobile ? styles.cardHeaderMobile : {}),
                    }}
                  >
                    <h3
                      style={{
                        ...styles.cardTitle,
                        ...(isMobile ? styles.cardTitleMobile : {}),
                      }}
                    >
                      🕐 Соңғы тапсырыстар
                    </h3>
                    <button
                      style={styles.viewAllBtn}
                      onClick={() => setActiveTab('orders')}
                    >
                      {isMobile ? 'Барлығын көру →' : 'Барлығын көру →'}
                    </button>
                  </div>
                  <div
                    style={{
                      ...styles.cardBody,
                      ...(isMobile ? styles.cardBodyMobile : {}),
                    }}
                  >
                    {isMobile ? (
                      <div style={styles.ordersCardsContainer}>
                        {currentOrders.length > 0 ? (
                          currentOrders.map((order) => (
                            <div key={order.id} style={styles.orderCard}>
                              <div style={styles.orderCardHeader}>
                                <div style={styles.orderCardId}>
                                  Тапсырыс #{order.id}
                                </div>
                                <div
                                  style={{
                                    ...styles.statusBadge,
                                    ...getStatusStyle(order.status),
                                  }}
                                >
                                  {getStatusText(order.status)}
                                </div>
                              </div>
                              <div style={styles.orderCardBody}>
                                <div style={styles.orderCardRow}>
                                  <span style={styles.orderCardLabel}>
                                    Клиент:
                                  </span>
                                  <span style={styles.orderCardValue}>
                                    {order.customerName}
                                  </span>
                                </div>
                                <div style={styles.orderCardRow}>
                                  <span style={styles.orderCardLabel}>
                                    Email:
                                  </span>
                                  <span style={styles.orderCardValue}>
                                    {order.customerEmail}
                                  </span>
                                </div>
                                <div style={styles.orderCardRow}>
                                  <span style={styles.orderCardLabel}>
                                    Сома:
                                  </span>
                                  <span style={styles.orderCardPrice}>
                                    {order.total?.toLocaleString()} ₸
                                  </span>
                                </div>
                                <div style={styles.orderCardRow}>
                                  <span style={styles.orderCardLabel}>
                                    Тауарлар:
                                  </span>
                                  <span style={styles.orderCardValue}>
                                    {order.items?.length || 0}
                                  </span>
                                </div>
                              </div>
                              <div style={styles.orderCardFooter}>
                                <select
                                  value={order.status}
                                  onChange={(e) =>
                                    onUpdateOrderStatus(
                                      order.id,
                                      e.target.value,
                                    )
                                  }
                                  style={styles.statusSelect}
                                >
                                  <option value="pending">Күтуде</option>
                                  <option value="processing">Өңделуде</option>
                                  <option value="shipped">Жөнелтілді</option>
                                  <option value="delivered">Жеткізілді</option>
                                  <option value="cancelled">Жойылды</option>
                                </select>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div style={styles.emptyState}>Тапсырыстар жоқ</div>
                        )}
                        {totalPages > 1 && (
                          <div style={styles.pagination}>
                            <button
                              style={{
                                ...styles.paginationBtn,
                                ...(currentPage === 1
                                  ? styles.paginationBtnDisabled
                                  : {}),
                              }}
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              ←
                            </button>
                            <span style={styles.paginationInfo}>
                              {currentPage} / {totalPages}
                            </span>
                            <button
                              style={{
                                ...styles.paginationBtn,
                                ...(currentPage === totalPages
                                  ? styles.paginationBtnDisabled
                                  : {}),
                              }}
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              →
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <OrdersTable
                          orders={orders?.slice(-3) || []}
                          onUpdateStatus={onUpdateOrderStatus}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div style={styles.card}>
              <div
                style={{
                  ...styles.cardHeader,
                  ...(isMobile ? styles.cardHeaderMobile : {}),
                }}
              >
                <h3
                  style={{
                    ...styles.cardTitle,
                    ...(isMobile ? styles.cardTitleMobile : {}),
                  }}
                >
                  📦 Тауарлар ({products?.length || 0})
                </h3>
              </div>
              <div
                style={{
                  ...styles.cardBody,
                  ...(isMobile ? styles.cardBodyMobile : {}),
                }}
              >
                <ProductGrid
                  products={products}
                  onDelete={onDeleteProduct}
                  isAdmin={true}
                />
              </div>
            </div>
          )}

          {activeTab === 'add-product' && (
            <div style={styles.card}>
              <div
                style={{
                  ...styles.cardHeader,
                  ...(isMobile ? styles.cardHeaderMobile : {}),
                }}
              >
                <h3
                  style={{
                    ...styles.cardTitle,
                    ...(isMobile ? styles.cardTitleMobile : {}),
                  }}
                >
                  ➕ Жаңа тауар қосу
                </h3>
              </div>
              <div
                style={{
                  ...styles.cardBody,
                  ...(isMobile ? styles.cardBodyMobile : {}),
                }}
              >
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Тауар атауы</label>
                    <input
                      style={styles.input}
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Тауардың атын енгізіңіз"
                      required
                    />
                  </div>
                  <div style={styles.formRow}>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                      <label style={styles.label}>Бағасы (₸)</label>
                      <input
                        style={styles.input}
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div style={{ ...styles.formGroup, flex: 1 }}>
                      <label style={styles.label}>Категория</label>
                      <select
                        style={styles.input}
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Категорияны таңдаңыз</option>
                        <option value="electronics">Электроника</option>
                        <option value="clothing">Киім</option>
                        <option value="books">Кітаптар</option>
                        <option value="home">Үй</option>
                        <option value="sports">Спорт</option>
                        <option value="beauty">Сұлулық</option>
                        <option value="toys">Ойыншықтар</option>
                        <option value="food">Тамақ</option>
                        <option value="other">Басқа</option>
                      </select>
                    </div>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Сурет URL</label>
                    <input
                      style={styles.input}
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Суреттің сілтемесін енгізіңіз"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Сипаттама</label>
                    <textarea
                      style={styles.textarea}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Тауар туралы толық мәлімет"
                      rows="4"
                      required
                    />
                  </div>
                  <button type="submit" style={styles.submitBtn}>
                    Тауарды сақтау
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div style={styles.card}>
              <div
                style={{
                  ...styles.cardHeader,
                  ...(isMobile ? styles.cardHeaderMobile : {}),
                }}
              >
                <h3
                  style={{
                    ...styles.cardTitle,
                    ...(isMobile ? styles.cardTitleMobile : {}),
                  }}
                >
                  🛒 Барлық тапсырыстар ({orders?.length || 0})
                </h3>
              </div>
              <div
                style={{
                  ...styles.cardBody,
                  ...(isMobile ? styles.cardBodyMobile : {}),
                }}
              >
                {isMobile ? (
                  <div style={styles.ordersCardsContainer}>
                    {currentAllOrders.length > 0 ? (
                      currentAllOrders.map((order) => (
                        <div key={order.id} style={styles.orderCard}>
                          <div style={styles.orderCardHeader}>
                            <div style={styles.orderCardId}>
                              Тапсырыс #{order.id}
                            </div>
                            <div
                              style={{
                                ...styles.statusBadge,
                                ...getStatusStyle(order.status),
                              }}
                            >
                              {getStatusText(order.status)}
                            </div>
                          </div>
                          <div style={styles.orderCardBody}>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Клиент:</span>
                              <span style={styles.orderCardValue}>
                                {order.customerName}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Email:</span>
                              <span style={styles.orderCardValue}>
                                {order.customerEmail}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Сома:</span>
                              <span style={styles.orderCardPrice}>
                                {order.total?.toLocaleString()} ₸
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>
                                Тауарлар:
                              </span>
                              <span style={styles.orderCardValue}>
                                {order.items?.length || 0}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Күні:</span>
                              <span style={styles.orderCardValue}>
                                {new Date(
                                  order.createdAt || Date.now(),
                                ).toLocaleDateString('kk-KZ')}
                              </span>
                            </div>
                          </div>
                          <div style={styles.orderCardFooter}>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(order.id, e.target.value)
                              }
                              style={styles.statusSelect}
                            >
                              <option value="pending">Күтуде</option>
                              <option value="processing">Өңделуде</option>
                              <option value="shipped">Жөнелтілді</option>
                              <option value="delivered">Жеткізілді</option>
                              <option value="cancelled">Жойылды</option>
                            </select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={styles.emptyState}>Тапсырыстар жоқ</div>
                    )}
                    {totalAllOrdersPages > 1 && (
                      <div style={styles.pagination}>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(ordersPage === 1
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() => handleOrdersPageChange(ordersPage - 1)}
                          disabled={ordersPage === 1}
                        >
                          ←
                        </button>
                        <span style={styles.paginationInfo}>
                          {ordersPage} / {totalAllOrdersPages}
                        </span>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(ordersPage === totalAllOrdersPages
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() => handleOrdersPageChange(ordersPage + 1)}
                          disabled={ordersPage === totalAllOrdersPages}
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <OrdersTable
                      orders={orders || []}
                      onUpdateStatus={onUpdateOrderStatus}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'courier-orders' && (
            <div style={styles.card}>
              <div
                style={{
                  ...styles.cardHeader,
                  ...(isMobile ? styles.cardHeaderMobile : {}),
                }}
              >
                <h3
                  style={{
                    ...styles.cardTitle,
                    ...(isMobile ? styles.cardTitleMobile : {}),
                  }}
                >
                  🚚 Курьерлік тапсырыстар ({courierOrders?.length || 0})
                </h3>
              </div>
              <div
                style={{
                  ...styles.cardBody,
                  ...(isMobile ? styles.cardBodyMobile : {}),
                }}
              >
                {isMobile ? (
                  <div style={styles.ordersCardsContainer}>
                    {currentCourierOrders.length > 0 ? (
                      currentCourierOrders.map((order) => (
                        <div key={order.id} style={styles.orderCard}>
                          <div style={styles.orderCardHeader}>
                            <div style={styles.orderCardId}>
                              Курьер #{order.id}
                            </div>
                            <div
                              style={{
                                ...styles.statusBadge,
                                ...getStatusStyle(order.status),
                              }}
                            >
                              {getStatusText(order.status)}
                            </div>
                          </div>
                          <div style={styles.orderCardBody}>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Клиент:</span>
                              <span style={styles.orderCardValue}>
                                {order.customerName}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>
                                Телефон:
                              </span>
                              <span style={styles.orderCardValue}>
                                {order.customerPhone}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Қайдан:</span>
                              <span style={styles.orderCardValue}>
                                {order.pickupAddress}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Қайда:</span>
                              <span style={styles.orderCardValue}>
                                {order.deliveryAddress}
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Бағасы:</span>
                              <span style={styles.orderCardPrice}>
                                {order.price?.toLocaleString()} ₸
                              </span>
                            </div>
                            <div style={styles.orderCardRow}>
                              <span style={styles.orderCardLabel}>Күні:</span>
                              <span style={styles.orderCardValue}>
                                {new Date(
                                  order.createdAt || Date.now(),
                                ).toLocaleDateString('kk-KZ')}
                              </span>
                            </div>
                          </div>
                          <div style={styles.orderCardFooter}>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                onUpdateCourierOrderStatus(
                                  order.id,
                                  e.target.value,
                                )
                              }
                              style={styles.statusSelect}
                            >
                              <option value="pending">Күтуде</option>
                              <option value="accepted">Қабылданды</option>
                              <option value="picked-up">Алынды</option>
                              <option value="in-transit">Жолда</option>
                              <option value="delivered">Жеткізілді</option>
                              <option value="cancelled">Жойылды</option>
                            </select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={styles.emptyState}>
                        Курьерлік тапсырыстар жоқ
                      </div>
                    )}
                    {totalCourierOrdersPages > 1 && (
                      <div style={styles.pagination}>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(courierOrdersPage === 1
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() =>
                            handleCourierOrdersPageChange(courierOrdersPage - 1)
                          }
                          disabled={courierOrdersPage === 1}
                        >
                          ←
                        </button>
                        <span style={styles.paginationInfo}>
                          {courierOrdersPage} / {totalCourierOrdersPages}
                        </span>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(courierOrdersPage === totalCourierOrdersPages
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() =>
                            handleCourierOrdersPageChange(courierOrdersPage + 1)
                          }
                          disabled={
                            courierOrdersPage === totalCourierOrdersPages
                          }
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.tableHeaderRow}>
                          <th style={styles.tableHeader}>ID</th>
                          <th style={styles.tableHeader}>Клиент</th>
                          <th style={styles.tableHeader}>Телефон</th>
                          <th style={styles.tableHeader}>Қайдан</th>
                          <th style={styles.tableHeader}>Қайда</th>
                          <th style={styles.tableHeader}>Бағасы</th>
                          <th style={styles.tableHeader}>Күні</th>
                          <th style={styles.tableHeader}>Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCourierOrders.map((order) => (
                          <tr key={order.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>#{order.id}</td>
                            <td style={styles.tableCell}>
                              {order.customerName}
                            </td>
                            <td style={styles.tableCell}>
                              {order.customerPhone}
                            </td>
                            <td style={styles.tableCell}>
                              {order.pickupAddress}
                            </td>
                            <td style={styles.tableCell}>
                              {order.deliveryAddress}
                            </td>
                            <td style={styles.tableCell}>
                              {order.price?.toLocaleString()} ₸
                            </td>
                            <td style={styles.tableCell}>
                              {new Date(
                                order.createdAt || Date.now(),
                              ).toLocaleDateString('kk-KZ')}
                            </td>
                            <td style={styles.tableCell}>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  onUpdateCourierOrderStatus(
                                    order.id,
                                    e.target.value,
                                  )
                                }
                                style={styles.statusSelect}
                              >
                                <option value="pending">Күтуде</option>
                                <option value="accepted">Қабылданды</option>
                                <option value="picked-up">Алынды</option>
                                <option value="in-transit">Жолда</option>
                                <option value="delivered">Жеткізілді</option>
                                <option value="cancelled">Жойылды</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {totalCourierOrdersPages > 1 && (
                      <div style={styles.pagination}>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(courierOrdersPage === 1
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() =>
                            handleCourierOrdersPageChange(courierOrdersPage - 1)
                          }
                          disabled={courierOrdersPage === 1}
                        >
                          ←
                        </button>
                        <span style={styles.paginationInfo}>
                          {courierOrdersPage} / {totalCourierOrdersPages}
                        </span>
                        <button
                          style={{
                            ...styles.paginationBtn,
                            ...(courierOrdersPage === totalCourierOrdersPages
                              ? styles.paginationBtnDisabled
                              : {}),
                          }}
                          onClick={() =>
                            handleCourierOrdersPageChange(courierOrdersPage + 1)
                          }
                          disabled={
                            courierOrdersPage === totalCourierOrdersPages
                          }
                        >
                          →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div style={styles.card}>
              <div
                style={{
                  ...styles.cardHeader,
                  ...(isMobile ? styles.cardHeaderMobile : {}),
                }}
              >
                <h3
                  style={{
                    ...styles.cardTitle,
                    ...(isMobile ? styles.cardTitleMobile : {}),
                  }}
                >
                  📈 Сатылым аналитикасы
                </h3>
              </div>
              <div
                style={{
                  ...styles.cardBody,
                  ...(isMobile ? styles.cardBodyMobile : {}),
                }}
              >
                <StatsGrid orders={orders} isAnalytics={true} />
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <>
              <div style={styles.card}>
                <div
                  style={{
                    ...styles.cardHeader,
                    ...(isMobile ? styles.cardHeaderMobile : {}),
                  }}
                >
                  <h3
                    style={{
                      ...styles.cardTitle,
                      ...(isMobile ? styles.cardTitleMobile : {}),
                    }}
                  >
                    📑{' '}
                    {isEditingCategory
                      ? 'Категорияны өңдеу'
                      : 'Жаңа категория қосу'}
                  </h3>
                </div>
                <div
                  style={{
                    ...styles.cardBody,
                    ...(isMobile ? styles.cardBodyMobile : {}),
                  }}
                >
                  <form onSubmit={handleCategorySubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Категория атауы</label>
                      <input
                        style={styles.input}
                        name="name"
                        value={categoryFormData.name}
                        onChange={handleCategoryInputChange}
                        placeholder="Электроника"
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Категория суреті</label>
                      <input
                        style={styles.input}
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageChange}
                        required={!isEditingCategory}
                      />
                      <small style={styles.helpText}>
                        JPG, PNG немесе GIF форматында сурет таңдаңыз
                      </small>
                    </div>
                    {categoryImagePreview && (
                      <div style={styles.imagePreviewContainer}>
                        <label style={styles.label}>
                          Сурет алдын ала қарау
                        </label>
                        <img
                          src={categoryImagePreview}
                          alt="Preview"
                          style={styles.imagePreview}
                        />
                      </div>
                    )}
                    <div
                      style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                    >
                      <button type="submit" style={styles.submitBtn}>
                        {isEditingCategory ? '✓ Жаңарту' : '+ Қосу'}
                      </button>
                      {isEditingCategory && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          style={styles.cancelBtn}
                        >
                          ✕ Болдырмау
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div style={{ ...styles.card, marginTop: '28px' }}>
                <div
                  style={{
                    ...styles.cardHeader,
                    ...(isMobile ? styles.cardHeaderMobile : {}),
                  }}
                >
                  <h3
                    style={{
                      ...styles.cardTitle,
                      ...(isMobile ? styles.cardTitleMobile : {}),
                    }}
                  >
                    📋 Барлық категориялар ({categories?.length || 0})
                  </h3>
                </div>
                <div
                  style={{
                    ...styles.cardBody,
                    ...(isMobile ? styles.cardBodyMobile : {}),
                  }}
                >
                  {isMobile ? (
                    <div style={styles.categoriesGrid}>
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <div key={category.id} style={styles.categoryCard}>
                            <div style={styles.categoryCardContent}>
                              {category.image && (
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  style={styles.categoryImage}
                                />
                              )}
                              <div style={styles.categoryInfo}>
                                <div style={styles.categoryName}>
                                  {category.name}
                                </div>
                              </div>
                            </div>
                            <div style={styles.categoryActions}>
                              <button
                                onClick={() => handleEditCategory(category)}
                                style={styles.editBtn}
                              >
                                ✏️ Өңдеу
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      'Категорияны жоюға сенімдісіз бе?',
                                    )
                                  ) {
                                    onDeleteCategory(category.id);
                                  }
                                }}
                                style={styles.deleteBtn}
                              >
                                🗑️ Жою
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={styles.emptyState}>Категориялар жоқ</div>
                      )}
                    </div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table style={styles.table}>
                        <thead>
                          <tr style={styles.tableHeaderRow}>
                            <th style={styles.tableHeader}>Сурет</th>
                            <th style={styles.tableHeader}>Атауы</th>
                            <th style={styles.tableHeader}>Әрекеттер</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <tr key={category.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>
                                  {category.image && (
                                    <img
                                      src={category.image}
                                      alt={category.name}
                                      style={styles.categoryTableImage}
                                    />
                                  )}
                                </td>
                                <td style={styles.tableCell}>
                                  {category.name}
                                </td>
                                <td style={styles.tableCell}>
                                  <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                      onClick={() =>
                                        handleEditCategory(category)
                                      }
                                      style={styles.editBtn}
                                    >
                                      ✏️ Өңдеу
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            'Категорияны жоюға сенімдісіз бе?',
                                          )
                                        ) {
                                          onDeleteCategory(category.id);
                                        }
                                      }}
                                      style={styles.deleteBtn}
                                    >
                                      🗑️ Жою
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="3"
                                style={{
                                  ...styles.tableCell,
                                  textAlign: 'center',
                                  padding: '40px',
                                }}
                              >
                                <div style={styles.emptyState}>
                                  Категориялар жоқ
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Күтуде',
    processing: 'Өңделуде',
    shipped: 'Жөнелтілді',
    delivered: 'Жеткізілді',
    cancelled: 'Жойылды',
  };
  return statusMap[status] || status;
};

const getStatusStyle = (status) => {
  const statusStyles = {
    pending: { background: '#fff3cd', color: '#856404' },
    processing: { background: '#cfe2ff', color: '#084298' },
    shipped: { background: '#d1e7dd', color: '#0f5132' },
    delivered: { background: '#d1e7dd', color: '#0f5132' },
    cancelled: { background: '#f8d7da', color: '#842029' },
  };
  return statusStyles[status] || statusStyles.pending;
};

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '28px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  logoIcon: {
    fontSize: '32px',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  nav: {
    flex: 1,
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '14px 18px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '15px',
    fontWeight: '500',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    width: '100%',
    position: 'relative',
  },
  navButtonActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  navIcon: {
    fontSize: '20px',
  },
  navLabel: {
    flex: 1,
  },
  activeIndicator: {
    width: '4px',
    height: '24px',
    background: '#fff',
    borderRadius: '2px',
    position: 'absolute',
    right: '8px',
  },
  sidebarFooter: {
    padding: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '18px',
  },
  userName: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#fff',
  },
  userRole: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: '2px',
  },
  main: {
    flex: 1,
    marginLeft: '280px',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 40px',
    background: '#fff',
    borderBottom: '1px solid #e5e9f2',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a2e',
    margin: 0,
    letterSpacing: '-0.5px',
  },
  breadcrumb: {
    fontSize: '14px',
    color: '#8492a6',
    marginTop: '6px',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.35)',
    transition: 'all 0.3s ease',
  },
  addIcon: {
    fontSize: '20px',
    fontWeight: '300',
  },
  content: {
    padding: '32px 40px',
  },
  dashboardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  fullWidth: {
    width: '100%',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    border: '1px solid #e5e9f2',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 28px',
    borderBottom: '1px solid #f0f4f8',
    background: '#fafbfc',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a2e',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cardBody: {
    padding: '24px 28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitBtn: {
    padding: '14px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.35)',
    alignSelf: 'flex-start',
    marginTop: '10px',
  },
  viewAllBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  // Mobile-specific styles
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  sidebarMobile: {
    position: 'fixed',
    left: '-280px',
    zIndex: 999,
    transition: 'left 0.3s ease',
  },
  sidebarMobileOpen: {
    left: 0,
  },
  closeSidebarBtn: {
    marginLeft: 'auto',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#fff',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  mainMobile: {
    marginLeft: 0,
  },
  headerMobile: {
    padding: '16px 20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  hamburgerBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    color: '#fff',
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    fontSize: '22px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitleMobile: {
    fontSize: '20px',
  },
  addButtonMobile: {
    padding: '12px 16px',
    fontSize: '18px',
  },
  contentMobile: {
    padding: '16px',
  },
  cardHeaderMobile: {
    padding: '16px 20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
  cardTitleMobile: {
    fontSize: '16px',
  },
  cardBodyMobile: {
    padding: '16px',
  },
  statsGridMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ordersCardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  orderCard: {
    background: '#fafbfc',
    border: '1px solid #e5e9f2',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  orderCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    background: '#fff',
    borderBottom: '1px solid #e5e9f2',
  },
  orderCardId: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  orderCardBody: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  orderCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCardLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  orderCardValue: {
    fontSize: '13px',
    color: '#1a1a2e',
    fontWeight: '500',
    textAlign: 'right',
  },
  orderCardPrice: {
    fontSize: '15px',
    color: '#667eea',
    fontWeight: '700',
  },
  orderCardFooter: {
    padding: '12px 16px',
    background: '#fff',
    borderTop: '1px solid #e5e9f2',
  },
  statusSelect: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a2e',
    background: '#fff',
    cursor: 'pointer',
    outline: 'none',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#8492a6',
    fontSize: '14px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
    padding: '16px',
  },
  paginationBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: '1px solid #e5e9f2',
    background: '#fff',
    color: '#667eea',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  paginationBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  paginationInfo: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a2e',
    minWidth: '60px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderRow: {
    background: '#fafbfc',
    borderBottom: '2px solid #e5e9f2',
  },
  tableHeader: {
    padding: '14px 16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #e5e9f2',
    transition: 'background 0.2s ease',
  },
  tableCell: {
    padding: '14px 16px',
    fontSize: '14px',
    color: '#1a1a2e',
  },
  helpText: {
    fontSize: '12px',
    color: '#8492a6',
    marginTop: '4px',
  },
  imagePreviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  imagePreview: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid #e5e9f2',
  },
  cancelBtn: {
    padding: '14px 24px',
    background: '#f0f4f8',
    color: '#64748b',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  categoryCard: {
    background: '#fafbfc',
    border: '1px solid #e5e9f2',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  categoryCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  categoryImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #e5e9f2',
  },
  categoryTableImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #e5e9f2',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a2e',
  },
  categoryActions: {
    display: 'flex',
    gap: '8px',
  },
  editBtn: {
    flex: 1,
    padding: '10px 16px',
    background: '#fff',
    color: '#667eea',
    border: '1px solid #667eea',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  deleteBtn: {
    flex: 1,
    padding: '10px 16px',
    background: '#fff',
    color: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default AdminPanel;
