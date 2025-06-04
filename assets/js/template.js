document.addEventListener("DOMContentLoaded", function () {
  // Load components
  loadComponent("head-content", "/components/header.html", false);
  loadComponent("navigation", "/components/navigation.html", false).then(() => {
    // Only set up mobile navigation after navigation component is loaded
    setTimeout(setupMobileNavigation, 100);
  });
  loadComponent("footer-content", "/components/footer.html", false);

  // Handle active navigation state after a short delay
  setTimeout(setActiveNavigation, 100);
});

// Modified loadComponent to return a promise
async function loadComponent(elementId, filePath, append = false) {
  const element = document.getElementById(elementId);
  if (!element) return Promise.resolve();

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
    return Promise.resolve();
  } catch (error) {
    console.error(`Failed to load component: ${error}`);
    return Promise.reject(error);
  }
}

// Separate function for mobile navigation
function setupMobileNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    // Remove any existing listeners first to avoid duplicates
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);

    // Add click handler to the new element
    newHamburger.addEventListener("click", () => {
      newHamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      console.log("Hamburger clicked"); // For debugging
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        newHamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
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
    document.getElementById("nav-home")?.classList.add("active");
  } else if (currentPath.endsWith("about.html")) {
    document.getElementById("nav-about")?.classList.add("active");
  } else if (
    currentPath.endsWith("projects.html") ||
    currentPath.includes("/projects/")
  ) {
    document.getElementById("nav-projects")?.classList.add("active");
  }
}
