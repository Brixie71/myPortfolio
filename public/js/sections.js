export function initSections() {
  const revealItems = document.querySelectorAll("[data-reveal]");
  const navLinks = document.querySelectorAll(".site-nav a");
  const sections = document.querySelectorAll("main section[id]");

  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }

  if (sections.length === 0 || navLinks.length === 0) {
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("is-active", isActive);
        });
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-20% 0px -55% 0px",
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
