import React, { useState } from "react";
import InstructionsModal from "./modals/InstructionsModal";

function Hero({ onShowCourier }) {
  const [showInstructions, setShowInstructions] = useState(false);

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
              <div
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "350px",
                  background: "var(--gradient)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}>
                <i
                  className="fas fa-shopping-bag"
                  style={{ fontSize: "4rem", opacity: 0.7 }}></i>
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
