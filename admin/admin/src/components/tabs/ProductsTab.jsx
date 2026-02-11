import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import {
  fetchProductsByCategory,
  deleteProduct,
  updateProduct,
} from '../../store/productSlice';
import AdminProductGrid from '../dashboard/AdminProductGrid';
import { styles } from '../../styles/adminPanelStyles';

function ProductsTab({ onDeleteProduct, onEditProduct, isMobile }) {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector(
    (state) => state.categories,
  );
  const { items: products, loading: productsLoading } = useSelector(
    (state) => state.products,
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id || categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const filteredProducts = selectedCategory
    ? products.filter(
        (p) =>
          p.category === selectedCategory || p.categoryId === selectedCategory,
      )
    : [];

  const getCategoryProductCount = (categoryId) => {
    return products.filter(
      (p) => p.category === categoryId || p.categoryId === categoryId,
    ).length;
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product); // Өзгерткіміз келген тауарды сақтаймыз
    setIsEditModalOpen(true); // Модальды ашамыз
  };

  // Форманы сақтаған кезде
  const handleUpdateSubmit = async (id, formData) => {
    try {
      // Redux-қа ID мен жаңа деректерді (formData) жібереміз
      await dispatch(
        updateProduct({
          id: id,
          productData: formData,
        }),
      ).unwrap();

      alert('Продукт успешно обновлен!');
    } catch (err) {
      alert('Ошибка: ' + err.message);
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</div>
    );
  }

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
          🏷️ Категории ({categories?.length || 0})
        </h3>
      </div>

      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
          marginBottom: '2rem',
        }}
      >
        {categories?.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#999',
              fontSize: '14px',
            }}
          >
            Категории не найдены. Пожалуйста, перейдите в раздел «Категории» и
            добавьте новую категорию.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {categories.map((category) => {
              const catId = category.id || category._id;
              const productCount = getCategoryProductCount(catId);
              const isSelected = selectedCategory === catId;

              return (
                <button
                  key={catId}
                  onClick={() => setSelectedCategory(catId)}
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
                >
                  {category.categoryName}
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
      <div style={styles.cardBody}>
        {productsLoading ? (
          <p>Идет загрузка товара....</p>
        ) : (
          <AdminProductGrid
            products={products} // Енді бұл жерде тек таңдалған категория тауарлары
            onDelete={handleDeleteProduct}
            onEdit={handleUpdateSubmit}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsTab;
