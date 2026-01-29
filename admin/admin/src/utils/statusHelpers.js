export const getStatusText = (status) => {
  const statusMap = {
    pending: "Күтуде",
    processing: "Өңделуде",
    shipped: "Жөнелтілді",
    delivered: "Жеткізілді",
    cancelled: "Жойылды",
  };
  return statusMap[status] || status;
};

export const getStatusStyle = (status) => {
  const statusStyles = {
    pending: { background: "#fff3cd", color: "#856404" },
    processing: { background: "#cfe2ff", color: "#084298" },
    shipped: { background: "#d1e7dd", color: "#0f5132" },
    delivered: { background: "#d1e7dd", color: "#0f5132" },
    cancelled: { background: "#f8d7da", color: "#842029" },
  };
  return statusStyles[status] || statusStyles.pending;
};
