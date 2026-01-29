import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourierOrder } from "../store/courierSlice";

function CourierInstructions({ onClose }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth || {});
  const { success: courierSuccess } = useSelector(
    (state) => state.courier || {},
  );
  const [formData, setFormData] = useState({
    fullName: "", // Backend-ке сай 'name' -> 'fullName'
    phoneNumber: "", // Backend-ке сай 'phone' -> 'phoneNumber'
    address: "",
    institution: "Учреждение 12 (бывшее 99)", // Default value
    deliveryTo: "", // Backend-ке сай 'nameOfRecipient' -> 'deliveryTo'
    description: "", // Backend-ке сай 'notes' -> 'description'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Redux арқылы серверге жіберу
    const result = await dispatch(createCourierOrder(formData));

    if (createCourierOrder.fulfilled.match(result)) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div
      style={{
        background: "var(--light)",
        minHeight: "100vh",
        padding: "2rem 0",
      }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={onClose}
            style={{
              background: "var(--primary)",
              color: "white",
              border: "none",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "var(--transition)",
              fontSize: "1rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 7px 15px rgba(108, 99, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}>
            <i
              className="fas fa-arrow-left"
              style={{ marginRight: "0.5rem" }}></i>
            Қайта оралу
          </button>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              color: "var(--dark)",
            }}>
            Курьер сервисі арқылы тауарлар жеткізу
          </h1>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "var(--card-shadow)",
            }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "var(--primary)",
              }}>
              <i className="fas fa-truck" style={{ marginRight: "0.5rem" }}></i>
              Курьер сервисі дегеніміз не?
            </h2>
            <p
              style={{
                color: "var(--gray)",
                lineHeight: "1.8",
                marginBottom: "1rem",
              }}>
              Курьер сервисі - бұл тез және қауіпсіз тауарлар жеткізу әдісі. Біз
              сіздің сәлемдемеңізді жылдам әрі сенімді түрде жеткіземіз, бұл
              тауарларды сіз таңдаған мекемеге оңай жеткізуге көмектеседі.
            </p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "var(--card-shadow)",
            }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "var(--primary)",
              }}>
              <i
                className="fas fa-list-check"
                style={{ marginRight: "0.5rem" }}></i>
              Құқықтар және міндеттер
            </h2>
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "var(--dark)",
                }}>
                <i
                  className="fas fa-check"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--success)",
                  }}></i>
                Курьердің құқықтары:
              </h3>
              <ul
                style={{
                  marginLeft: "2rem",
                  color: "var(--gray)",
                  lineHeight: "1.8",
                }}>
                <li>Барлық тауарларды қауіпсіз түрде жеткізу</li>
                <li>Қауіпсіз түрде сіздің сәлемдемелеріңізді сақтау</li>
                <li>24/7 қолдау қызметі ұсыну</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "var(--dark)",
                }}>
                <i
                  className="fas fa-user"
                  style={{
                    marginRight: "0.5rem",
                    color: "var(--primary)",
                  }}></i>
                Сіздің міндеттеріңіз:
              </h3>
              <ul
                style={{
                  marginLeft: "2rem",
                  color: "var(--gray)",
                  lineHeight: "1.8",
                }}>
                <li>Мекемені ұсыну</li>
                <li>Тиісті уақытта сәлемдемені жіберуге дайын болу</li>
                <li>Проблемалар туындаған кезде хабарлау</li>
              </ul>
            </div>
          </div>

          {/* Courier Order Form */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              boxShadow: "var(--card-shadow)",
            }}>
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "var(--primary)",
              }}>
              <i className="fas fa-edit" style={{ marginRight: "0.5rem" }}></i>
              Курьер тапсырысын толтырыңыз
            </h2>

            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  background: "rgba(46, 204, 113, 0.1)",
                  borderRadius: "8px",
                  color: "var(--success)",
                }}>
                <i
                  className="fas fa-check-circle"
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    display: "block",
                  }}></i>
                <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                  Тапсырыс сәтті жіберілді!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Аты-жөні */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Аты-жөні *</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="fullName" // name -> fullName
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Сіздің толық есіміңіз"
                    required
                  />
                </div>

                {/* Телефон */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Телефон нөмірі *</label>
                  <input
                    style={inputStyle}
                    type="tel"
                    name="phoneNumber" // phone -> phoneNumber
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </div>

                {/* Мекен-жайы */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Мекен-жайы *</label>
                  <textarea
                    style={inputStyle}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Қайдан алу керек (Адрес)"
                    rows="3"
                    required
                  />
                </div>

                {/* Мекеме */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Жеткізу мекемесін таңдаңыз *</label>
                  <select
                    style={inputStyle}
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required>
                    <option value="Учреждение 12 (бывшее 99)">
                      Учреждение 12 (бывшее 99)
                    </option>
                    <option value="Учреждение 14 (бывшее 103)">
                      Учреждение 14 (бывшее 103)
                    </option>
                    <option value="Учреждение 57 (бывшее 71)">
                      Учреждение 57 (бывшее 71)
                    </option>
                  </select>
                </div>

                {/* Кімге */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Кімге жеткізілуі керек *</label>
                  <input
                    style={inputStyle}
                    type="text"
                    name="deliveryTo" // nameOfRecipient -> deliveryTo
                    value={formData.deliveryTo}
                    onChange={handleChange}
                    placeholder="Қабылдаушының атын жазыңыз"
                    required
                  />
                </div>

                {/* Ескертпелер */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={labelStyle}>Қосымша ескертпелер</label>
                  <textarea
                    style={inputStyle}
                    name="description" // notes -> description
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Курьерге өтінім немесе ерекше сұрау"
                    rows="3"
                  />
                </div>

                {/* Қате шықса көрсету */}
                {error && (
                  <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "#ccc" : "var(--gradient)",
                    color: "white",
                    border: "none",
                    padding: "1rem",
                    borderRadius: "8px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                  }}>
                  <i
                    className="fas fa-check"
                    style={{ marginRight: "0.5rem" }}></i>
                  {loading ? "Жіберілуде..." : "Курьер тапсырысын жіберу"}
                </button>
              </form>
            )}
          </div>

          <div
            style={{
              background: "rgba(108, 99, 255, 0.1)",
              borderRadius: "12px",
              padding: "2rem",
              marginBottom: "2rem",
              borderLeft: "4px solid var(--primary)",
            }}>
            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1rem",
                color: "var(--dark)",
              }}>
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.5rem", color: "var(--primary)" }}></i>
              Маңызды ескертпелер
            </h3>
            <ul
              style={{
                marginLeft: "2rem",
                color: "var(--dark)",
                lineHeight: "1.8",
              }}>
              <li>Курьер сервисін пайдалану үшін 18 жасқа толуға тиіс</li>
              <li>Тауарлар ішінде заңға қайшы заттар болмауы тиіс</li>
              <li>Сұрақтарыңыз болса, қолдау командасына хабарласыңыз</li>
            </ul>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                color: "var(--primary)",
                border: "2px solid var(--primary)",
                padding: "1rem 2rem",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "var(--transition)",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--primary)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--primary)";
              }}>
              <i
                className="fas fa-arrow-left"
                style={{ marginRight: "0.5rem" }}></i>
              Басты бетке оралу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "600",
  color: "var(--dark)",
};
const inputStyle = {
  width: "100%",
  padding: "0.8rem 1rem",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "1rem",
  boxSizing: "border-box",
};

export default CourierInstructions;
