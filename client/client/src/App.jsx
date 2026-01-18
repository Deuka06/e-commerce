import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClientPanel from "./pages/ClientPanel";
import CourierInstructions from "./components/CourierInstructions";
import OrderHistory from "./components/OrderHistory";
import Payment from "./components/Payment";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import ProductModal from "./components/modals/ProductModal";
import OrderModal from "./components/modals/OrderModal";
import BasketModal from "./components/modals/BasketModal";
import AuthModal from "./components/modals/AuthModal";
import { initialProducts, initialOrders } from "./data/productData";
import "./styles/global.css";

function App() {
  const [currentPanel, setCurrentPanel] = useState("client");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showBasketModal, setShowBasketModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCourierPage, setShowCourierPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showOrderHistoryPage, setShowOrderHistoryPage] = useState(false);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCart([...cart, product]);
      showNotification("Тауар себетке қосылды!", "success");
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const addProduct = (newProduct) => {
    const product = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...newProduct,
    };
    setProducts([...products, product]);
    showNotification("Тауар сәтті қосылды!", "success");
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Бұл тауарды жойғыңыз келе ме?")) {
      setProducts(products.filter((p) => p.id !== productId));
      showNotification("Тауар жойылды!", "success");
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

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(4, "0")}`,
      customer: orderData.name,
      product: orderData.productName,
      date: new Date().toLocaleDateString("kk-KZ"),
      amount: orderData.amount,
      status: "pending",
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    showNotification("Тапсырыс сәтті берілді!", "success");
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setShowPaymentPage(false);
    setShowBasketModal(false);
    showNotification("Төлем сәтті аяқталды!", "success");
  };

  return (
    <div className="app">
      <Header
        onPanelChange={setCurrentPanel}
        cartCount={cart.length}
        onCartClick={() => setShowBasketModal(true)}
        onShowOrderHistory={() => setShowOrderHistoryPage(true)}
        onLoginClick={() => setShowAuthModal(true)}
      />
      {showOrderHistoryPage ? (
        <OrderHistory
          orders={orders}
          onClose={() => setShowOrderHistoryPage(false)}
        />
      ) : showPaymentPage ? (
        <Payment
          cartItems={cart}
          onClose={() => setShowPaymentPage(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      ) : showCourierPage ? (
        <CourierInstructions onClose={() => setShowCourierPage(false)} />
      ) : (
        <>
          <Hero onShowCourier={setShowCourierPage} />
          <ClientPanel
            products={products}
            onAddToCart={addToCart}
            onOrderClick={(id) => {
              setSelectedProductId(id);
              setShowOrderModal(true);
            }}
          />
        </>
      )}

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSubmit={addProduct}
      />

      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={placeOrder}
        selectedProductId={selectedProductId}
        products={products}
      />

      <BasketModal
        isOpen={showBasketModal}
        onClose={() => setShowBasketModal(false)}
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setShowBasketModal(false);
          setShowPaymentPage(true);
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="bottom-navbar">
        <button
          className="bottom-nav-item"
          onClick={() => setCurrentPanel("client")}
          title="Басты бет">
          <i className="fas fa-home"></i>
          <span>Басты бет</span>
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => setShowOrderHistoryPage(true)}
          title="Тапсырыстар">
          <i className="fas fa-history"></i>
          <span>Тапсырыстар</span>
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => setShowBasketModal(true)}
          title="Себет">
          <i className="fas fa-shopping-cart"></i>
          <span>Себет ({cart.length})</span>
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => setShowCourierPage(true)}
          title="Курьер">
          <i className="fas fa-truck"></i>
          <span>Курьер</span>
        </button>
      </nav>

      <Footer />

      <style>{`
        .bottom-navbar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.08);
          padding-bottom: env(safe-area-inset-bottom);
          z-index: 100;
        }

        .bottom-navbar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 70px;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: var(--gray);
          transition: var(--transition);
          flex: 1;
          height: 100%;
          font-size: 0.75rem;
          font-family: var(--font-body);
          font-weight: 500;
        }

        .bottom-nav-item i {
          font-size: 1.3rem;
          margin-bottom: 0.4rem;
          transition: var(--transition);
        }

        .bottom-nav-item:hover {
          color: var(--primary);
          background: rgba(52, 152, 219, 0.05);
        }

        .bottom-nav-item:active {
          color: var(--primary-dark);
        }

        @media (max-width: 768px) {
          .bottom-navbar {
            display: flex;
          }

          body {
            padding-bottom: 70px;
          }

          .app {
            padding-bottom: 70px;
          }
        }

        @media (max-width: 480px) {
          .bottom-navbar {
            height: 60px;
          }

          .bottom-nav-item {
            font-size: 0.65rem;
            padding: 0.3rem;
          }

          .bottom-nav-item i {
            font-size: 1.2rem;
            margin-bottom: 0.2rem;
          }

          .bottom-nav-item span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
        }

        @media (min-width: 769px) {
          .bottom-navbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
