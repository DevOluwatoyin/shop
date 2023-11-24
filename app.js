const notification = document.querySelector("#bell");
const alert = document.querySelector("#notify");

function openAlert() {
  alert.classList.toggle("hide");
  const isExpanded = notification.getAttribute("aria-expanded") === "true";
  const alertFocus = alert.querySelector("#mark-read");

  isExpanded
    ? notification.setAttribute("aria-expanded", "false")
    : notification.setAttribute("aria-expanded", "true");

  alertFocus.focus();
}


function togglePopup() {
  notification.addEventListener("click", openAlert);
}

togglePopup();
