const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-header nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("nav-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation.classList.remove("nav-open");
  });
});

const observedSections = ["home", "work", "about"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

observedSections.forEach((section) => sectionObserver.observe(section));

// Discourage casual saving from the portfolio surface; this cannot prevent screenshots or capture.
document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("video, .project-cover img, .concept-block img, .brand-image")) {
    event.preventDefault();
  }
});
