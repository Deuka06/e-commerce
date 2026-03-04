import React, { useState, useEffect } from "react";
import InstructionsModal from "./modals/InstructionsModal";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";

function Hero({ onShowCourier }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    img1,
    "https://img.freepik.com/free-photo/real-food-pyramid-assortment-top-view_23-2150238927.jpg?semt=ais_hybrid&w=740&q=80",
    img2,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div
            className="hero-content"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}>
            <div
              className="hero-text"
              style={{
                flex: 1,
                minWidth: "300px",
              }}>
              <h1>Надежная служба доставки</h1>
              <p>
                Qamkor — сервис быстрой доставки ваших покупок и посылок.
                Заказывайте из любого места, а мы позаботимся о том, чтобы всё
                прибыло к вам в лучшем виде. Просто, надежно, вовремя.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => onShowCourier?.(true)}>
                  <i className="fas fa-shopping-bag"></i>
                  <span>Вызвать курьера</span>
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setShowInstructions(true)}>
                  <i className="fas fa-list"></i>
                  <span>Инструкция</span>
                </button>
              </div>
            </div>

            <div
              className="hero-images"
              style={{
                flex: 1,
                minWidth: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <div
                className="image-container"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "350px",
                  left: "70px",
                  borderRadius: "var(--border-radius-lg)",
                  overflow: "hidden",
                  boxShadow: "0 15px 30px rgba(52, 152, 219, 0.2)",
                  position: "relative",
                }}>
                <img
                  src={images[currentImageIndex]}
                  alt="Stylish shopping items"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: fade ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                />
              </div>

              <div
                className="image-indicators"
                style={{
                  display: "flex",
                  paddingLeft: "170px",
                  justifyContent: "center",
                  marginTop: "15px",
                  gap: "8px",
                }}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className="indicator-dot"
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentImageIndex ? "#3498db" : "#e0e0e0",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transform:
                        index === currentImageIndex ? "scale(1.2)" : "scale(1)",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => {
                      setFade(false);
                      setTimeout(() => {
                        setCurrentImageIndex(index);
                        setFade(true);
                      }, 500);
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <style>{`
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column !important;
          }

          .hero-text {
            text-align: center;
            min-width: 100% !important;
          }

          .hero-text h1 {
            font-size: 1.8rem;
          }

          .hero-text p {
            font-size: 0.95rem;
          }

          .hero-buttons {
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-images {
            min-width: 100% !important;
            margin-top: 1rem;
          }

          .image-container {
            height: 250px !important;
            max-width: 100% !important;
            left: 0 !important;
          }

          .image-indicators {
            margin-top: 10px !important;
            padding-left: 0 !important;
          }

          /* Уменьшение размера индикаторов для планшетов */
          .indicator-dot {
            width: 10px !important;
            height: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 1.5rem;
          }

          .hero-text p {
            font-size: 0.9rem;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }

          .hero-buttons button {
            width: 100%;
            justify-content: center;
          }

          .image-container {
            height: 200px !important;
            border-radius: var(--border-radius) !important;
            left: 0 !important;
          }

          /* Дальнейшее уменьшение индикаторов для маленьких экранов */
          .image-indicators {
            gap: 6px !important;
            padding-left: 0 !important;
          }

          .indicator-dot {
            width: 8px !important;
            height: 8px !important;
            min-width: 8px !important;
            min-height: 8px !important;
          }

          .indicator-dot[aria-current="true"] {
            transform: scale(1.1) !important;
          }
        }

        @media (max-width: 360px) {
          /* Минимальный размер индикаторов для очень маленьких экранов */
          .indicator-dot {
            width: 6px !important;
            height: 6px !important;
            min-width: 6px !important;
            min-height: 6px !important;
          }

          .image-indicators {
            gap: 5px !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}

export default Hero;
