export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getStatusBadge = (status) => {
  const statusMap = {
    pending: { class: "status-pending", text: "Күтілуде" },
    shipped: { class: "status-shipped", text: "Жеткізілді" },
    completed: { class: "status-completed", text: "Аяқталды" },
  };
  return statusMap[status] || { class: "", text: "" };
};
