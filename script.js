
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");
const serviceSelect = document.getElementById("service");

// Replace this with the client's WhatsApp number.
// South African example: 27821234567 (no + or spaces).
const WHATSAPP_NUMBER = "REPLACE_WITH_CLIENT_NUMBER";

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Select a service when someone clicks its enquiry link.
document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.service;
  });
});

// Prepare a WhatsApp quote enquiry.
quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!quoteForm.reportValidity()) return;

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Demo mode: add the client's WhatsApp number in script.js before using this form.";
    return;
  }

  const formData = new FormData(quoteForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const service = formData.get("service");
  const message = formData.get("message").trim();

  const enquiry = [
    "Hello SparklePro! I'd like to request a cleaning quote.",
    "",
    `Name: ${name}`,
    `Contact number: ${phone}`,
    `Service: ${service}`,
    `Additional details: ${message || "None provided"}`
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
