document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  // Smooth close of mobile navbar after clicking a section.
  document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Scroll progress bar.
  const progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
  });

  // Contact form demo interaction (no backend).
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.textContent = "Thanks! This demo form is ready for a backend/email service.";
    form.reset();
  });

  // Theme toggle.
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("zeel-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("zeel-theme", isLight ? "light" : "dark");
    themeToggle.innerHTML = isLight
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';
  });

  // Small reveal animation without external libraries.
  const revealItems = document.querySelectorAll(".content-card, .skill-card, .project-card, .timeline-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(22px)";
    item.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(item);
  });

  const style = document.createElement("style");
  style.textContent = ".revealed{opacity:1!important;transform:translateY(0)!important}";
  document.head.appendChild(style);
});
