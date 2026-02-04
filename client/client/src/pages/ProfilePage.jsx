import React, { useState } from 'react';

function ProfilePage({ user, onLogout, onBack }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeSection, setActiveSection] = useState(
    isMobile ? 'menu' : 'account',
  );

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Reset to appropriate default when switching between mobile/desktop
      if (
        mobile &&
        activeSection !== 'menu' &&
        !['dashboard', 'orders', 'addresses', 'wallet', 'account'].includes(
          activeSection,
        )
      ) {
        setActiveSection('menu');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  const menuItems = [
    {
      id: 'account',
      label: 'Настройки профиля',
      icon: 'fas fa-user-cog',
      color: '#6c63ff',
      bgColor: 'white',
    },
    {
      id: 'orders',
      label: 'Мои заказы',
      icon: 'fas fa-shopping-bag',
      color: '#ff6584',
      bgColor: 'white',
    },
  ];

  // Mobile version
  if (isMobile) {
    // Show menu
    if (activeSection === 'menu') {
      return (
        <div
          style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            padding: '1.5rem',
          }}
        >
          {/* Header with gradient */}
          <div
            style={{
              paddingTop: '1.5rem',
              background: '#ffffff',
              backdropFilter: 'blur(10px)',
              padding: '1.5rem 1.5rem',
              borderRadius: '20px 20px 20px 20px',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                }}
              >
                <i
                  className="fas fa-user"
                  style={{ fontSize: '1.8rem', color: '#667eea' }}
                ></i>
              </div>
              <div>
                <h2
                  style={{
                    fontSize: '1.3rem',
                    color: '#000',
                    marginBottom: '0.3rem',
                    fontWeight: '700',
                  }}
                >
                  {user?.name || 'Талгат Арман'}
                </h2>
                <p
                  style={{
                    color: '#000',
                    fontSize: '0.9rem',
                  }}
                >
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div style={{ padding: '0 1rem 2rem 1rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '1.5rem 1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.8rem',
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    style={{
                      width: '55px',
                      height: '55px',
                      borderRadius: '15px',
                      background: item.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{ fontSize: '1.5rem', color: item.color }}
                    ></i>
                  </div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: '#333',
                      fontWeight: '600',
                      textAlign: 'center',
                      lineHeight: '1.3',
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              style={{
                width: '100%',
                background: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '1.2rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                color: '#e74c3c',
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              <i
                className="fas fa-sign-out-alt"
                style={{ fontSize: '1.2rem' }}
              ></i>
              <span>Выйти из аккаунта</span>
            </button>
          </div>
        </div>
      );
    }

    // Show content page
    const currentItem = menuItems.find((item) => item.id === activeSection);
    return (
      <div
        style={{
          background: '#f5f7fa',
          minHeight: '100vh',
          paddingBottom: '2rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#3498db',
            padding: '1.2rem 1rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setActiveSection('menu')}
              style={{
                background: 'white',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '12px',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#3498db;',
                fontSize: '1.2rem',
              }}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: '1.2rem',
                  color: '#3498db',
                  margin: 0,
                  fontWeight: '700',
                }}
              >
                {currentItem?.label || 'Профиль'}
              </h2>
            </div>
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                background: currentItem?.bgColor || '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i
                className={currentItem?.icon || 'fas fa-user'}
                style={{
                  fontSize: '1.1rem',
                  color: currentItem?.color || '#666',
                }}
              ></i>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem 1rem' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
            }}
          >
            {activeSection === 'dashboard' && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#333',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                    }}
                  >
                    Добро пожаловать,{' '}
                    <strong>{user?.name || 'Талгат Арман'}</strong> (не{' '}
                    <strong>{user?.name || 'Талгат Арман'}</strong>?{' '}
                    <button
                      onClick={onLogout}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      Выйти
                    </button>
                    )
                  </p>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      lineHeight: '1.6',
                    }}
                  >
                    Из главной страницы аккаунта вы можете посмотреть ваши
                    недавние заказы, настроить платежный адрес и адрес доставки,
                    а также изменить пароль и основную информацию.
                  </p>
                </div>
              </>
            )}

            {activeSection === 'orders' && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <i
                  className="fas fa-shopping-bag"
                  style={{
                    fontSize: '4rem',
                    color: '#e0e0e0',
                    marginBottom: '1rem',
                    display: 'block',
                  }}
                ></i>
                <p style={{ color: '#999', fontSize: '1rem' }}>
                  У вас пока нет заказов
                </p>
              </div>
            )}

            {activeSection === 'downloads' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Загрузки
                </h2>
                <p style={{ color: '#666' }}>Нет доступных загрузок.</p>
              </div>
            )}

            {activeSection === 'addresses' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Адреса
                </h2>
                <p style={{ color: '#666' }}>Адреса не указаны.</p>
              </div>
            )}

            {activeSection === 'wallet' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Мой кошелёк
                </h2>
                <p style={{ color: '#666' }}>Баланс: 0 ₸</p>
              </div>
            )}

            {activeSection === 'account' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Детали учётной записи
                </h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - existing code
  return (
    <div
      style={{
        background: '#e5e5e5',
        minHeight: '100vh',
        padding: '2rem 0',
      }}
    >
      {/* Breadcrumb */}
      <div className="container" style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#666',
          }}
        >
          <i className="fas fa-home"></i>
          <span>/</span>
          <span>Мой аккаунт</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="container" style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            color: '#333',
            fontWeight: '400',
            margin: 0,
          }}
        >
          Мой аккаунт
        </h1>
      </div>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
          className="profile-grid"
        >
          {/* Sidebar */}
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* User Avatar & Name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <i
                  className="fas fa-user"
                  style={{ fontSize: '1.5rem', color: '#666' }}
                ></i>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    color: '#333',
                    marginBottom: '0.25rem',
                    fontWeight: '600',
                  }}
                >
                  {user?.name || 'Талгат Арман'}
                </h3>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background:
                      activeSection === item.id ? '#f5f5f5' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#333',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    marginBottom: '0.5rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.background = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.background = 'transparent';
                    }
                  }}
                >
                  <i
                    className={item.icon}
                    style={{ width: '20px', color: '#999' }}
                  ></i>
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={onLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#333',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  marginTop: '0.5rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f9f9f9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <i
                  className="fas fa-sign-out-alt"
                  style={{ width: '20px', color: '#999' }}
                ></i>
                <span>Выход</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {activeSection === 'dashboard' && (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#333',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                    }}
                  >
                    Добро пожаловать,{' '}
                    <strong>{user?.name || 'Талгат Арман'}</strong> (не{' '}
                    <strong>{user?.name || 'Талгат Арман'}</strong>?{' '}
                    <button
                      onClick={onLogout}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      Выйти
                    </button>
                    )
                  </p>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      lineHeight: '1.6',
                    }}
                  >
                    Из главной страницы аккаунта вы можете посмотреть ваши
                    недавние заказы, настроить платежный адрес и адрес доставки,
                    а также изменить пароль и основную информацию.
                  </p>
                </div>
              </>
            )}

            {activeSection === 'orders' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Заказы
                </h2>
                <p style={{ color: '#666' }}>У вас пока нет заказов.</p>
              </div>
            )}

            {activeSection === 'downloads' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Загрузки
                </h2>
                <p style={{ color: '#666' }}>Нет доступных загрузок.</p>
              </div>
            )}

            {activeSection === 'addresses' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Адреса
                </h2>
                <p style={{ color: '#666' }}>Адреса не указаны.</p>
              </div>
            )}

            {activeSection === 'wallet' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Мой кошелёк
                </h2>
                <p style={{ color: '#666' }}>Баланс: 0 ₸</p>
              </div>
            )}

            {activeSection === 'account' && (
              <div>
                <h2
                  style={{
                    fontSize: '1.5rem',
                    color: '#333',
                    marginBottom: '1.5rem',
                  }}
                >
                  Детали учётной записи
                </h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#333',
                        fontWeight: '500',
                        fontSize: '0.9rem',
                      }}
                    >
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={user?.phone || ''}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '1rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem !important;
          }

          h2 {
            font-size: 1.3rem !important;
          }

          div[style*="padding: 2rem"] {
            padding: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="padding: 1.5rem"] {
            padding: 1rem !important;
          }

          h1 {
            font-size: 1.5rem !important;
          }

          h2 {
            font-size: 1.1rem !important;
          }

          button {
            font-size: 16px !important;
          }

          input {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProfilePage;
