import { FocusTrap } from "./index.js";

const buttons = document.querySelector("#buttons");
const startFocusTrapButton = document.querySelector("#startFocusTrap");
const stopFocusTrapButton = document.querySelector("#stopFocusTrap");
const focusTrap = new FocusTrap(buttons);

startFocusTrapButton.addEventListener("click", () => focusTrap.start());
stopFocusTrapButton.addEventListener("click", () => focusTrap.stop());
