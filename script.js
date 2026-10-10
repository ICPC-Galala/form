/* Paste your deployed Google Apps Script web-app URL below. */
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbziN-3iuztuNo8CjpZwfiv0VdQz-G6F9yE_KKEIwTj2BAcMHoGmKWcTTMnpkZ9GW5bi/exec";
const form = document.getElementById("registration-form");
const submitButton = document.getElementById("submit-button");
const statusBox = document.getElementById("form-status");
const formPanel = document.querySelector(".site-shell > .form-panel");
const successPanel = document.getElementById("success-panel");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.className = "form-status";
  statusBox.textContent = "";

  if (!form.reportValidity()) return;
  if (GOOGLE_APPS_SCRIPT_URL.startsWith("PASTE_")) {
    statusBox.className = "form-status error";
    statusBox.textContent = "The form is not connected to its response spreadsheet yet. Please finish the setup in the README first.";
    return;
  }

  const formData = new FormData(form);
  const payload = new URLSearchParams();
  for (const [key, value] of formData.entries()) payload.append(key, String(value).trim());
  payload.append("source", "GALALA ICPC COMMUNITY Student Registration");

  submitButton.disabled = true;
  submitButton.querySelector("span:first-child").textContent = "Submitting…";
  // Send the registration in the background so the success page appears immediately.
  // Apps Script's no-cors response is unreadable; this confirms the request was started,
  // not that the spreadsheet write has completed.
  const request = fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: payload.toString()
  });

  form.reset();
  formPanel.hidden = true;
  successPanel.hidden = false;
  successPanel.scrollIntoView({ behavior: "auto", block: "start" });
  submitButton.disabled = false;
  submitButton.querySelector("span:first-child").textContent = "Submit Registration";

  request.catch(() => {
    // The request failed at the network level. Show a notice if the user returns to the form.
    statusBox.className = "form-status error";
    statusBox.textContent = "We couldn't confirm the connection. If your details don't appear in the spreadsheet, please try registering again.";
  });
});
