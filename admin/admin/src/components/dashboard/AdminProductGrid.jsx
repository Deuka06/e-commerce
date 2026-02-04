import React from 'react';

function AdminProductGrid({ products, onDelete, isMobile }) {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#999',
          fontSize: '16px',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📦</div>
        <p>Тауарлар табылмады</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile
          ? '1fr'
          : 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div
            style={{
              width: '100%',
              height: '200px',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <span style={{ fontSize: '48px' }}>📦</span>
            )}
          </div>

          <div style={{ padding: '1rem' }}>
            <h4
              style={{
                margin: '0 0 0.5rem',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </h4>

            <p
              style={{
                margin: '0 0 0.75rem',
                fontSize: '14px',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: '40px',
              }}
            >
              {product.description || 'Сипаттама жоқ'}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem',
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#667eea',
                }}
              >
                {product.price} ₸
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: product.stock > 0 ? '#4caf50' : '#f44336',
                  fontWeight: '500',
                }}
              >
                {product.stock > 0
                  ? `Қоймада: ${product.stock}`
                  : 'Қоймада жоқ'}
              </span>
            </div>

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (
                    window.confirm(
                      `"${product.name}" тауарын өшіруге сенімдісіз бе?`,
                    )
                  ) {
                    onDelete(product._id);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = '#cc0000')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = '#ff4444')
                }
              >
                🗑️ Өшіру
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProductGrid;
