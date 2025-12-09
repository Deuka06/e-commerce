import React, { useState, useEffect } from "react";

function OrderModal({
  isOpen,
  onClose,
  onSubmit,
  selectedProductId,
  products,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      productName: selectedProduct?.name,
      amount: selectedProduct?.price,
    });
    setFormData({ name: "", phone: "", address: "" });
    onClose();
  };

  if (!isOpen || !selectedProduct) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Тапсырыс беру</h3>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Аты-жөні</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Телефон нөмірі</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Мекен-жайы</label>
            <textarea
              id="address"
              name="address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required></textarea>
          </div>
          <div className="form-group">
            <label>
              Тауар: <span>{selectedProduct.name}</span>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}>
            <i className="fas fa-check"></i>
            <span>Тапсырыс беру</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;
