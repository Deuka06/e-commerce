import React, { useState } from "react";
import { formatPrice } from "../utils/helpers";

function Sidebar({
  products,
  onFilterChange,
  selectedCategory,
  onBack,
  style,
}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedSort, setSelectedSort] = useState("popular");
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategory ? [selectedCategory] : [],
  );

  const handlePriceChange = (type, value) => {
    if (type === "min") {
      setMinPrice(parseInt(value));
    } else {
      setMaxPrice(parseInt(value));
    }
    applyFilters({ ...selectedCategories }, parseInt(value));
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    applyFilters(selectedCategories, maxPrice, sort);
  };

  const applyFilters = (
    sort = selectedSort,
    categories = selectedCategories,
    min = minPrice,
    max = maxPrice,
  ) => {
    let filtered = [...products];

    if (categories.length > 0) {
      filtered = filtered.filter((p) => categories.includes(p.category));
    }

    filtered = filtered.filter((p) => p.price >= min && p.price <= max);

    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "hot":
        filtered = shuffleArray(filtered);
        break;
      default:
        break;
    }

    onFilterChange(filtered);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <aside className="sidebar" style={style}>
      <div
        style={{
          marginBottom: "1rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e0e0e0",
        }}>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            color: "var(--primary)",
            border: "1px solid var(--primary)",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "var(--primary)";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "var(--primary)";
          }}>
          <i
            className="fas fa-arrow-left"
            style={{ marginRight: "0.5rem" }}></i>
          Қайта оралу
        </button>
      </div>

      <h3>
        <i className="fas fa-filter"></i> Сүзгілер
      </h3>

      <div className="filter-options">
        <h4>
          <i className="fas fa-sort"></i> Сұрыптау
        </h4>
        <label>
          <input
            type="radio"
            name="sort"
            value="popular"
            checked={selectedSort === "popular"}
            onChange={(e) => handleSortChange(e.target.value)}
          />
          Популярлы
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="price-low"
            checked={selectedSort === "price-low"}
            onChange={(e) => handleSortChange(e.target.value)}
          />
          Бағасы бойынша (өсу)
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="price-high"
            checked={selectedSort === "price-high"}
            onChange={(e) => handleSortChange(e.target.value)}
          />
          Бағасы бойынша (кему)
        </label>
      </div>

      <div className="filter-options">
        <h4>
          <i className="fas fa-dollar-sign"></i> Баға диапазоны
        </h4>
        <input
          type="range"
          min="0"
          max="100000"
          value={minPrice}
          onChange={(e) => handlePriceChange("min", e.target.value)}
          className="price-range"
        />
        <input
          type="range"
          min="0"
          max="100000"
          value={maxPrice}
          onChange={(e) => handlePriceChange("max", e.target.value)}
          className="price-range"
        />
        <div className="price-values">
          <span>{formatPrice(minPrice)} ₸</span>
          <span>{formatPrice(maxPrice)} ₸</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
