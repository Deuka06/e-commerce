import React from 'react';
import { formatPrice } from '../utils/helpers';

function ProductCard({ product, onAddToCart, isAdmin, onDelete }) {
  const styles = {
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
      fontSize: '48px',
      color: '#ddd',
    },
    productInfo: {
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
    },
    productTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      lineHeight: '1.4',
    },
    productPrice: {
      fontSize: '14px',
      fontWeight: '300',
      color: '#2c3e50',
      marginTop: '2px',
    },
    productActions: {
      display: 'flex',
      gap: '8px',
      marginTop: '12px',
    },
    btn: {
      flex: 1,
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    btnPrimary: {
      background: '#3498db',
      color: 'white',
    },
    btnSecondary: {
      background: '#e74c3c',
      color: 'white',
      flex: '0 0 auto',
      padding: '10px 14px',
    },
  };

  // Media query handling with window resize
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileStyles = isMobile
    ? {
        productImage: {
          ...styles.productImage,
          height: '180px',
          fontSize: '40px',
        },
        productInfo: { ...styles.productInfo, padding: '12px' },
        productTitle: { ...styles.productTitle, fontSize: '16px' },
        productPrice: { ...styles.productPrice, fontSize: '13px' },
        btn: { ...styles.btn, padding: '8px 12px', fontSize: '13px' },
      }
    : {};

  return (
    <div style={styles.productCard}>
      <div style={mobileStyles.productImage || styles.productImage}>
        <i className="fas fa-image"></i>
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
                style={{
                  ...(mobileStyles.btn || styles.btn),
                  ...styles.btnPrimary,
                  marginRight: '10px',
                }}
              >
                <i className="fas fa-edit"></i>
                {!isMobile && <span>Өңдеу</span>}
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
            <>
              <button
                style={{
                  ...(mobileStyles.btn || styles.btn),
                  ...styles.btnPrimary,
                }}
                onClick={() => onAddToCart(product.id)}
              >
                <i className="fas fa-shopping-cart"></i>
                {!isMobile && <span>Себетке қосу</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
