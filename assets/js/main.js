// Main JavaScript file for the resume website

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    });
  }
});

// Add page transition animations
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
