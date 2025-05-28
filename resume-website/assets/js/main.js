// Main JavaScript file for the resume website

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
      }

      // In a real application, you would send this data to a server
      console.log("Form submission:", { name, email, message });
      alert("Thank you for your message! I'll get back to you soon.");

      // Reset form
      contactForm.reset();
    });
  }

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split("/").pop();
  const navLinkItems = document.querySelectorAll(".nav-links a");

  navLinkItems.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (
      currentPage === linkPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Lazy loading images
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.0/lazysizes.min.js";
    document.body.appendChild(script);
  }

  // Project filtering (if on projects page)
  const filterButtons = document.querySelectorAll(".project-filters button");
  if (filterButtons.length > 0) {
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active-filter");
        });

        // Add active class to clicked button
        this.classList.add("active-filter");

        const filterValue = this.getAttribute("data-filter");

        projectCards.forEach((card) => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});

// Add page transition animations
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});
