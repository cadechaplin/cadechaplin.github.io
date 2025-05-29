document.addEventListener("DOMContentLoaded", function () {
  // Load components
  loadComponent("head-content", "/components/header.html", false);
  loadComponent("navigation", "/components/navigation.html", false);
  loadComponent("footer-content", "/components/footer.html", false);

  // Handle active navigation state
  setTimeout(setActiveNavigation, 100);
});

// Function to load component content
async function loadComponent(elementId, filePath, append = false) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Error loading ${filePath}: ${response.status}`);
    }
    const content = await response.text();

    if (append) {
      element.innerHTML += content;
    } else {
      element.innerHTML = content;
    }
  } catch (error) {
    console.error(`Failed to load component: ${error}`);
  }
}

// Set active navigation based on current page
function setActiveNavigation() {
  const currentPath = window.location.pathname;

  // Remove active class from all nav items
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class based on current page
  if (
    currentPath.endsWith("index.html") ||
    currentPath === "/" ||
    currentPath === ""
  ) {
    document.getElementById("nav-home").classList.add("active");
  } else if (currentPath.endsWith("about.html")) {
    document.getElementById("nav-about").classList.add("active");
  } else if (
    currentPath.endsWith("projects.html") ||
    currentPath.includes("/projects/")
  ) {
    document.getElementById("nav-projects").classList.add("active");
  }

  // Handle mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
}
