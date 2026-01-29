import React, { useState } from "react";
import OrdersTable from "../tables/OrdersTable";
import { styles } from "../../styles/adminPanelStyles";
import { getStatusText, getStatusStyle } from "../../utils/statusHelpers";

function OrdersTab({ orders, onUpdateOrderStatus, isMobile }) {
  const [ordersPage, setOrdersPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = ordersPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setOrdersPage(pageNumber);
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
          🛒 Барлық тапсырыстар ({orders?.length || 0})
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
                    <div style={styles.orderCardId}>Тапсырыс #{order.id}</div>
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
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Күні:</span>
                      <span style={styles.orderCardValue}>
                        {new Date(
                          order.createdAt || Date.now(),
                        ).toLocaleDateString("kk-KZ")}
                      </span>
                    </div>
                  </div>
                  <div style={styles.orderCardFooter}>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onUpdateOrderStatus(order.id, e.target.value)
                      }
                      style={styles.statusSelect}>
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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersTab;
