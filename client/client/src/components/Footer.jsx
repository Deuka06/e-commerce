import React from 'react';

function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Qamqor</h3>
            <p>
              Сіздің сенімді интернет-дүкеніңіз. Біз сізге ең жақсы сапаны және
              ерекше тәжірибені ұсынамыз.
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
                  <i className="fas fa-envelope"></i> info@qamqor.kz
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          &copy; 2026 Qamqor. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
