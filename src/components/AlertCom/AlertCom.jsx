import React, { useState } from "react";

const Notification = ({ message, type, onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-blue-500";

  return (
    <div className={`p-4 rounded-lg shadow-lg text-white flex items-center justify-between ${bgColor}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        ×
      </button>
    </div>
  );
};

const AlertCom = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, message, type };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div>
      <div className="fixed top-4 right-4 space-y-4 z-50">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => showNotification("This is a success message!", "success")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Show Notification
        </button>
      </div>
    </div>
  );
};

export default AlertCom;