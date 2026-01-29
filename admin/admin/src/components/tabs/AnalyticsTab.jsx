import React from "react";
import StatsGrid from "../dashboard/StatsGrid";
import { styles } from "../../styles/adminPanelStyles";

function AnalyticsTab({ orders, isMobile }) {
  return (
    <div style={styles.card}>
      <div
        style={{
          ...styles.cardHeader,
          ...(isMobile ? styles.cardHeaderMobile : {}),
        }}>
        <h3
          style={{
            ...styles.cardTitle,
            ...(isMobile ? styles.cardTitleMobile : {}),
          }}>
          📈 Сатылым аналитикасы
        </h3>
      </div>
      <div
        style={{
          ...styles.cardBody,
          ...(isMobile ? styles.cardBodyMobile : {}),
        }}>
        <StatsGrid orders={orders} isAnalytics={true} />
      </div>
    </div>
  );
}

export default AnalyticsTab;
