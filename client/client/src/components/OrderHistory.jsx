import React from "react";
import { formatPrice } from "../utils/helpers";

function OrderHistory({ orders, onClose }) {
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: {
        class: "status-pending",
        text: "Күтілуде",
        icon: "fas fa-clock",
      },
      shipped: {
        class: "status-shipped",
        text: "Жеткізілді",
        icon: "fas fa-truck",
      },
      completed: {
        class: "status-completed",
        text: "Аяқталды",
        icon: "fas fa-check-circle",
      },
    };
    return (
      statusMap[status] || { class: "", text: "", icon: "fas fa-info-circle" }
    );
  };

  // Filter only completed orders
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );

  return (
    <div
      style={{
        background: "var(--light)",
        minHeight: "100vh",
        padding: "2rem 0",
      }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={onClose}
            style={{
              background: "var(--primary)",
              color: "white",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "var(--transition)",
              fontSize: "1rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 7px 15px rgba(108, 99, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}>
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: "0.5rem" }}></i>
            Қайта оралу
          </button>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: "var(--dark)",
            }}>
            Аяқталған тапсырыстар
          </h1>

          {completedOrders.length === 0 ? (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "3rem",
                textAlign: "center",
                boxShadow: "var(--card-shadow)",
              }}>
              <i
                className="fas fa-inbox"
                style={{
                  fontSize: "3rem",
                  color: "var(--gray)",
                  marginBottom: "1rem",
                  display: "block",
                }}></i>
              <h2 style={{ color: "var(--dark)", marginBottom: "0.5rem" }}>
                Аяқталған тапсырыстар жоқ
              </h2>
              <p style={{ color: "var(--gray)" }}>
                Сізде әлі ешқандай аяқталған тапсырыс жоқ. Тауарларды табу үшін
                басты бетке оралыңыз.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "var(--card-shadow)",
                overflow: "hidden",
              }}>
              <div
                style={{
                  overflowX: "auto",
                }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                  }}>
                  <thead>
                    <tr
                      style={{
                        background: "var(--dark)",
                        color: "white",
                      }}>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Тапсырыс ID
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Клиент
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Тауар
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Күні
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Сома
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          textAlign: "left",
                          fontWeight: "600",
                        }}>
                        Статус
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.map((order, index) => {
                      const badge = getStatusBadge(order.status);
                      return (
                        <tr
                          key={order.id}
                          style={{
                            borderBottom: "1px solid #e0e0e0",
                            background: index % 2 === 0 ? "#f9f9f9" : "white",
                            transition: "var(--transition)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(108, 99, 255, 0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              index % 2 === 0 ? "#f9f9f9" : "white";
                          }}>
                          <td
                            style={{
                              padding: "1rem",
                              color: "var(--primary)",
                              fontWeight: "600",
                            }}>
                            {order.id}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              color: "var(--dark)",
                            }}>
                            {order.customer}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              color: "var(--dark)",
                            }}>
                            {order.product}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              color: "var(--gray)",
                            }}>
                            {order.date}
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                              fontWeight: "600",
                              color: "var(--primary)",
                            }}>
                            {formatPrice(order.amount)} ₸
                          </td>
                          <td
                            style={{
                              padding: "1rem",
                            }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                backgroundColor:
                                  badge.class === "status-pending"
                                    ? "rgba(243, 156, 18, 0.2)"
                                    : badge.class === "status-shipped"
                                    ? "rgba(52, 152, 219, 0.2)"
                                    : "rgba(46, 204, 113, 0.2)",
                                color:
                                  badge.class === "status-pending"
                                    ? "#f39c12"
                                    : badge.class === "status-shipped"
                                    ? "#3498db"
                                    : "var(--success)",
                              }}>
                              <i className={badge.icon}></i>
                              {badge.text}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {completedOrders.length > 0 && (
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "rgba(46, 204, 113, 0.1)",
                borderRadius: "12px",
                borderLeft: "4px solid var(--success)",
              }}>
              <h3
                style={{
                  color: "var(--dark)",
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                <i
                  className="fas fa-check-circle"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--success)",
                  }}></i>
                Барлығы: {completedOrders.length} аяқталған тапсырыс
              </h3>
              <p
                style={{
                  color: "var(--gray)",
                  margin: "0.5rem 0",
                }}>
                Аяқталған тапсырыстардың жалпы сомасы:{" "}
                <strong style={{ color: "var(--primary)" }}>
                  {formatPrice(
                    completedOrders.reduce(
                      (sum, order) => sum + order.amount,
                      0
                    )
                  )}{" "}
                  ₸
                </strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
