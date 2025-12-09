import React from "react";

function InstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content" style={{ maxWidth: "700px" }}>
        <div className="modal-header">
          <h3>StyleShop веб-сайтын қалай пайдалану керек</h3>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
        </div>

        <div style={{ padding: "1.5rem", color: "var(--dark)" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
              <i className="fas fa-search"></i> 1. Тауарларды іздеу
            </h4>
            <p
              style={{
                marginLeft: "1.5rem",
                color: "var(--gray)",
                lineHeight: "1.6",
              }}>
              Сіздің сүйікті тауарларды табу үшін сілтемелер немесе сүзгі
              опцияларын пайдаланыңыз. Баға, категория және сұрыптау бойынша
              іздеп табыңыз.
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
              <i className="fas fa-shopping-cart"></i> 2. Себетке тауар қосу
            </h4>
            <p
              style={{
                marginLeft: "1.5rem",
                color: "var(--gray)",
                lineHeight: "1.6",
              }}>
              Тауар картасындағы "Себетке қосу" батырмасын басыңыз. Сіз бірнеше
              тауарды қоса аласыз және оларды себетте сақтай аласыз.
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
              <i className="fas fa-list"></i> 3. Себетті қарау
            </h4>
            <p
              style={{
                marginLeft: "1.5rem",
                color: "var(--gray)",
                lineHeight: "1.6",
              }}>
              Сол жақ жүктемелік пәндіңіздегі "Себет" батырмасын басыңыз.
              Өзіңіздің таңдалған тауарларыңыз көрсетіліп тұр және оларды жойып
              жібере аласыз.
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
              <i className="fas fa-credit-card"></i> 4. Төлем әдістері
            </h4>
            <p
              style={{
                marginLeft: "1.5rem",
                color: "var(--gray)",
                lineHeight: "1.6",
              }}>
              "Тапсырыс беру" батырмасын басыңыз. Төлем ақпаратын енгізіңіз және
              құнды төлеңіз. Біз қауіпсіз төлем қызметін қолданамыз.
            </p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "var(--primary)" }}>
              <i className="fas fa-truck"></i> 5. Жеткізу
            </h4>
            <p
              style={{
                marginLeft: "1.5rem",
                color: "var(--gray)",
                lineHeight: "1.6",
              }}>
              Тапсырысты жіберген кейін, сіз жеткізу номерін аласыз. Сіздің
              заказдарды қалай жіберіп беретінімізді көруге болады.
            </p>
          </div>

          <div
            style={{
              background: "rgba(108, 99, 255, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
              borderLeft: "4px solid var(--primary)",
            }}>
            <p style={{ margin: 0, color: "var(--dark)" }}>
              <i
                className="fas fa-info-circle"
                style={{ marginRight: "0.5rem", color: "var(--primary)" }}></i>
              <strong>Сұрақтар бар ма?</strong> Біздің қолдау командасына
              <a
                href="mailto:info@styleshop.kz"
                style={{
                  color: "var(--primary)",
                  textDecoration: "none",
                  marginLeft: "0.5rem",
                }}>
                email арқылы
              </a>{" "}
              хабарласыңыз.
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid #e0e0e0",
            textAlign: "right",
          }}>
          <button
            className="btn btn-primary"
            onClick={onClose}
            style={{ padding: "0.7rem 2rem" }}>
            Түсіндім
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionsModal;
