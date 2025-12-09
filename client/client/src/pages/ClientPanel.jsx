import React, { useState } from "react";
import ProductGrid from "../components/ProductGrid";

function ClientPanel({ products, onAddToCart, onOrderClick }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div className="container client-panel">
      <div className="main-content">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onOrderClick={onOrderClick}
          isAdmin={false}
          onFilterChange={setFilteredProducts}
        />
      </div>
    </div>
  );
}

export default ClientPanel;
