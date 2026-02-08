import React from 'react';
import StatsGrid from '../dashboard/StatsGrid';
import OrdersTable from '../tables/OrdersTable';
import OrderStatusModal from '../modals/OrderStatusModal';
import { styles } from '../../styles/adminPanelStyles';
import { getStatusText, getStatusStyle } from '../../utils/statusHelpers';

function DashboardTab({ orders, onUpdateOrderStatus, isMobile }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
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
                          <span style={styles.orderCardLabel}>Тауарлар:</span>
                          <span style={styles.orderCardValue}>
                            {order.items?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div style={styles.orderCardFooter}>
                        <button
                          onClick={() => handleOpenModal(order)}
                          style={{
                            ...styles.statusSelect,
                            cursor: 'pointer',
                            backgroundColor: '#3b82f6',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            fontWeight: '500',
                          }}
                        >
                          Статусты өзгерту
                        </button>
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
                  onOpenModal={handleOpenModal}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <OrderStatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        onUpdateStatus={onUpdateOrderStatus}
      />
    </div>
  );
}

export default DashboardTab;
