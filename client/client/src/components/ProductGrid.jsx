import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/categorySlice";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { fetchProductsByCategory } from "../store/productSlice";

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
  const [isMobile, setIsMobile] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const { items: serverCategories, status } = useSelector(
    (state) => state.categories,
  );
  const { itemProducts: filteredProducts, status: productsStatus } =
    useSelector((state) => state.products);

  // Categories fetching
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Тек Redux-тан тауарлар келгенде немесе категория ауысқанда ғана жаңарту
    if (filteredProducts) {
      setDisplayItems(filteredProducts);
    }
  }, [filteredProducts, selectedCategory]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 900);
      if (isMobile) {
        setFilterVisible(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (isMobile && filterVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, filterVisible]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return uniqueCategories;
  }, [products]);

  const categoryLabels = {
    electronics: {
      label: "Электроника",
      icon: "fas fa-laptop",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    clothing: {
      label: "Одежда",
      icon: "fas fa-shirt",
      image:
        "https://images.unsplash.com/photo-1489368079519-c21cc028cb7f?w=400&h=300&fit=crop",
    },
    home: {
      label: "Для дома",
      icon: "fas fa-home",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    sports: {
      label: "Спорт",
      icon: "fas fa-dumbbell",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    },
    soda: {
      label: "Химия",
      icon: "fas fa-bottle-water",
      image:
        "https://images.unsplash.com/photo-1554866585-c4db88b1fb91?w=400&h=300&fit=crop",
    },
    drinks: {
      label: "Алкоголь",
      icon: "fas fa-wine-glass",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=400&h=300&fit=crop",
    },
    food: {
      label: "Блюда",
      icon: "fas fa-utensils",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    },
    charity: {
      label: "Благотворительность",
      icon: "fas fa-heart",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
    },
  };

  const charitySubcategories = [
    {
      id: "collection",
      label: "Финансирование для нуждающихся",
      icon: "fas fa-handshake",
    },
    {
      id: "products",
      label: "Товары для нуждающихся",
      icon: "fas fa-gift",
    },
  ];

  const displayedProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  const handleCategorySelect = (categoryId) => {
    const categoryObj = serverCategories.find((c) => c.id === categoryId);

    console.log("Выбранный объект категории:", categoryObj);

    if (categoryObj) {
      if (categoryObj.slug === "charity") {
        setSelectedCategory("charity");
      } else {
        setSelectedCategory(categoryObj.slug);
        dispatch(fetchProductsByCategory(categoryId));
      }
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    // Filter products based on subcategory logic
    // This can be expanded based on your product data structure
    const filtered = products.filter((p) => p.category === "charity");
    setFilteredProducts(filtered);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setFilterVisible(false);
  };

  const handleBackFromSubcategory = () => {
    setSelectedSubcategory(null);
  };

  const handleFilterChange = (filtered) => {
    // Sidebar-дан келген дайын сүзілген тізімді экранға шығарамыз
    console.log("Отфильтрованный список из боковой панели:", filtered);
    setDisplayItems(filtered);
  };

  return (
    <>
      {/* Show category cards only when no category is selected */}
      {!selectedCategory && (
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Товары</h2>
          </div>

          {/* Category Cards */}
          <div className="category-cards-container">
            {serverCategories.map((category) => {
              const categoryInfo = categoryLabels[category.slug] || {
                label: category.categoryName,
                icon: "fas fa-tag",
              };

              // Суреттің бар-жоғын тексеру
              const hasS3Image =
                category.imageUrl && category.imageUrl !== "string";

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="category-card">
                  {/* Үстіңгі жағы: Сурет немесе Иконка */}
                  <div className="category-img-box">
                    {hasS3Image ? (
                      <img
                        src={category.imageUrl}
                        alt={category.categoryName}
                        className="category-main-img"
                      />
                    ) : (
                      <div className="category-placeholder-icon">
                        <i className={categoryInfo.icon}></i>
                      </div>
                    )}
                  </div>

                  {/* Астыңғы жағы: Аты мен Саны */}
                  <div className="category-info-text">
                    <div className="category-name">{category.categoryName}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Default message when no category is selected */}
          <div className="empty-state-message">
            <i
              className="fas fa-hand-pointer"
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                display: "block",
                opacity: 0.6,
              }}></i>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              Выберите категорию, чтобы просмотреть товары.
            </p>
            <p style={{ fontSize: "0.95rem", opacity: 0.7 }}>
              Нажмите на одну из категорий выше.
            </p>
          </div>
        </section>
      )}

      {/* Show Charity Subcategories when Charity is selected */}
      {selectedCategory === "charity" && !selectedSubcategory && (
        <section className="products-section">
          <div className="section-header">
            <h2 className="section-title">Благотворительность</h2>
          </div>

          {/* Back Button */}
          <div
            style={{
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "rgba(108, 99, 255, 0.1)",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
            className="back-button-container">
            <span style={{ color: "var(--dark)" }}>
              <strong style={{ color: "var(--secondary)", fontSize: "1.1rem" }}>
                Выберите подкатегорию
              </strong>
              <span style={{ marginLeft: "0.5rem", color: "var(--gray)" }}>
                ({filteredProducts.length} товар)
              </span>
            </span>
            <button
              onClick={handleBack}
              style={{
                background: "var(--secondary)",
                color: "white",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "var(--transition)",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}>
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "0.5rem" }}></i>
              Назад
            </button>
          </div>

          {/* Charity Subcategories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
            className="charity-subcategories-grid">
            {charitySubcategories.map((sub) => (
              <div
                key={sub.id}
                onClick={() => handleSubcategorySelect(sub.id)}
                style={{
                  padding: "2rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "var(--transition)",
                  background: "white",
                  border: "2px solid var(--secondary)",
                  color: "var(--dark)",
                  boxShadow: "var(--card-shadow)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 101, 132, 0.05)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <i
                  className={sub.icon}
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    display: "block",
                    color: "var(--secondary)",
                  }}></i>
                <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                  {sub.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Show Sidebar and products when specific category/subcategory is selected */}
      {selectedCategory && selectedCategory !== "charity" && (
        <div className="products-with-sidebar">
          {/* Filter Overlay for Mobile */}
          {isMobile && filterVisible && (
            <div
              className="filter-overlay"
              onClick={() => setFilterVisible(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`sidebar-wrapper ${isMobile && filterVisible ? "visible" : ""} ${isMobile ? "mobile" : ""}`}>
            {isMobile && filterVisible && (
              <div className="sidebar-header">
                <h3>Фильтр</h3>
                <button
                  className="close-sidebar-btn"
                  onClick={() => setFilterVisible(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
            <Sidebar
              products={filteredProducts}
              onFilterChange={handleFilterChange}
              selectedCategory={selectedCategory}
              onBack={() => {
                if (isMobile) {
                  setFilterVisible(false);
                }
                handleBack();
              }}
              isMobile={isMobile}
            />
          </div>

          <section className="products-section">
            <div className="section-header">
              <div className="header-left">
                <h2 className="section-title">
                  {categoryLabels[selectedCategory]?.label || selectedCategory}
                </h2>
                {filteredProducts && (
                  <span className="product-count">
                    ({filteredProducts.length} товар)
                  </span>
                )}
              </div>
              <div className="header-right">
                <div className="view-options">
                  <button
                    className={viewMode === "grid" ? "active" : ""}
                    onClick={() => setViewMode("grid")}
                    title="Сетка">
                    <i className="fas fa-th"></i>
                  </button>
                  <button
                    className={viewMode === "list" ? "active" : ""}
                    onClick={() => setViewMode("list")}
                    title="Список">
                    <i className="fas fa-list"></i>
                  </button>
                </div>
                {!isMobile && (
                  <button onClick={handleBack} className="back-button-desktop">
                    <i className="fas fa-arrow-left"></i>
                    Назад
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Button - Below Header */}
            {isMobile && (
              <div className="mobile-controls">
                <button
                  onClick={() => setFilterVisible(!filterVisible)}
                  className="mobile-filter-btn">
                  <i className="fas fa-filter"></i>
                  <span>Фильтр</span>
                  {filterVisible && <i className="fas fa-times close-icon"></i>}
                </button>
                <button onClick={handleBack} className="mobile-back-button">
                  <i className="fas fa-arrow-left"></i>
                  Назад
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            <div className={`products-${viewMode}`}>
              {productsStatus === "loading" ? (
                <div className="loading">
                  <i className="fas fa-spinner fa-spin"></i>
                  <p>Загрузка...</p>
                </div>
              ) : displayItems && displayItems.length > 0 ? (
                displayItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onOrderClick={onOrderClick}
                    isAdmin={isAdmin}
                    onDelete={onDelete}
                    viewMode={viewMode}
                  />
                ))
              ) : (
                <div className="no-products">
                  <i className="fas fa-box-open"></i>
                  <p>Товаров в этой категории нет</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Show Charity Subcategory Products */}
      {selectedCategory === "charity" && selectedSubcategory && (
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
              marginBottom: "1.5rem",
              padding: "1rem",
              background: "rgba(255, 101, 132, 0.1)",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="back-button-container">
            <span style={{ color: "var(--dark)" }}>
              <strong style={{ color: "var(--secondary)", fontSize: "1.1rem" }}>
                {
                  charitySubcategories.find((s) => s.id === selectedSubcategory)
                    ?.label
                }
              </strong>
              <span style={{ marginLeft: "0.5rem", color: "var(--gray)" }}>
                ({filteredProducts.length} товар)
              </span>
            </span>
            <button
              onClick={handleBackFromSubcategory}
              style={{
                background: "var(--secondary)",
                color: "white",
                border: "none",
                padding: "0.7rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "var(--transition)",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}>
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "0.5rem" }}></i>
              Назад
            </button>
          </div>

          {/* Products Grid */}
          <div className={`products-${viewMode}`}>
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
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "2rem",
                  color: "var(--gray)",
                }}>
                <i
                  className="fas fa-heart"
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    display: "block",
                  }}></i>
                <p>В этой подкатегории товары не найдены</p>
              </div>
            )}
          </div>
        </section>
      )}

      <style>{`
        /* Products with sidebar container */
        .products-with-sidebar {
          display: flex;
          gap: 2rem;
          margin: 3rem 0;
          width: 100%;
          align-items: flex-start;
          position: relative;
        }

        .products-section {
          flex: 1;
          min-width: 0;
          width: 100%;
        }

        /* Section header */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .section-title {
          margin: 0;
          font-size: 1.8rem;
          color: var(--dark);
          font-weight: 700;
        }

        .product-count {
          color: var(--gray);
          font-size: 1rem;
          font-weight: 500;
        }

        /* View options */
        .view-options {
          display: flex;
          gap: 0.5rem;
          background: #f5f5f5;
          padding: 0.25rem;
          border-radius: 8px;
        }

        .view-options button {
          background: transparent;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          color: var(--gray);
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .view-options button:hover {
          color: var(--primary);
        }

        .view-options button.active {
          background: white;
          color: var(--primary);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Back button desktop */
        .back-button-desktop {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-button-desktop:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
        }

        /* Mobile controls - Below header */
        .mobile-controls {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .mobile-filter-btn {
          flex: 1;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.9rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(108, 99, 255, 0.3);
        }

        .mobile-filter-btn .close-icon {
          margin-left: auto;
          font-size: 1.2rem;
        }

        .mobile-filter-btn:active {
          transform: scale(0.98);
        }

        .mobile-back-button {
          flex: 1;
          background: #f5f5f5;
          color: var(--dark);
          border: none;
          padding: 0.9rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: all 0.3s ease;
        }

        .mobile-back-button:active {
          transform: scale(0.98);
        }

        /* Filter overlay */
        .filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Sidebar wrapper */
        .sidebar-wrapper {
          flex: 0 0 250px;
          min-width: 250px;
          position: sticky;
          top: 20px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          transition: all 0.3s ease;
        }

        .sidebar-wrapper.mobile {
          position: fixed;
          top: 0;
          left: -100%;
          height: 100vh;
          width: 85%;
          max-width: 320px;
          z-index: 999;
          background: white;
          box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
          overflow-y: auto;
          padding: 0;
          flex: none;
          min-width: auto;
          max-height: 100vh;
        }

        .sidebar-wrapper.mobile.visible {
          left: 0;
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e0e0e0;
          background: var(--primary);
          color: white;
        }

        .sidebar-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .close-sidebar-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

/* Категориялар контейнері */
.category-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Өлшемді автоматты реттеу */
  gap: 25px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Картаның негізгі стилі */
.category-card {
  background: white;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column; /* Элементтерді бірінің астына бірін қою */
  overflow: hidden; /* Сурет бұрыштары дөңгелек болуы үшін */
  height: 100%;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  border-color: var(--primary);
}

/* Сурет тұратын блок */
.category-img-box {
  width: 100%;
  height: 180px; /* Суреттің биіктігін осы жерден ретте */
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Суретті созбай, әдемі толтырады */
  transition: transform 0.5s ease;
}

.category-card:hover .category-main-img {
  transform: scale(1.1); /* Ховер болғанда сурет сәл үлкейеді */
}

/* Мәтін орналасқан блок */
.category-info-text {
  padding: 15px;
  text-align: center;
  background: white;
}

.category-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: #333 !important; /* Мәтін түсі қара/қою */
  margin-bottom: 5px;
  text-shadow: none !important; /* Көлеңкені алып тастаймыз */
}

.category-count {
  font-size: 0.95rem;
  color: #888 !important; /* Саны сұр түспен */
  font-weight: 500;
  text-shadow: none !important;
}

/* Иконка (егер сурет жоқ болса) */
.category-placeholder-icon i {
  font-size: 3rem;
  color: var(--primary);
}

        /* Empty state message */
        .empty-state-message {
          text-align: center;
          padding: 3rem 2rem;
          color: var(--gray);
          background: rgba(108, 99, 255, 0.05);
          border-radius: 12px;
          border: 2px dashed rgba(108, 99, 255, 0.2);
          margin-top: 2rem;
        }

        /* Desktop Grid view - 3 columns */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        /* Desktop List view */
        .products-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        /* Loading state */
        .loading {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: var(--gray);
        }

        .loading i {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
          color: var(--primary);
        }

        .loading p {
          font-size: 1.1rem;
        }

        /* No products state */
        .no-products {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 1rem;
          color: var(--gray);
        }

        .no-products i {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        /* Charity subcategories grid */
        .charity-subcategories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        /* Mobile responsive (≤900px) */
        @media (max-width: 900px) {
          .products-with-sidebar {
            flex-direction: column;
            margin: 1.5rem 0;
            gap: 0;
          }

          .sidebar-wrapper:not(.mobile) {
            display: none;
          }

          .products-section {
            width: 100%;
            flex: 1;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-left,
          .header-right {
            width: 100%;
          }

          .header-right {
            justify-content: space-between;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .category-cards-container {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 15px;
          }

          .category-card {
            padding: 1.5rem;
            min-height: auto;
            flex-direction: row;
            text-align: left;
            justify-content: flex-start;
            align-items: center;
            gap: 1.5rem;
          }

          .category-image {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0;
            flex-shrink: 0;
            border-radius: 8px;
          }

          .category-overlay {
            position: static;
            background: none;
            padding: 0;
            width: auto;
            height: auto;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
          }

          .category-card i {
            font-size: 0;
            margin: 0;
            display: none;
          }

          .category-name {
            font-size: 1rem;
            margin-bottom: 0;
            flex: 1;
            color: var(--dark);
            text-shadow: none;
          }

          .category-count {
            font-size: 0.85rem;
            margin-top: 0;
            margin-left: auto;
            flex-shrink: 0;
            color: var(--gray);
            text-shadow: none;
          }

          /* Mobile grid view: 1 column */
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          /* Mobile list view: 2 columns */
          .products-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .mobile-controls {
            flex-direction: column;
            gap: 0.5rem;
          }

          .mobile-filter-btn,
          .mobile-back-button {
            width: 100%;
          }

          .sidebar-wrapper.mobile {
            width: 90%;
            max-width: 100%;
          }

          .charity-subcategories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default ProductGrid;
