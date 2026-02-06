import React, { useState, useEffect } from "react";
import AdminPanel from "./pages/AdminPanel";
import { initialProducts, initialOrders } from "./data/productData";
import "./styles/global.css";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [notification, setNotification] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Бұл тауарды жойғыңыз келе ме?")) {
      setProducts(products.filter((p) => p.id !== productId));
      showNotification("Тауар жойылды!", "success");
    }
  };

  const editProduct = (productId) => {
    if (window.confirm("Бұл тауарды өңдеуге сенімдісіз бе?")) {
      setProducts(products.filter((p) => p.id !== productId));
      showNotification("Тауар өңделді!", "success");
    }
  };

  const updateOrderStatus = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const statusMap = {
          pending: "shipped",
          shipped: "completed",
          completed: "pending",
        };
        return { ...order, status: statusMap[order.status] };
      }
      return order;
    });
    setOrders(updatedOrders);
    showNotification("Тапсырыс статусы өзгертілді!", "success");
  };

  return (
    <div className="app">
      <AdminPanel
        products={products}
        orders={orders}
        onAddProduct={() => setShowProductModal(true)}
        onDeleteProduct={deleteProduct}
        onEditProduct={editProduct}
        onUpdateOrderStatus={updateOrderStatus}
      />
    </div>
  );
}

export default App;
