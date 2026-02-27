import React from 'react';
import { formatPrice } from '../utils/helpers';

function ProductCard({ product, onAddToCart, isAdmin, onDelete, onEdit }) {
  // Styles объектісі өзгеріссіз қалады, тек productImage бөлігіне background-size қосамыз
  const styles = {
    // ... басқа стильдер ...
    productCard: {
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    productImage: {
      width: '100%',
      height: '200px',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden', // Сурет шығып кетпеуі үшін
    },
    imgElement: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Суретті контейнерге әдемі сыйғызу
    },
    // ... қалған стильдер ...
    productInfo: { padding: '16px', display: 'flex', flexDirection: 'column' },
    productTitle: { fontSize: '18px', fontWeight: '600', color: '#333' },
    productPrice: {
      fontSize: '14px',
      fontWeight: '300',
      color: '#2c3e50',
      marginTop: '2px',
    },
    productActions: { display: 'flex', gap: '8px', marginTop: '12px' },
    btn: {
      flex: 1,
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    btnPrimary: { background: '#3498db', color: 'white' },
    btnSecondary: { background: '#e74c3c', color: 'white' },
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileStyles = isMobile
    ? {
        productImage: { ...styles.productImage, height: '180px' },
        // ...
      }
    : {};

  return (
    <div style={styles.productCard}>
      {/* СУРЕТ БӨЛІМІ */}
      <div style={mobileStyles.productImage || styles.productImage}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={styles.imgElement}
            onError={(e) => {
              // Егер сурет жүктелмей қалса, иконкаға ауыстыру
              e.target.onerror = null;
              e.target.parentElement.innerHTML =
                '<i class="fas fa-image" style="color: #ddd; font-size: 48px;"></i>';
            }}
          />
        ) : (
          <i
            className="fas fa-image"
            style={{ color: '#ddd', fontSize: isMobile ? '40px' : '48px' }}
          ></i>
        )}
      </div>

      <div style={mobileStyles.productInfo || styles.productInfo}>
        <div style={mobileStyles.productTitle || styles.productTitle}>
          {product.name}
        </div>
        <div style={mobileStyles.productPrice || styles.productPrice}>
          {formatPrice(product.price)} ₸
        </div>

        <div style={styles.productActions}>
          {isAdmin ? (
            <>
              <button
                onClick={() => onEdit(product)} // Өңдеу функциясын шақыру
                style={{
                  ...(mobileStyles.btn || styles.btn),
                  ...styles.btnPrimary,
                  marginRight: '10px',
                }}
              >
                <i className="fas fa-edit"></i>
                {!isMobile && <span>Изменить</span>}
              </button>
              <button
                style={{
                  ...(mobileStyles.btn || styles.btn),
                  ...styles.btnSecondary,
                }}
                onClick={() => onDelete(product.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </>
          ) : (
            <button
              style={{
                ...(mobileStyles.btn || styles.btn),
                ...styles.btnPrimary,
              }}
              onClick={() => onAddToCart(product.id)}
            >
              <i className="fas fa-shopping-cart"></i>
              {!isMobile && <span>Добавить в корзину</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
