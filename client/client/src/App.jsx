import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken, logout } from "./store/authSlice";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ClientPanel from "./pages/ClientPanel";
import CourierInstructions from "./components/CourierInstructions";
import Payment from "./components/Payment";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import ProductModal from "./components/modals/ProductModal";
import OrderModal from "./components/modals/OrderModal";
import BasketModal from "./components/modals/BasketModal";
import AuthModal from "./components/modals/AuthModal";
import { fetchProductsByCategory } from "./store/productSlice";
import { initialProducts, initialOrders } from "./data/productData";
import "./styles/global.css";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'cart', 'courier', 'profile', 'payment'
  const [products, setProducts] = useState(initialProducts);
  const { itemProducts } = useSelector((state) => state.products);
  const [orders, setOrders] = useState(initialOrders);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showPaymentPage, setShowPaymentPage] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByCategory());
    // Проверяем токен при загрузке приложения
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  // Переход на страницу профиля после успешной авторизации
  useEffect(() => {
    if (isAuthenticated && showAuthModal) {
      setShowAuthModal(false);
      setCurrentPage("profile");
      showNotification("Сәтті кірдіңіз!", "success");
    }
  }, [isAuthenticated, showAuthModal]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (productId) => {
    // Redux-тағы таңдалған категорияның тауарлары ішінен іздейміз
    const product = itemProducts.find((p) => p.id === productId);

    if (product) {
      const existingItemIndex = cart.findIndex((item) => item.id === productId);

      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: (updatedCart[existingItemIndex].quantity || 1) + 1,
        };
        setCart(updatedCart);
      } else {
        // Серверден келген тауардың барлық деректерін (аты, бағасы, суреті) себетке сақтаймыз
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      showNotification("Тауар себетке қосылды!", "success");
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, change) => {
    const updatedCart = [...cart];
    const newQuantity = (updatedCart[index].quantity || 1) + change;

    if (newQuantity <= 0) {
      setCart(cart.filter((_, i) => i !== index));
      showNotification("Тауар себеттен алынды", "success");
    } else {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newQuantity,
      };
      setCart(updatedCart);
    }
  };

  const addProduct = (newProduct) => {
    const product = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...newProduct,
    };
    setProducts([...products, product]);
    showNotification("Тауар сәтті қосылды!", "success");
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
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showNotification("Төлем сәтті аяқталды!", "success");
  };

  const handleLogout = () => {
    dispatch(logout());
    setCurrentPage("home");
    showNotification("Сіз шықтыңыз", "success");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setCurrentPage("profile");
    } else {
      setShowAuthModal(true);
    }
  };

  // Render current page content
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <>
            <Hero onShowCourier={() => setCurrentPage("courier")} />
            <ClientPanel
              products={itemProducts}
              onAddToCart={addToCart}
              onOrderClick={(id) => {
                setSelectedProductId(id);
                setShowOrderModal(true);
              }}
            />
          </>
        );
      case "cart":
        return (
          <BasketModal
            isOpen={true}
            onClose={() => setCurrentPage("home")}
            cartItems={cart}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={() => setCurrentPage("payment")}
          />
        );
      case "courier":
        return <CourierInstructions onClose={() => setCurrentPage("home")} />;
      case "payment":
        return (
          <Payment
            cartItems={cart}
            onClose={() => setCurrentPage("home")}
            onPaymentSuccess={handlePaymentSuccess}
            showNavBar={true}
          />
        );
      case "profile":
        if (isAuthenticated) {
          return (
            <ProfilePage
              user={user}
              onLogout={handleLogout}
              onBack={() => setCurrentPage("home")}
            />
          );
        } else {
          setShowAuthModal(true);
          setCurrentPage("home");
          return null;
        }
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        onCartClick={() => setCurrentPage("cart")}
        onLoginClick={handleProfileClick}
        onHomeClick={() => setCurrentPage("home")}
        isAuthenticated={isAuthenticated}
        user={user}
        onProfileClick={handleProfileClick}
      />

      {renderPage()}

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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
        }}
      />

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="bottom-navbar">
        <button
          className={`bottom-nav-item ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}
          title="Басты бет">
          <i className="fas fa-home"></i>
          <span>Басты бет</span>
        </button>
        <button
          className={`bottom-nav-item ${currentPage === "cart" ? "active" : ""}`}
          onClick={() => setCurrentPage("cart")}
          title="Себет">
          <i className="fas fa-shopping-cart"></i>
          <span>Себет</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
        <button
          className={`bottom-nav-item ${currentPage === "courier" ? "active" : ""}`}
          onClick={() => setCurrentPage("courier")}
          title="Курьер">
          <i className="fas fa-truck"></i>
          <span>Курьер</span>
        </button>
        <button
          className={`bottom-nav-item ${currentPage === "profile" ? "active" : ""}`}
          onClick={handleProfileClick}
          title={isAuthenticated ? "Профиль" : "Кіру"}>
          <i className="fas fa-user"></i>
          <span>{isAuthenticated ? "Профиль" : "Кіру"}</span>
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
          z-index: 1000;
          -webkit-text-size-adjust: 100%;
          touch-action: manipulation;
          height: 70px;
        }

        .bottom-nav-item {
          position: relative;
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
          font-size: 16px;
          font-family: var(--font-body);
          font-weight: 500;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .bottom-nav-item.active {
          color: var(--primary);
          background: rgba(108, 99, 255, 0.05);
        }

        .bottom-nav-item i {
          font-size: 1.3rem;
          margin-bottom: 0.4rem;
          transition: var(--transition);
        }

        .bottom-nav-item:hover {
          color: var(--primary);
          background: rgba(108, 99, 255, 0.05);
        }

        .bottom-nav-item:active {
          color: var(--primary-dark);
        }

        .cart-badge {
          position: absolute;
          top: 0.5rem;
          right: 50%;
          transform: translateX(1rem);
          background: var(--secondary);
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .bottom-navbar {
            display: flex !important;
            justify-content: space-around;
            align-items: center;
          }

          .app {
            padding-bottom: 70px !important;
          }
        }

        @media (max-width: 480px) {
          .bottom-navbar {
            height: 70px !important;
          }

          .bottom-nav-item {
            font-size: 16px !important;
            padding: 0.3rem !important;
          }

          .bottom-nav-item i {
            font-size: 1.2rem !important;
            margin-bottom: 0.2rem !important;
          }

          .bottom-nav-item span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            font-size: 0.65rem !important;
          }

          .cart-badge {
            width: 16px !important;
            height: 16px !important;
            font-size: 0.6rem !important;
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
