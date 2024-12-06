// Select important elements
const notifications = document.querySelectorAll(".notification");
const notificationCountEl = document.querySelector(".notification-count");
const markAllReadBtn = document.querySelector(".mark-all-read");
const statutDot = document.querySelector(".status-dot");

function updateNotificationCount() {
  const unreadNotifications = document.querySelectorAll(".notification.unread");
  notificationCountEl.textContent = unreadNotifications.length;
}

function markAsRead(notification) {
  if (notification.classList.contains("unread")) {
    notification.classList.remove("unread");
    updateNotificationCount();
  }
}

notifications.forEach((notification) => {
  notification.addEventListener("click", () => {
    const statusDot = notification.querySelector(".status-dot");

    if (statusDot) {
      statusDot.style.display = "none";
    }
  });
});

notifications.forEach((notification) => {
  notification.addEventListener("click", () => markAsRead(notification));
});

markAllReadBtn.addEventListener("click", () => {
  notifications.forEach((notification) =>
    notification.classList.remove("unread")
  );
  updateNotificationCount();
});

markAllReadBtn.addEventListener("click", () => {
    notifications.forEach((notification) => {
    const statusDot = notification.querySelector('.status-dot');
    if (statusDot) {
      statusDot.style.display = 'none';
    }
  });
});

updateNotificationCount();