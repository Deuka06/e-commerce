import React, { useState } from "react";
import { styles } from "../../styles/adminPanelStyles";

function CategoriesTab({
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  isMobile,
}) {
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: "",
    slug: "",
    image: "",
  });
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const itemsPerPage = 6;

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result);
        setCategoryFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEditingCategory) {
      onUpdateCategory(categoryFormData.id, {
        name: categoryFormData.name,
        image: categoryFormData.image,
      });
    } else {
      onAddCategory({
        name: categoryFormData.name,
        image: categoryFormData.image,
      });
    }
    setCategoryFormData({
      id: null,
      name: "",
      slug: "",
      image: "",
    });
    setCategoryImagePreview(null);
    setIsEditingCategory(false);
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image || "",
    });
    setCategoryImagePreview(category.image || null);
    setIsEditingCategory(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setCategoryFormData({
      id: null,
      name: "",
      slug: "",
      image: "",
    });
    setCategoryImagePreview(null);
    setIsEditingCategory(false);
  };

  // Pagination logic for categories tab
  const indexOfLastCategory = categoriesPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories =
    categories?.slice(indexOfFirstCategory, indexOfLastCategory) || [];
  const totalPages = Math.ceil((categories?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCategoriesPage(pageNumber);
  };

  return (
    <>
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
            📑 {isEditingCategory ? "Категорияны өңдеу" : "Жаңа категория қосу"}
          </h3>
        </div>
        <div
          style={{
            ...styles.cardBody,
            ...(isMobile ? styles.cardBodyMobile : {}),
          }}>
          <form onSubmit={handleCategorySubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Категория атауы</label>
              <input
                style={styles.input}
                name="name"
                value={categoryFormData.name}
                onChange={handleCategoryInputChange}
                placeholder="Электроника"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Slug</label>
              <input
                style={styles.input}
                name="slug"
                value={categoryFormData.slug}
                onChange={handleCategoryInputChange}
                placeholder="slug"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Категория суреті</label>
              <input
                style={styles.input}
                type="file"
                accept="image/*"
                onChange={handleCategoryImageChange}
                required={!isEditingCategory}
              />
              <small style={styles.helpText}>
                JPG, PNG немесе GIF форматында сурет таңдаңыз
              </small>
            </div>
            {categoryImagePreview && (
              <div style={styles.imagePreviewContainer}>
                <label style={styles.label}>Сурет алдын ала қарау</label>
                <img
                  src={categoryImagePreview}
                  alt="Preview"
                  style={styles.imagePreview}
                />
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button type="submit" style={styles.submitBtn}>
                {isEditingCategory ? "✓ Жаңарту" : "+ Қосу"}
              </button>
              {isEditingCategory && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={styles.cancelBtn}>
                  ✕ Болдырмау
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div style={{ ...styles.card, marginTop: "28px" }}>
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
            📋 Барлық категориялар ({categories?.length || 0})
          </h3>
        </div>
        <div
          style={{
            ...styles.cardBody,
            ...(isMobile ? styles.cardBodyMobile : {}),
          }}>
          {isMobile ? (
            <div style={styles.categoriesGrid}>
              {categories && currentCategories.length > 0 ? (
                currentCategories.map((category) => (
                  <div key={category.id} style={styles.categoryCard}>
                    <div style={styles.categoryCardContent}>
                      {category.image && (
                        <img
                          src={category.image}
                          alt={category.name}
                          style={styles.categoryImage}
                        />
                      )}
                      <div style={styles.categoryInfo}>
                        <div style={styles.categoryName}>{category.name}</div>
                      </div>
                    </div>
                    <div style={styles.categoryActions}>
                      <button
                        onClick={() => handleEditCategory(category)}
                        style={styles.editBtn}>
                        ✏️ Өңдеу
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm("Категорияны жоюға сенімдісіз бе?")
                          ) {
                            onDeleteCategory(category.id);
                          }
                        }}
                        style={styles.deleteBtn}>
                        🗑️ Жою
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>Категориялар жоқ</div>
              )}
              {totalPages > 1 && (
                <div style={styles.pagination}>
                  <button
                    style={{
                      ...styles.paginationBtn,
                      ...(categoriesPage === 1
                        ? styles.paginationBtnDisabled
                        : {}),
                    }}
                    onClick={() => handlePageChange(categoriesPage - 1)}
                    disabled={categoriesPage === 1}>
                    ←
                  </button>
                  <span style={styles.paginationInfo}>
                    {categoriesPage} / {totalPages}
                  </span>
                  <button
                    style={{
                      ...styles.paginationBtn,
                      ...(categoriesPage === totalPages
                        ? styles.paginationBtnDisabled
                        : {}),
                    }}
                    onClick={() => handlePageChange(categoriesPage + 1)}
                    disabled={categoriesPage === totalPages}>
                    →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={styles.tableHeader}>Сурет</th>
                    <th style={styles.tableHeader}>Атауы</th>
                    <th style={styles.tableHeader}>Әрекеттер</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && currentCategories.length > 0 ? (
                    currentCategories.map((category) => (
                      <tr key={category.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>
                          {category.image && (
                            <img
                              src={category.image}
                              alt={category.name}
                              style={styles.categoryTableImage}
                            />
                          )}
                        </td>
                        <td style={styles.tableCell}>{category.name}</td>
                        <td style={styles.tableCell}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleEditCategory(category)}
                              style={styles.editBtn}>
                              ✏️ Өңдеу
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Категорияны жоюға сенімдісіз бе?",
                                  )
                                ) {
                                  onDeleteCategory(category.id);
                                }
                              }}
                              style={styles.deleteBtn}>
                              🗑️ Жою
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        style={{
                          ...styles.tableCell,
                          textAlign: "center",
                          padding: "40px",
                        }}>
                        <div style={styles.emptyState}>Категориялар жоқ</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div style={styles.pagination}>
                  <button
                    style={{
                      ...styles.paginationBtn,
                      ...(categoriesPage === 1
                        ? styles.paginationBtnDisabled
                        : {}),
                    }}
                    onClick={() => handlePageChange(categoriesPage - 1)}
                    disabled={categoriesPage === 1}>
                    ←
                  </button>
                  <span style={styles.paginationInfo}>
                    {categoriesPage} / {totalPages}
                  </span>
                  <button
                    style={{
                      ...styles.paginationBtn,
                      ...(categoriesPage === totalPages
                        ? styles.paginationBtnDisabled
                        : {}),
                    }}
                    onClick={() => handlePageChange(categoriesPage + 1)}
                    disabled={categoriesPage === totalPages}>
                    →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoriesTab;
