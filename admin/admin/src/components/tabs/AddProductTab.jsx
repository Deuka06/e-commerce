import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../styles/adminPanelStyles';
import { fetchCategories } from '../../store/categorySlice';
import { addProduct } from '../../store/productSlice';

function AddProductTab({ onAddProduct, isMobile }) {
  const dispatch = useDispatch();

  const { items: categories } = useSelector((state) => state.categories);
  const { loading: isSubmitting } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    imagePreview: '',
    categoryId: '',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', parseFloat(formData.price));
    formDataToSend.append('categoryId', parseInt(formData.categoryId));
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await dispatch(addProduct(formDataToSend)).unwrap();

      alert('Товар успешно добавлен!');

      setFormData({
        name: '',
        description: '',
        price: '',
        image: null,
        imagePreview: '',
        categoryId: '',
      });
    } catch (error) {
      alert(
        'Произошла ошибка: ' +
          (error.message || 'Не удалось подключиться к серверу.'),
      );
    }
  };

  return (
    <div style={styles.card}>
      <div
        style={{
          ...styles.cardHeader,
          ...(isMobile ? styles.cardHeaderMobile : {}),
        }}
      >
        <h3
          style={{
            ...styles.cardTitle,
            ...(isMobile ? styles.cardTitleMobile : {}),
          }}
        >
          ➕ Добавить новый товар
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}
      >
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Название товара</label>
            <input
              style={styles.input}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Введите название продукта"
              required
            />
          </div>
          <div style={styles.formRow}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.label}>Цена (₸)</label>
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
                required
              >
                <option value="">Выберите категорию</option>
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
            <label style={styles.label}>Изображение</label>
            <input
              style={styles.input}
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            {formData.imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    borderRadius: '4px',
                  }}
                />
              </div>
            )}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Описание</label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Информация о продукте"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить товар'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductTab;
