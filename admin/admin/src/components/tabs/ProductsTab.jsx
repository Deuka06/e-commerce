import React, { useState, useEffect } from 'react';
import AdminProductGrid from '../dashboard/AdminProductGrid';
import { styles } from '../../styles/adminPanelStyles';

function ProductsTab({
  products = [],
  categories = [],
  onDeleteProduct,
  isMobile,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Автоматически выбираем первую категорию при загрузке
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories, selectedCategory]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : [];

  const getCategoryProductCount = (categoryId) => {
    return products.filter((product) => product.category === categoryId).length;
  };

  return (
    <div style={styles.card}>
      {/* Categories Section */}
      <div
        style={{
          ...styles.cardHeader,
          ...(isMobile ? styles.cardHeaderMobile : {}),
        }}
      >
        <h3
          style={{
            ...styles.cardTitle,
            ...(isMobile ? styles.cardTitleMobile : {}),
          }}
        >
          🏷️ Категориялар ({categories.length})
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
          marginBottom: '2rem',
        }}
      >
        {categories.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#999',
              fontSize: '14px',
            }}
          >
            Категориялар табылмады. "Категориялар" бөліміне кіріп жаңа категория
            қосыңыз.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((category) => {
              const productCount = getCategoryProductCount(category._id);
              const isSelected = selectedCategory === category._id;

              return (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    border: isSelected
                      ? '2px solid #667eea'
                      : '1px solid #e0e0e0',
                    borderRadius: '12px',
                    background: isSelected ? '#667eea' : 'white',
                    color: isSelected ? 'white' : '#333',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.background = '#f0f0ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#e0e0e0';
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  {category.name}
                  <span
                    style={{
                      background: isSelected
                        ? 'rgba(255,255,255,0.2)'
                        : '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {productCount}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Products Section */}
      {selectedCategory && (
        <>
          <div
            style={{
              ...styles.cardHeader,
              ...(isMobile ? styles.cardHeaderMobile : {}),
              marginTop: '1rem',
            }}
          >
            <h3
              style={{
                ...styles.cardTitle,
                ...(isMobile ? styles.cardTitleMobile : {}),
              }}
            >
              📦{' '}
              {categories.find((c) => c._id === selectedCategory)?.name || ''} -
              Тауарлар ({filteredProducts.length})
            </h3>
          </div>
          <div
            style={{
              ...styles.cardBody,
              ...(isMobile ? styles.cardBodyMobile : {}),
            }}
          >
            <AdminProductGrid
              products={filteredProducts}
              onDelete={onDeleteProduct}
              isMobile={isMobile}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsTab;
