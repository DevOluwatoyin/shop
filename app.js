const notification = document.querySelector("#bell");
const alert = document.querySelector("#notify");
const menuButton = document.querySelector("#user");
const menuDropdown = document.querySelector("#menu-dropdown");
const trialCallout = document.querySelector("#trial-callout");
const dismissBtn = document.querySelector("#dismiss");
const setupControl = document.querySelector("#toggle-guides");
const setupSteps = document.querySelector("#accordion-wrapper");
const foldSetupSteps = document.querySelector("#close-steps");
const openSetupSteps = document.querySelector("#open-steps");
const allSteps = document.querySelectorAll(".accordion-item");

function OpenAlert() {
  alert.classList.toggle("hide");
  const isExpanded = notification.getAttribute("aria-expanded") === "true";
  const alertFocus = alert.querySelector("#mark-read");

  isExpanded
    ? notification.setAttribute("aria-expanded", "false")
    : notification.setAttribute("aria-expanded", "true");

  alertFocus.focus();
}

function OpenMenu() {
  menuDropdown.classList.toggle("hide");
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";

  const menuItems = menuDropdown.querySelectorAll("[role='menuitem']");

  menuItems.item(0).focus();

  isExpanded
    ? menuButton.setAttribute("aria-expanded", "false")
    : menuButton.setAttribute("aria-expanded", "true");
}

function DismissTrialCallout() {
  trialCallout.classList.add("hide");
}

function OpenSetupGuide() {
  openSetupSteps.classList.toggle("hide");
  setupSteps.classList.toggle("hide");
  foldSetupSteps.classList.toggle("hide");
}

function OpenAndCloseSetupStep() {
  allSteps.forEach((item, index) => {
    const control = item.querySelector(".accordion-control");
    const content = item.querySelector(".desc-texts");
    const checkbox = item.querySelector(".checkbox");

    if (index === 0) {
      item.classList.remove("hidden");
      content.setAttribute("aria-hidden", "false");
    }

    checkbox.addEventListener("click", function () {
      checkbox.classList.contains("marked-as-done")
        ? UncheckSteps(checkbox)
        : CheckSteps(checkbox);
    });

    control.addEventListener("click", function () {
      const isOpen = item.classList.contains("hidden");

      allSteps.forEach((otherItem) => {
        otherItem.classList.add("hidden");
        otherItem
          .querySelector(".desc-texts")
          .setAttribute("aria-hidden", "true");
      });

      if (isOpen) {
        item.classList.remove("hidden");
        content.setAttribute("aria-hidden", "false");
      }
    });
  });
}

function CheckSteps(checkbox) {
  const uncheckedIcon = checkbox.querySelector(".unchecked");
  const loadingIcon = checkbox.querySelector(".loader");
  const checkedIcon = checkbox.querySelector(".checked");
  const progress = document.getElementById("progress");
  const progressStatus = document.getElementById("progress-status");

  loadingIcon.classList.remove("hide");
  uncheckedIcon.classList.add("hide");

  setTimeout(() => {
    loadingIcon.classList.add("hide");
    checkedIcon.classList.remove("hide");
    checkbox.classList.add("marked-as-done");

    const currentValue = parseInt(progress.value);
    const maxValue = parseInt(progress.max);

    if (currentValue < maxValue) {
      progress.value = currentValue + 1;
      progressStatus.textContent = `${progress.value} / ${progress.max} completed`;
    }
  }, 2000);
}

function UncheckSteps(checkbox) {
  const uncheckedIcon = checkbox.querySelector(".unchecked");
  const loadingIcon = checkbox.querySelector(".loader");
  const checkedIcon = checkbox.querySelector(".checked");
  const progress = document.getElementById("progress");
  const progressStatus = document.getElementById("progress-status");

  checkedIcon.classList.add("hide");
  loadingIcon.classList.remove("hide");

  setTimeout(() => {
    loadingIcon.classList.add("hide");
    uncheckedIcon.classList.remove("hide");
    checkbox.classList.remove("marked-as-done");

    const currentValue = parseInt(progress.value);
    const maxValue = parseInt(progress.max);

    if (currentValue <= maxValue) {
      progress.value = currentValue - 1 === 0 ? "0.4" : currentValue - 1;
      progressStatus.textContent = `${parseInt(progress.value)} / ${progress.max} completed`;
    }
  }, 2000);
}

function togglePopup() {
  notification.addEventListener("click", OpenAlert);
  menuButton.addEventListener("click", OpenMenu);
  dismissBtn.addEventListener("click", DismissTrialCallout);
  setupControl.addEventListener("click", OpenSetupGuide);
}

togglePopup();
OpenAndCloseSetupStep();
