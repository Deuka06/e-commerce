import React, { useState } from "react";

function AdminProductGrid({ products, onDelete, onEdit, isMobile }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || product.categoryName,
      price: product.price,
      image: product.image || product.imageUrl,
    });
  };

  const handleModalClose = () => {
    setEditingProduct(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSaveChanges = () => {
    if (onEdit) {
      onEdit(editingProduct._id || editingProduct.id, formData);
    }
    handleModalClose();
  };

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "#999",
          fontSize: "16px",
        }}>
        <div style={{ fontSize: "48px", marginBottom: "1rem" }}>📦</div>
        <p>Тауарлар табылмады</p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}>
        {products.map((product) => (
          <div
            key={product._id || product.id}
            style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            {/* Сурет блогы (бұрынғыша) */}
            <div
              style={{
                width: "100%",
                height: "200px",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
              {product.image || product.imageUrl ? (
                <img
                  src={product.image || product.imageUrl}
                  alt={product.name || product.categoryName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ fontSize: "48px" }}>📦</span>
              )}
            </div>

            <div style={{ padding: "1rem" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#333",
                }}>
                {product.name || product.categoryName}
              </h4>

              {/* Бағасы мен Қоймасы */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#667eea",
                  }}>
                  {product.price} ₸
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: product.stock > 0 ? "#4caf50" : "#f44336",
                  }}>
                  {product.stock > 0 ? `Қоймада: ${product.stock}` : "Жоқ"}
                </span>
              </div>

              {/* Батырмалар контейнері */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {/* Өшіру батырмасы */}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `"${product.name || product.categoryName}" тауарын өшіруге сенімдісіз бе?`,
                        )
                      ) {
                        onDelete(product._id || product.id);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      background: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#cc0000")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#ff4444")
                    }>
                    🗑️ Өшіру
                  </button>
                )}

                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(product);
                    }}
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#285b2a")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#4CAF50")
                    }>
                    ✏️ Өзгерту
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleModalClose}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: "0 0 1.5rem", color: "#333" }}>Өзгерту</h2>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#555",
                }}>
                Аты:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#555",
                }}>
                Бағасы:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#555",
                }}>
                Сурет:
              </label>
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleSaveChanges}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#285b2a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#4CAF50")
                }>
                Сақтау
              </button>
              <button
                onClick={handleModalClose}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "#999",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#666")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#999")
                }>
                Бастарту
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminProductGrid;
