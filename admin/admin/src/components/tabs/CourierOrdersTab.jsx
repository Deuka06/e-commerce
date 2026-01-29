import React, { useState } from "react";
import { styles } from "../../styles/adminPanelStyles";
import { getStatusText, getStatusStyle } from "../../utils/statusHelpers";

function CourierOrdersTab({
  courierOrders,
  onUpdateCourierOrderStatus,
  isMobile,
}) {
  const [courierOrdersPage, setCourierOrdersPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = courierOrdersPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders =
    courierOrders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((courierOrders?.length || 0) / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCourierOrdersPage(pageNumber);
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
          🚚 Курьерлік тапсырыстар ({courierOrders?.length || 0})
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
                    <div style={styles.orderCardId}>Курьер #{order.id}</div>
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
                      <span style={styles.orderCardLabel}>Телефон:</span>
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
                        ).toLocaleDateString("kk-KZ")}
                      </span>
                    </div>
                  </div>
                  <div style={styles.orderCardFooter}>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onUpdateCourierOrderStatus(order.id, e.target.value)
                      }
                      style={styles.statusSelect}>
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
              <div style={styles.emptyState}>Курьерлік тапсырыстар жоқ</div>
            )}
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(courierOrdersPage === 1
                      ? styles.paginationBtnDisabled
                      : {}),
                  }}
                  onClick={() => handlePageChange(courierOrdersPage - 1)}
                  disabled={courierOrdersPage === 1}>
                  ←
                </button>
                <span style={styles.paginationInfo}>
                  {courierOrdersPage} / {totalPages}
                </span>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(courierOrdersPage === totalPages
                      ? styles.paginationBtnDisabled
                      : {}),
                  }}
                  onClick={() => handlePageChange(courierOrdersPage + 1)}
                  disabled={courierOrdersPage === totalPages}>
                  →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
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
                {currentOrders.map((order) => (
                  <tr key={order.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>#{order.id}</td>
                    <td style={styles.tableCell}>{order.customerName}</td>
                    <td style={styles.tableCell}>{order.customerPhone}</td>
                    <td style={styles.tableCell}>{order.pickupAddress}</td>
                    <td style={styles.tableCell}>{order.deliveryAddress}</td>
                    <td style={styles.tableCell}>
                      {order.price?.toLocaleString()} ₸
                    </td>
                    <td style={styles.tableCell}>
                      {new Date(
                        order.createdAt || Date.now(),
                      ).toLocaleDateString("kk-KZ")}
                    </td>
                    <td style={styles.tableCell}>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateCourierOrderStatus(order.id, e.target.value)
                        }
                        style={styles.statusSelect}>
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
            {totalPages > 1 && (
              <div style={styles.pagination}>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(courierOrdersPage === 1
                      ? styles.paginationBtnDisabled
                      : {}),
                  }}
                  onClick={() => handlePageChange(courierOrdersPage - 1)}
                  disabled={courierOrdersPage === 1}>
                  ←
                </button>
                <span style={styles.paginationInfo}>
                  {courierOrdersPage} / {totalPages}
                </span>
                <button
                  style={{
                    ...styles.paginationBtn,
                    ...(courierOrdersPage === totalPages
                      ? styles.paginationBtnDisabled
                      : {}),
                  }}
                  onClick={() => handlePageChange(courierOrdersPage + 1)}
                  disabled={courierOrdersPage === totalPages}>
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourierOrdersTab;
