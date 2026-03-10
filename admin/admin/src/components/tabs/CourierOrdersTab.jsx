import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourierOrders } from "../../store/courierSlice";
import { styles } from "../../styles/adminPanelStyles";
import { getStatusText, getStatusStyle } from "../../utils/statusHelpers";

function CourierOrdersTab({
  courierOrders,
  onUpdateCourierOrderStatus,
  isMobile,
}) {
  const dispatch = useDispatch();
  const { orders, status, pagination } = useSelector((state) => state.courier);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  useEffect(() => {
    dispatch(fetchCourierOrders({ page: currentPage, limit: ordersPerPage }));
  }, [dispatch, currentPage]);

  const handleStatusChange = (orderId, newStatus) => {
    // Статусты жаңарту (серверге POST/PUT сұраныс жіберу)
    dispatch(updateCourierStatus({ orderId, status: newStatus }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages =
    pagination?.totalPages || Math.ceil((orders?.length || 0) / ordersPerPage);

  if (status === "loading" && orders.length === 0) {
    return <div style={styles.emptyState}>Загрузка...</div>;
  }

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
          🚚 Курьерские заказы ({pagination?.totalItems || orders?.length || 0})
        </h3>
      </div>

      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}>
        {isMobile ? (
          <div style={styles.ordersCardsContainer}>
            {orders.length > 0 ? (
              orders.map((order) => (
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
                        {order.fullName}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Телефон:</span>
                      <span style={styles.orderCardValue}>
                        {order.phoneNumber}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Откуда:</span>
                      <span style={styles.orderCardValue}>{order.address}</span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Куда:</span>
                      <span style={styles.orderCardValue}>
                        {order.institution}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Кому:</span>
                      <span style={styles.orderCardValue}>
                        {order.deliveryTo}
                      </span>
                    </div>
                    <div style={styles.orderCardRow}>
                      <span style={styles.orderCardLabel}>Описание:</span>
                      <span style={styles.orderCardValue}>
                        {order.description}
                      </span>
                    </div>
                    {/* ... (басқа өрістер өзгеріссіз) ... */}
                  </div>
                  <div style={styles.orderCardFooter}>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      style={styles.statusSelect}>
                      <option value="pending">В ожидании</option>
                      <option value="processing">В процессе</option>
                      <option value="completed">Завершен</option>
                      <option value="cancelled">Отклонен</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>Заказов нет</div>
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
                  <th style={styles.tableHeader}>Откуда (Адрес)</th>
                  <th style={styles.tableHeader}>Куда (Учреждение)</th>
                  <th style={styles.tableHeader}>Кому</th>
                  <th style={styles.tableHeader}>Дата</th>
                  <th style={styles.tableHeader}>Описание</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>#{order.id}</td>
                    <td style={styles.tableCell}>{order.fullName}</td>
                    <td style={styles.tableCell}>{order.phoneNumber}</td>
                    <td style={styles.tableCell}>{order.address}</td>
                    <td style={styles.tableCell}>{order.institution}</td>
                    <td style={styles.tableCell}>{order.deliveryTo}</td>
                    <td style={styles.tableCell}>
                      {new Date(order.createdAt).toLocaleDateString("kk-KZ")}
                    </td>
                    <td style={styles.tableCell}>{order.description}</td>
                    {/* <td style={styles.tableCell}>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        style={styles.statusSelect}>
                        <option value="pending">Күтуде</option>
                        <option value="processing">Өңделуде</option>
                        <option value="completed">Аяқталды</option>
                        <option value="cancelled">Жойылды</option>
                      </select>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={{
                ...styles.paginationBtn,
                ...(currentPage === 1 ? styles.paginationBtnDisabled : {}),
              }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              {" "}
              ←{" "}
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
              disabled={currentPage === totalPages}>
              {" "}
              →{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourierOrdersTab;
