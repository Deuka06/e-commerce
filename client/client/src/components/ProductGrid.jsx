import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/categorySlice';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';
import { fetchProductsByCategory } from '../store/productSlice';

function ProductGrid({
  products,
  onAddToCart,
  onOrderClick,
  isAdmin,
  onDelete,
  onFilterChange,
}) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { items: serverCategories, status } = useSelector(
    (state) => state.categories,
  );
  const { itemProducts: filteredProducts, status: productsStatus } =
    useSelector((state) => state.products);

  // Categories fetching
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories;
  }, [products]);

  const categoryLabels = {
    electronics: { label: 'Электроника', icon: 'fas fa-laptop' },
    clothing: { label: 'Киім', icon: 'fas fa-shirt' },
    home: { label: 'Үйге арналған', icon: 'fas fa-home' },
    sports: { label: 'Спорт', icon: 'fas fa-dumbbell' },
    soda: { label: 'Сода', icon: 'fas fa-bottle-water' },
    drinks: { label: 'Ішімдіктер', icon: 'fas fa-wine-glass' },
    food: { label: 'Тағам', icon: 'fas fa-utensils' },
    charity: { label: 'Благотворительность', icon: 'fas fa-heart' },
  };

  const charitySubcategories = [
    {
      id: 'collection',
      label: 'Қажетті адамдарға арналған қаржы',
      icon: 'fas fa-handshake',
    },
    {
      id: 'products',
      label: 'Қажетті адамдарға арналған тауарлар',
      icon: 'fas fa-gift',
    },
  ];

  const displayedProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  const handleCategorySelect = (categoryId) => {
    const categoryObj = serverCategories.find((c) => c.id === categoryId);

    console.log('Таңдалған категория объектісі:', categoryObj);

    if (categoryObj) {
      if (categoryObj.slug === 'charity') {
        setSelectedCategory('charity');
      } else {
        setSelectedCategory(categoryObj.slug);
        dispatch(fetchProductsByCategory(categoryId));
      }
    }
    ы;
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    // Filter products based on subcategory logic
    // This can be expanded based on your product data structure
    const filtered = products.filter((p) => p.category === 'charity');
    setFilteredProducts(filtered);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setFilteredProducts(products);
  };

  const handleBackFromSubcategory = () => {
    setSelectedSubcategory(null);
  };

  const handleFilterChange = (filtered) => {
    setFilteredProducts(filtered);
  };

  return (
    <>
      {/* Show category cards only when no category is selected */}
      {!selectedCategory && (
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Тауарлар</h2>
            <div className="view-options">
              <button className="active">
                <i className="fas fa-th"></i>
              </button>
              <button>
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {/* Category Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)', // 3 тең баған
              gap: '20px', // Карточкалар арасындағы қашықтық
              padding: '20px',
              maxWidth: '1200px', // Ортада әдемі тұруы үшін
              margin: '0 auto',
            }}
          >
            {serverCategories.map((category) => {
              // categoryLabels-тен иконканы серверден келген slug арқылы іздейміз
              const categoryInfo = categoryLabels[category.slug] || {
                label: category.categoryName,
                icon: 'fas fa-tag',
              };

              // Осы категорияда қанша тауар бар екенін санау
              const categoryProductCount = products.filter(
                (p) => p.category === category.slug,
              ).length;

              return (
                <div
                  key={category.id} // Енді id-ді серверден аламыз
                  onClick={() => handleCategorySelect(category.id)}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'var(--transition)',
                    background: 'white',
                    border: '2px solid #e0e0e0',
                    color: 'var(--dark)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      'rgba(108, 99, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i
                    className={categoryInfo.icon}
                    style={{
                      fontSize: '2rem',
                      marginBottom: '0.5rem',
                      display: 'block',
                    }}
                  ></i>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                    {category.categoryName}{' '}
                    {/* Серверден келген атау (мысалы: "Спорт") */}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      marginTop: '0.25rem',
                    }}
                  >
                    ({categoryProductCount})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Default message when no category is selected */}
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              color: 'var(--gray)',
              background: 'rgba(108, 99, 255, 0.05)',
              borderRadius: '12px',
              border: '2px dashed rgba(108, 99, 255, 0.2)',
            }}
          >
            <i
              className="fas fa-hand-pointer"
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                display: 'block',
                opacity: 0.6,
              }}
            ></i>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Тауарларды көру үшін категорияны таңдаңыз
            </p>
            <p style={{ fontSize: '0.95rem', opacity: 0.7 }}>
              Жоғарыдағы категориялардың бірін басыңыз
            </p>
          </div>
        </section>
      )}

      {/* Show Charity Subcategories when Charity is selected */}
      {selectedCategory === 'charity' && !selectedSubcategory && (
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Благотворительность</h2>
          </div>

          {/* Back Button */}
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(108, 99, 255, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
            className="back-button-container"
          >
            <span style={{ color: 'var(--dark)' }}>
              <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>
                Подкатегорияны таңдаңыз
              </strong>
            </span>
            <button
              onClick={handleBack}
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 7px 15px rgba(108, 99, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: '0.5rem' }}
              ></i>
              Қайта оралу
            </button>
          </div>

          {/* Charity Subcategories */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
            className="charity-subcategories-grid"
          >
            {charitySubcategories.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSubcategorySelect(sub.id)}
                style={{
                  padding: '2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                  background: 'white',
                  border: '2px solid var(--secondary)',
                  color: 'var(--dark)',
                  boxShadow: 'var(--card-shadow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'rgba(255, 101, 132, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i
                  className={sub.icon}
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    display: 'block',
                    color: 'var(--secondary)',
                  }}
                ></i>
                <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                  {sub.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show Sidebar and products when specific category/subcategory is selected */}
      {/* Категория таңдалғанда (және ол charity емес болса) Sidebar мен Тауарларды көрсету */}
      {selectedCategory && selectedCategory !== 'charity' && (
        <div style={{ display: 'flex', gap: '2rem', margin: '3rem 0' }}>
          {/* Sidebar логикасы сақталады... */}
          <Sidebar
            products={products.filter((p) => p.category === selectedCategory)}
            onFilterChange={handleFilterChange}
            selectedCategory={selectedCategory}
            onBack={isMobile ? () => setSidebarVisible(false) : handleBack}
            style={{
              flex: '0 0 250px',
              ...(isMobile && {
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '80%',
                maxWidth: '300px',
                zIndex: 1000,
                background: 'white',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                overflowY: 'auto',
                padding: '20px',
              }),
            }}
          />

          <section className="products-section" style={{ flex: '1' }}>
            <div className="section-header">
              <h2 className="section-title">
                {categoryLabels[selectedCategory]?.label || selectedCategory}
              </h2>
            </div>

            {/* Тауарлар торы (Grid) */}
            <div className="products-grid">
              {productsStatus === 'loading' ? (
                <div className="loading">Жүктелуде...</div>
              ) : filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onOrderClick={onOrderClick}
                    isAdmin={isAdmin}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <div className="no-products">
                  <i className="fas fa-box-open"></i>
                  <p>Бұл категорияда әзірге тауар жоқ</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Show Charity Subcategory Products */}
      {selectedCategory === 'charity' && selectedSubcategory && (
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              {
                charitySubcategories.find((s) => s.id === selectedSubcategory)
                  ?.label
              }
            </h2>
          </div>

          {/* Back Button */}
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 101, 132, 0.1)',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className="back-button-container"
          >
            <span style={{ color: 'var(--dark)' }}>
              <strong style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>
                {
                  charitySubcategories.find((s) => s.id === selectedSubcategory)
                    ?.label
                }
              </strong>
              <span style={{ marginLeft: '0.5rem', color: 'var(--gray)' }}>
                ({filteredProducts.length} тауар)
              </span>
            </span>
            <button
              onClick={handleBackFromSubcategory}
              style={{
                background: 'var(--secondary)',
                color: 'white',
                border: 'none',
                padding: '0.7rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: '0.5rem' }}
              ></i>
              Қайта оралу
            </button>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onOrderClick={onOrderClick}
                  isAdmin={isAdmin}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'var(--gray)',
                }}
              >
                <i
                  className="fas fa-heart"
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    display: 'block',
                  }}
                ></i>
                <p>Осы подкатегориядағы тауарлар табылмады</p>
              </div>
            )}
          </div>
        </section>
      )}

      <style>{`
        /* Base styles for product grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        /* Base styles for category cards */
        .category-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }

        /* Responsive styles */
        @media (max-width: 1100px) {
          .products-section {
            flex: 1;
            width: 100%;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.25rem;
          }
        }

        @media (max-width: 900px) {
          /* Switch back to column layout on smaller screens */
          div[style*="flexDirection: row"] {
            flex-direction: column !important;
          }

          .sidebar {
            width: 100% !important;
            flex: none !important;
            margin-bottom: 2rem;
          }

          .products-section {
            width: 100%;
          }

          /* Adjust category cards for tablets */
          .category-cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .view-options {
            width: 100%;
            justify-content: flex-start;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .product-card {
            border-radius: 10px;
          }

          .section-header {
            display: flex;
            flex-direction: column;
          }

          /* Make buttons more touch-friendly */
          button {
            min-height: 44px;
          }

          /* Improve spacing for mobile */
          .filter-options label {
            padding: 8px 0;
            display: block;
          }

          /* Adjust charity subcategories grid */
          .charity-subcategories-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          /* Smaller category cards for mobile */
          .category-cards-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 0.5rem;
          }

          .product-card {
            padding: 0.75rem;
          }

          .product-info {
            padding: 0.75rem;
          }

          .product-title {
            font-size: 0.95rem;
          }

          .product-price {
            font-size: 1.1rem;
          }

          .btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }

          .btn i {
            margin-right: 4px;
          }

          .btn-secondary {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .product-actions {
            gap: 0.5rem;
          }

          /* Adjust back buttons for better mobile experience */
          .back-button-container {
            flex-direction: column;
            gap: 1rem;
          }

          .back-button-container button {
            width: 100%;
            justify-content: center;
          }

          /* Charity subcategories for smallest screens */
          .charity-subcategories-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Filter toggle button animation */
        .filter-toggle-btn {
          transition: all 0.3s ease;
        }

        .filter-toggle-btn:active {
          transform: scale(0.95);
        }

        /* Ensure filter button is responsive */
        @media (max-width: 480px) {
          .filter-toggle-btn {
            width: 100%;
            justify-content: center;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

export default ProductGrid;
