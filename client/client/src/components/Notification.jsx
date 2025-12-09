import React from "react";

function Notification({ message, type }) {
  return <div className={`notification notification-${type}`}>{message}</div>;
}

export default Notification;
