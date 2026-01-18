import React, { useState, useEffect } from "react";
import InstructionsModal from "./modals/InstructionsModal";

function Hero({ onShowCourier }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=350&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Стильді тауарлар бір жерде</h1>
              <p>
                StyleShop - бұл сіздің сүйікті брендтеріңіз мен тауарларыңызды
                таба алатын жер. Біз сізге ең жақсы сапаны және ерекше
                тәжірибені ұсынамыз.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => onShowCourier?.(true)}>
                  <i className="fas fa-shopping-bag"></i>
                  <span>Курьер шақыру</span>
                </button>
                <button
                  className="btn secondary"
                  onClick={() => setShowInstructions(true)}>
                  <i className="fas fa-list"></i>
                  <span>Нұсқаулық</span>
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src={images[currentImageIndex]}
                alt="Stylish shopping items"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "350px",
                  borderRadius: "var(--border-radius-lg)",
                  objectFit: "cover",
                  boxShadow: "0 15px 30px rgba(52, 152, 219, 0.2)",
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}>
                {images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentImageIndex ? "#3498db" : "#e0e0e0",
                      margin: "0 5px",
                      transition: "background-color 0.3s ease",
                    }}
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
    </>
  );
}

export default Hero;
