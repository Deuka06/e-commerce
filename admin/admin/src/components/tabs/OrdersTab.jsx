import React, { useState } from "react";
import OrdersTable from "../tables/OrdersTable";
import OrderStatusModal from "../modals/OrderStatusModal";
import { styles } from "../../styles/adminPanelStyles";
import { getStatusText, getStatusStyle } from "../../utils/statusHelpers";
import OrderDetailsModal from "../modals/OrderDetailsModal";

function OrdersTab({ orders, onUpdateOrderStatus, isMobile }) {
  const [ordersPage, setOrdersPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const ordersPerPage = 6;

  const indexOfLastOrder = ordersPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setOrdersPage(pageNumber);
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
    <div style={styles.card}>
      <div
        style={{
          ...styles.cardHeader,
          ...(isMobile ? styles.cardHeaderMobile : {}),
        }}>
        <h3
          style={{
            ...styles.cardTitle,
            ...(isMobile ? styles.cardTitleMobile : {}),
          }}>
          🛒 Все заказы ({orders?.length || 0})
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}>
        {isMobile ? (
          <div style={styles.ordersCardsContainer}>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <div key={order.id} style={styles.orderCard}>
                  <div style={styles.orderCardHeader}>
                    <div style={styles.orderCardId}>Заказы #{order.id}</div>
                    <div
                      style={{
                        ...styles.statusBadge,
                        ...getStatusStyle(order.status),
                      }}>
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
                      <span style={styles.orderCardLabel}>Телефон номер:</span>
                      <span style={styles.orderCardValue}>
                        {order.phoneNumber}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Сумма:</span>
                      <span style={styles.orderCardPrice}>
                        {order.totalAmount?.toLocaleString()} ₸
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Товары:</span>
                      <span style={styles.orderCardValue}>
                        {order.items?.length || 0}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Дата:</span>
                      <span style={styles.orderCardValue}>
                        {new Date(
                          order.createdAt || Date.now(),
                        ).toLocaleDateString("kk-KZ")}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.orderCardFooter,
                      gap: "8px",
                      display: "flex",
                    }}>
                    <button
                      onClick={() => handleOpenModal(order)}
                      style={{
                        ...styles.statusSelect,
                        cursor: "pointer",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontWeight: "500",
                      }}>
                      Изменить статус
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsDetailsModalOpen(true); // Жаңа күй (state)
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#10b981", // Жасыл түс
                        color: "#fff",
                        border: "none",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        fontWeight: "500",
                        flex: 1,
                      }}>
                      Детали
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>Нет заказов</div>
            )}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(ordersPage === 1 ? styles.paginationBtnDisabled : {}),
                  }}
                  onClick={() => handlePageChange(ordersPage - 1)}
                  disabled={ordersPage === 1}>
                  ←
                </button>
                <span style={styles.paginationInfo}>
                  {ordersPage} / {totalPages}
                </span>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(ordersPage === totalPages
                      ? styles.paginationBtnDisabled
                      : {}),
                  }}
                  onClick={() => handlePageChange(ordersPage + 1)}
                  disabled={ordersPage === totalPages}>
                  →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <OrdersTable
              orders={orders || []}
              onUpdateStatus={onUpdateOrderStatus}
              onOpenModal={handleOpenModal}
            />
          </div>
        )}
      </div>
      <OrderStatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        order={selectedOrder}
        onUpdateStatus={onUpdateOrderStatus}
      />
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}

export default OrdersTab;
