const notification = document.querySelector("#bell");
const alert = document.querySelector("#notify");
const menuButton = document.querySelector("#user");
const menuDropdown = document.querySelector("#menu-dropdown");
const setupControl = document.querySelector("#toggle-guides");
const setupSteps = document.querySelector("#steps");
const foldSetupSteps = document.querySelector("#close-steps");
const openSetupSteps = document.querySelector("#open-steps");
const trialCallout = document.querySelector("#trial-callout");
const dismissBtn = document.querySelector("#dismiss");

function openAlert() {
  alert.classList.toggle("hide");
  const isExpanded = notification.getAttribute("aria-expanded") === "true";
  const alertFocus = alert.querySelector("#mark-read");

  isExpanded
    ? notification.setAttribute("aria-expanded", "false")
    : notification.setAttribute("aria-expanded", "true");

  alertFocus.focus();
}

function openMenu() {
  menuDropdown.classList.toggle("hide");
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

  const menuItems = menuDropdown.querySelectorAll("[role='menuitem']");

  menuItems.item(0).focus();

  isExpanded
    ? menuButton.setAttribute("aria-expanded", "false")
    : menuButton.setAttribute("aria-expanded", "true");
}

function openSetupGuide() {
  openSetupSteps.classList.toggle("hide");
  setupSteps.classList.toggle("hide");
  foldSetupSteps.classList.toggle("hide");
}

function dismissTrialCallout() {
  trialCallout.classList.add("hide");
}

function togglePopup() {
  notification.addEventListener("click", openAlert);
  menuButton.addEventListener("click", openMenu);
  dismissBtn.addEventListener("click", dismissTrialCallout);
  setupControl.addEventListener("click", openSetupGuide);
}

togglePopup();
