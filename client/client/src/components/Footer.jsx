import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>StyleShop</h3>
            <p>
              Сіздің сенімді интернет-дүкеніңіз. Біз сізге ең жақсы сапаны және
              ерекше тәжірибені ұсынамыз.
            </p>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Жылдам сілтемелер</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Басты бет
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Біз туралы
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Тауарлар
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Байланыс
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Қосымша ақпарат</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Жеткізу шарттары
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Төлем әдістері
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Құпиялылық саясаты
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Кері байланыс
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Байланыс</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> Алматы, Абай көш.
                  123
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-phone"></i> +7 (777) 123-45-67
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-envelope"></i> info@styleshop.kz
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2025 StyleShop. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
