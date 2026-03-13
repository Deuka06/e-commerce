import React, { useState } from "react";

function Header({
  cartCount,
  onCartClick,
  onLoginClick,
  onHomeClick,
  isAuthenticated,
  user,
  onProfileClick, // Добавьте новый prop
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      onCartClick(); // Егер кірген болса, себетті ашамыз
    } else {
      alert("Себетті көру үшін алдымен жүйеге кіріңіз!"); // Немесе Notification қолдануға болады
      onLoginClick(); // Авторизация терезесін ашамыз
    }
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div
            className="logo"
            onClick={onHomeClick}
            style={{ cursor: "pointer" }}>
            <i className="fas fa-gem"></i>
            <span>Qamkor</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onHomeClick();
                  }}>
                  <i className="fas fa-home"></i> Главная
                </a>
              </li>
              <li>
                <a href="#footer" onClick={handleContactClick}>
                  <i className="fas fa-phone"></i> Контакты
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>

          <div className="user-actions">
            <button className="secondary" onClick={handleCartClick}>
              <i className="fas fa-shopping-cart"></i>
              <span>Корзина ({cartCount})</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={isAuthenticated ? onProfileClick : onLoginClick}>
              <i
                className={`fas ${isAuthenticated ? "fa-user-circle" : "fa-sign-in-alt"}`}></i>
              <span>{isAuthenticated ? user?.name || "Профиль" : "Вход"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onHomeClick();
                    closeMobileMenu();
                  }}>
                  <i className="fas fa-home"></i> Главная
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  onClick={(e) => {
                    handleContactClick(e);
                    closeMobileMenu();
                  }}>
                  <i className="fas fa-phone"></i> Контакты
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <style>{`
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: var(--transition);
        }

        .mobile-menu-toggle:hover {
          opacity: 0.7;
        }

        .desktop-nav {
          display: flex;
        }

        .mobile-nav {
          display: none;
          background: var(--dark);
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 1rem;
        }

        .mobile-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav ul li {
          margin: 0;
          padding: 0;
        }

        .mobile-nav ul li a {
          display: block;
          padding: 1rem 1.5rem;
          color: white;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: var(--transition);
        }

        .mobile-nav ul li a:hover {
          background: rgba(108, 99, 255, 0.2);
          padding-left: 2rem;
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: none;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-nav {
            display: none;
          }

          .user-actions {
            display: none;
          }

          .header-content {
            flex-wrap: nowrap;
            justify-content: center;
          }

          .logo {
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
