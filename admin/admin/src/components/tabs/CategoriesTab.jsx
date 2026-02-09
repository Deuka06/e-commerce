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
  const [selectedFile, setSelectedFile] = useState(null);
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
      setSelectedFile(file); // Файлды сақтаймыз
      setCategoryImagePreview(URL.createObjectURL(file)); // Көру үшін уақытша сілтеме
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryFormData.name);
    formData.append("slug", categoryFormData.slug);
    formData.append("parentId", categoryFormData.parentId);

    if (selectedFile) {
      formData.append("image", selectedFile); // "image" кілті Multer баптауына сай болуы керек
    }

    if (isEditingCategory) {
      try {
        await dispatch(
          updateCategory({
            id: categoryFormData.id,
            categoryData: formData, // FormData жібереміз
          }),
        ).unwrap();
        alert("Категория жаңартылды!");
      } catch (err) {
        alert("Қате: " + (err.message || err));
      }
    } else {
      try {
        await dispatch(addCategory(formData)).unwrap(); // FormData жібереміз
        alert("Категория қосылды!");
      } catch (err) {
        alert("Қате: " + (err.message || err));
      }
    }

    handleCancelEdit();
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      id: category.id,
      categoryName: category.name,
      slug: category.slug,
      parentId: category.parentId || 1,
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
            {/* Атауы, Slug, ParentId input-тары өзгеріссіз қалады */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Категория атауы</label>
              <input
                style={styles.input}
                name="name"
                value={categoryFormData.name}
                onChange={handleCategoryInputChange}
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
            </div>

            {categoryImagePreview && (
              <div style={styles.imagePreviewContainer}>
                <img
                  src={categoryImagePreview}
                  alt="Preview"
                  style={styles.imagePreview}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
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
                      {category.image ? (
                        <img
                          src={
                            category.image.startsWith("http")
                              ? category.image
                              : `http://46.247.41.196${category.image}`
                          }
                          alt={category.categoryName}
                          style={styles.categoryImage}
                        />
                      ) : (
                        <div
                          style={{
                            ...styles.categoryImage,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#e5e9f2",
                            color: "#6b7280",
                            fontSize: "12px",
                          }}>
                          Сурет жоқ
                        </div>
                      )}
                      <div style={styles.categoryInfo}>
                        <div style={styles.categoryName}>
                          {category.categoryName}
                        </div>
                      </div>
                    </div>
                    <div style={styles.categoryActions}>
                      <button
                        onClick={() => handleEditCategory(category)}
                        style={styles.editBtn}>
                        ✏️ Өңдеу
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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
