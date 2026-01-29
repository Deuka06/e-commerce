import React from "react";
import ProductGrid from "../../../../../client/client/src//components/ProductCard";
import { styles } from "../../styles/adminPanelStyles";

function ProductsTab({ products, onDeleteProduct, isMobile }) {
  return (
    <div style={styles.card}>
      <div
        style={{
          ...styles.cardHeader,
          ...(isMobile ? styles.cardHeaderMobile : {}),
        }}>
        <h3
          style={{
            ...styles.cardTitle,
            ...(isMobile ? styles.cardTitleMobile : {}),
          }}>
          📦 Тауарлар ({products?.length || 0})
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}>
        <ProductGrid
          products={products}
          onDelete={onDeleteProduct}
          isAdmin={true}
        />
      </div>
    </div>
  );
}

export default ProductsTab;
