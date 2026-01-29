import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../styles/adminPanelStyles";
import { fetchCategories } from "../../store/categorySlice";
import { addProduct } from "../../store/productSlice";

function AddProductTab({ onAddProduct, isMobile }) {
  const dispatch = useDispatch();

  const { items: categories } = useSelector((state) => state.categories);
  const { loading: isSubmitting } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Swagger талабына сай деректерді дайындау
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price), // Санға айналдыру
      categoryId: parseInt(formData.categoryId), // ID-ді бүтін санға айналдыру
      image: formData.image,
    };

    try {
      // 2. Redux арқылы серверге жіберу
      await dispatch(addProduct(productData)).unwrap();

      alert("Тауар сәтті қосылды!");

      // Форманы тазалау
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        categoryId: "",
      });
    } catch (error) {
      alert(
        "Қате орын алды: " +
          (error.message || "Серверге қосылу мүмкін болмады"),
      );
    }
  };

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
          ➕ Жаңа тауар қосу
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Тауар атауы</label>
            <input
              style={styles.input}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Тауардың атын енгізіңіз"
              required
            />
          </div>
          <div style={styles.formRow}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Бағасы (₸)</label>
              <input
                style={styles.input}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Категория</label>
              <select
                style={styles.input}
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                required>
                <option value="">Категорияны таңдаңыз</option>
                {Array.isArray(categories) &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Сурет URL</label>
            <input
              style={styles.input}
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Суреттің сілтемесін енгізіңіз"
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Сипаттама</label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Тауар туралы толық мәлімет"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.submitBtn}
            disabled={isSubmitting} // Жүктеліп жатқанда батырманы бұғаттау
          >
            {isSubmitting ? "Сақталуда..." : "Тауарды сақтау"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductTab;
