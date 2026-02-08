import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../store/ordersSlice";

function ProfilePage({ user, onLogout, onBack }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState(
    isMobile ? "menu" : "account",
  );

  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);

  // Экран өлшемін бақылау
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (
        mobile &&
        activeSection !== "menu" &&
        !["account", "orders"].includes(activeSection)
      ) {
        setActiveSection("menu");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  // Тапсырыстарды жүктеу
  useEffect(() => {
    const userId = user?.id || user?.userId;
    if (activeSection === "orders" && userId) {
      dispatch(fetchMyOrders(userId));
    }
  }, [activeSection, user, dispatch]);

  // Тапсырыстар мазмұнын шығаратын ішкі компонент
  const OrdersContent = () => {
    if (loading)
      return (
        <p style={{ textAlign: "center", padding: "20px" }}>Жүктелуде...</p>
      );
    if (error)
      return <p style={{ color: "red", textAlign: "center" }}>Қате: {error}</p>;

    if (!orders || orders.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <i
            className="fas fa-shopping-bag"
            style={{
              fontSize: "4rem",
              color: "#e0e0e0",
              marginBottom: "1rem",
              display: "block",
            }}></i>
          <p style={{ color: "#999" }}>Сізде әзірге тапсырыстар жоқ</p>
        </div>
      );
    }

    return (
      <div style={{ display: "grid", gap: "1rem" }}>
        {orders?.map((order) => (
          <div
            key={order.id}
            style={{
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "12px",
              background: "#fcfcfc",
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}>
              <span style={{ fontWeight: "bold" }}>№ {order.id}</span>
              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  background:
                    order.status === "completed" ? "#e1f7e1" : "#fff4e5",
                  color: order.status === "completed" ? "green" : "#ff9800",
                }}>
                {order.status}
              </span>
            </div>
            <div style={{ fontSize: "14px", color: "#555" }}>
              Сомасы: <strong>{order.totalAmount} ₸</strong>
            </div>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
              {order.items?.map((item) => item.name).join(", ")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const menuItems = [
    {
      id: "account",
      label: "Профиль параметрлері",
      icon: "fas fa-user-cog",
      color: "#6c63ff",
      bgColor: "#f0efff",
    },
    {
      id: "orders",
      label: "Менің тапсырыстарым",
      icon: "fas fa-shopping-bag",
      color: "#ff6584",
      bgColor: "#fff0f3",
    },
  ];

  // --- МОБИЛЬДІ НҰСҚА ---
  if (isMobile) {
    if (activeSection === "menu") {
      return (
        <div
          style={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            minHeight: "100vh",
            padding: "1.5rem",
          }}>
          <div
            style={{
              background: "#ffffff",
              padding: "1.5rem",
              borderRadius: "20px",
              marginBottom: "1.5rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#667eea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}>
                <i className="fas fa-user" style={{ fontSize: "1.5rem" }}></i>
              </div>
              <div>
                <h2 style={{ fontSize: "1.2rem", margin: 0 }}>
                  {user?.name || "Пайдаланушы"}
                </h2>
                <p style={{ color: "#666", fontSize: "0.9rem", margin: 0 }}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "1.5rem 1rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    background: item.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <i
                    className={item.icon}
                    style={{ fontSize: "1.4rem", color: item.color }}></i>
                </div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    textAlign: "center",
                  }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={onLogout}
            style={{
              width: "100%",
              background: "#fff",
              color: "#e74c3c",
              border: "none",
              padding: "1.2rem",
              borderRadius: "20px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}>
            Шығу
          </button>
        </div>
      );
    }

    const currentItem = menuItems.find((i) => i.id === activeSection);
    return (
      <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
        <div
          style={{
            background: "#3498db",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "white",
          }}>
          <button
            onClick={() => setActiveSection("menu")}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
            }}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 style={{ fontSize: "1.1rem", margin: 0 }}>
            {currentItem?.label}
          </h2>
        </div>
        <div style={{ padding: "1rem" }}>
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "1.5rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            }}>
            {activeSection === "orders" ? (
              <OrdersContent />
            ) : (
              <div>
                <p>
                  <strong>Аты:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- ДЕСКТОП НҰСҚА ---
  return (
    <div
      style={{ background: "#f0f2f5", minHeight: "100vh", padding: "2rem 0" }}>
      <div
        className="container"
        style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "2rem", fontWeight: "300" }}>
          Менің аккаунтым
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "2rem",
          }}>
          {/* Sidebar */}
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#eee",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <i className="fas fa-user fa-2x" style={{ color: "#ccc" }}></i>
              </div>
              <h3 style={{ margin: 0 }}>{user?.name}</h3>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "5px",
                  textAlign: "left",
                  border: "none",
                  borderRadius: "8px",
                  background:
                    activeSection === item.id ? "#3498db" : "transparent",
                  color: activeSection === item.id ? "white" : "#333",
                  cursor: "pointer",
                }}>
                <i
                  className={item.icon}
                  style={{ marginRight: "10px", width: "20px" }}></i>{" "}
                {item.label}
              </button>
            ))}
            <hr
              style={{
                margin: "1rem 0",
                border: "none",
                borderTop: "1px solid #eee",
              }}
            />
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                padding: "12px",
                textAlign: "left",
                border: "none",
                color: "#e74c3c",
                background: "none",
                cursor: "pointer",
              }}>
              <i
                className="fas fa-sign-out-alt"
                style={{ marginRight: "10px" }}></i>{" "}
              Шығу
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}>
            <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>
              {menuItems.find((i) => i.id === activeSection)?.label}
            </h2>
            {activeSection === "orders" ? (
              <OrdersContent />
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "#888" }}>
                    Толық аты-жөні
                  </label>{" "}
                  <input
                    type="text"
                    readOnly
                    value={user?.name}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#888" }}>
                    Электронды пошта
                  </label>{" "}
                  <input
                    type="text"
                    readOnly
                    value={user?.email}
                    style={inputStyle}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#f9f9f9",
};

export default ProfilePage;
