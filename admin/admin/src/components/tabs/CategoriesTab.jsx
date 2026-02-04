import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../store/categorySlice";
import { styles } from "../../styles/adminPanelStyles";

function CategoriesTab({
  // categories,
  // onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  isMobile,
}) {
  const dispatch = useDispatch();
  const [categoryFormData, setCategoryFormData] = useState({
    id: null,
    name: "",
    slug: "",
    parentId: 1,
    imageUrl: "",
  });
  const { items, loading } = useSelector((state) => state.categories);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryImagePreview, setCategoryImagePreview] = useState(null);
  const [categoriesPage, setCategoriesPage] = useState(1);
  const itemsPerPage = 6;
  const categories = items || [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
        setCategoryFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    // Backend күтетін деректер құрылымы (image_e06ac0.png бойынша)
    const categoryData = {
      categoryName: categoryFormData.name,
      slug: categoryFormData.slug,
      imageUrl: categoryFormData.imageUrl || "string", // егер бос болса "string" жіберу
    };

    if (isEditingCategory) {
      // ЖАҢАРТУ (PUT)
      try {
        await dispatch(
          updateCategory({
            id: categoryFormData.id,
            categoryData,
          }),
        ).unwrap();
        alert("Категория жаңартылды!");
      } catch (err) {
        alert("Қате: " + err);
      }
    } else {
      // ҚОСУ (POST)
      try {
        await dispatch(addCategory(categoryData)).unwrap();
        alert("Категория қосылды!");
      } catch (err) {
        alert("Қате: " + err);
      }
    }

    // Форманы тазалау
    handleCancelEdit();
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      id: category.id,
      categoryName: category.name,
      slug: category.slug,
      parentId: category.parentId || 0,
      imageUrl: category.imageUrl || "",
    });
    setCategoryImagePreview(category.imageUrl || null);
    setIsEditingCategory(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setCategoryFormData({
      id: null,
      categoryName: "",
      slug: "",
      parentId: 1,
      imageUrl: "",
    });
    setCategoryImagePreview(null);
    setIsEditingCategory(false);
  };

  const handleDeleteCategory = async (id) => {
    // Пайдаланушыдан растау сұрау
    if (window.confirm("Бұл категорияны жоюға сенімдісіз бе?")) {
      try {
        // unwrap() қате болса catch-ке жіберу үшін керек
        await dispatch(deleteCategory(id)).unwrap();
        alert("Категория сәтті жойылды!");
      } catch (err) {
        alert("Жою мүмкін болмады: " + (err.message || err));
      }
    }
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
              <label style={styles.label}>ParentId</label>
              <input
                style={styles.input}
                name="parentId"
                value={categoryFormData.parentId}
                onChange={handleCategoryInputChange}
                placeholder="parentId всегда должно быть 1"
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
                          {category.image ? (
                            <img
                              src={
                                category.image.startsWith("http")
                                  ? category.image
                                  : `http://46.247.41.196${category.image}`
                              }
                              alt={category.categoryName}
                              style={styles.categoryTableImage}
                            />
                          ) : (
                            "Сурет жоқ"
                          )}
                        </td>
                        <td style={styles.tableCell}>
                          {category.categoryName}
                        </td>
                        <td style={styles.tableCell}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleEditCategory(category)}
                              style={styles.editBtn}>
                              ✏️ Өңдеу
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)} // props-тан келген емес, осы жердегі функцияны шақырамыз
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
