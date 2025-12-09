import React, { useState } from "react";

function Header({ onPanelChange, cartCount, onCartClick, onShowOrderHistory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    onPanelChange(target);
    setMobileMenuOpen(false);
  };

  const handleOrderHistoryClick = (e) => {
    e.preventDefault();
    onShowOrderHistory?.();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-gem"></i>
            <span>StyleShop</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <li>
                <a href="#" onClick={(e) => handleNavClick(e, "client")}>
                  <i className="fas fa-home"></i> Басты бет
                </a>
              </li>
              <li>
                <a href="#" onClick={handleOrderHistoryClick}>
                  <i className="fas fa-history"></i> Тапсырыстар
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-phone"></i> Байланыс
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
            <button className="secondary" onClick={onCartClick}>
              <i className="fas fa-shopping-cart"></i>
              <span>Себет ({cartCount})</span>
            </button>
            <button>
              <i className="fas fa-user"></i>
              <span>Кіру</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <ul>
              <li>
                <a href="#" onClick={(e) => handleNavClick(e, "client")}>
                  <i className="fas fa-home"></i> Басты бет
                </a>
              </li>
              <li>
                <a href="#" onClick={handleOrderHistoryClick}>
                  <i className="fas fa-history"></i> Тапсырыстар
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-phone"></i> Байланыс
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
            display: block;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-nav {
            display: block;
          }

          .user-actions {
            gap: 0.5rem;
          }

          .user-actions button {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .user-actions button span {
            display: none;
          }

          .user-actions button i {
            margin: 0;
          }

          .header-content {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .user-actions button.secondary span {
            display: inline;
          }

          .user-actions button i {
            margin-right: 0.25rem;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
