import React from "react";

function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Qamkor</h3>
            <p>
              Служба курьерской доставки Qamkor. Быстрая транспортировка товаров
              и бережное отношение к вашим заказам. Работаем для вашего комфорта
              ежедневно.
            </p>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Контакты</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Алматы, пр. Абая 150
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-phone"></i> +7 (777) 103 9971
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-envelope"></i>{" "}
                  sharipkhanalikhan@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">&copy; 2026 Qamkor. Все права защищены.</div>
      </div>
    </footer>
  );
}

export default Footer;
