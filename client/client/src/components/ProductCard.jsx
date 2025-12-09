import React from "react";
import { formatPrice } from "../utils/helpers";

function ProductCard({ product, onAddToCart, isAdmin, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <i className="fas fa-image"></i>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-title">{product.name}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">{formatPrice(product.price)} ₸</div>
        <div className="product-actions">
          {isAdmin ? (
            <>
              <button
                className="btn btn-primary"
                style={{ flex: 1, marginRight: "10px" }}>
                <i className="fas fa-edit"></i>
                <span>Өңдеу</span>
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => onDelete(product.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(product.id)}>
                <i className="fas fa-shopping-cart"></i>
                <span>Себетке қосу</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
