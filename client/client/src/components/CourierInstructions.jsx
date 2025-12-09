import React, { useState } from "react";

function CourierInstructions({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    institution: "",
    nameOfRecipient: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, nameOfRecipient, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [nameOfRecipient]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Courier order submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        address: "",
        pickupTime: "",
        notes: "",
      });
      setSubmitted(false);
      onClose();
    }, 2000);
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
                <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  Сіз басты бетке қайтарылысыз...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Аты-жөні *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Сіздің толық есіміңіз"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Телефон нөмірі *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="address"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Мекен-жайы *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Қала, көшесі, үй нөмері, пәтер нөмері"
                    rows="3"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="pickupTime"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Жеткізу мекемесін таңдаңыз *
                  </label>
                  <select
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}>
                    <option value="Учреждение 12 (бывшее 99)">
                      Учреждение 12 (бывшее 99)
                    </option>
                    <option value="Учреждение 14 (бывшее 103)">
                      Учреждение 14 (бывшее 103)
                    </option>
                    <option value="Учреждение 57 (бывшее 71)">
                      Учреждение 57 (бывшее 71)
                    </option>
                  </select>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="nameOfRecipient"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Кімге жеткізілуі керек *
                  </label>
                  <input
                    type="text"
                    id="nameOfRecipient"
                    name="nameOfRecipient"
                    value={formData.nameOfRecipient}
                    onChange={handleChange}
                    placeholder="Қабылдаушының атын жазыңыз"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    htmlFor="notes"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      color: "var(--dark)",
                    }}>
                    Қосымша ескертпелер
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Курьерге өтінем немесе ерекше сұрау"
                    rows="3"
                    style={{
                      width: "100%",
                      padding: "0.8rem 1rem",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      transition: "var(--transition)",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--primary)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(108, 99, 255, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e0e0e0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "var(--gradient)",
                    color: "white",
                    border: "none",
                    padding: "1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 7px 15px rgba(108, 99, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}>
                  <i
                    className="fas fa-check"
                    style={{ marginRight: "0.5rem" }}></i>
                  Курьер тапсырысын жіберу
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

export default CourierInstructions;
