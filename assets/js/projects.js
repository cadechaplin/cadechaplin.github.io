document.addEventListener("DOMContentLoaded", function () {
  // Project data structure
  const projects = [
    {
      title: "Dance Teaching App",
      description:
        "AI-powered application using Google ML Pose Detection to teach dance movements and provide real-time feedback to users.",
      tags: ["python", "ml", "ui"],
      image: "/WebsiteImages/DanceApp/overview.png",
      github: "https://github.com/cadechaplin/dance-teaching-app",
      featured: true,
      detailPage: "projects/dance-teaching-app.html",
    },
    {
      title: "Spreadsheet Application",
      description:
        "A cross-platform spreadsheet application with formula support, cell referencing, and error handling built using C# and Avalonia UI.",
      tags: ["csharp", "desktop", "ui"],
      image: "/WebsiteImages/Spreadsheet/overview.png",
      github: "https://github.com/cadechaplin/spreadsheet-app",
      featured: true,
      detailPage: "projects/spreadsheet-application.html",
    },
    {
      title: "Steganography Chatroom",
      description:
        "Created a secure chat application embedding messages in images using steganography with message encryption.",
      tags: ["python", "web", "security"],
      image: "/WebsiteImages/Steganography/overview.png",
      github: "https://github.com/cadechaplin/steganography-chat",
      featured: false,
      detailPage: "projects/steganography-chatroom.html",
    },
    {
      title: "Bullet Hell Game",
      description:
        "An Ancient Greek-themed bullet hell game built with MonoGame featuring mythological enemies, wave-based progression, and boss battles.",
      tags: ["csharp", "monogame", "gamedev"],
      image: "/WebsiteImages/BulletHell/overview.png",
      github: "https://github.com/emmaebjohnson/Sccemj-Bullet-Hell-Game",
      featured: false,
      detailPage: "projects/bullet-hell-game.html",
    },
    {
      title: "ACME Food Bank Inventory System",
      description:
        "A comprehensive inventory management system for ACME Food Bank built with MERN stack, featuring donation tracking, expiration monitoring, and reporting capabilities.",
      tags: ["react", "mongodb", "express", "nodejs"],
      image: "/WebsiteImages/Inventory-App/Inventory.png",
      github: "https://github.com/cadechaplin/CPT-S-582-Project",
      featured: false,
      detailPage: "projects/Inventory-App.html",
    },
  ];

  // Load projects into the grid
  function loadProjects(filter = "all") {
    const projectGrid = document.getElementById("projectGrid");

    if (!projectGrid) {
      console.error("Project grid element not found");
      return;
    }

    projectGrid.innerHTML = "";

    projects.forEach((project) => {
      // Apply filter
      if (filter !== "all" && !project.tags.includes(filter)) {
        return;
      }

      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      projectCard.innerHTML = `
        <a href="${project.detailPage}" class="project-card-link">
          <div class="project-image">
            <img 
              src="${project.image}" 
              alt="${project.title}" 
              onerror="this.src='${
                project.fallbackImage || "https://via.placeholder.com/600x400"
              }'"
            />
          </div>
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags
                .map((tag) => `<span class="project-tag">${tag}</span>`)
                .join("")}
            </div>
            <div class="project-links">
              <a href="${project.github}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View Code
              </a>
              <a href="${project.detailPage}" class="project-link">
                <i class="fas fa-info-circle"></i> More Details
              </a>
            </div>
          </div>
        </a>
      `;

      projectGrid.appendChild(projectCard);
    });
  }

  // Set up filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Apply filter
        const filter = this.getAttribute("data-filter");
        loadProjects(filter);
      });
    });
  }

  // Initialize with all projects
  loadProjects();
});

// Function to add a new project programmatically (for future use)
function addProject(projectData) {
  if (!projectData.title || !projectData.description || !projectData.tags) {
    console.error("Invalid project data");
    return false;
  }

  projects.push(projectData);
  return true;
}
