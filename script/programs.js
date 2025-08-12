import { sideY } from "./toggle.js";

document.addEventListener('DOMContentLoaded', function () {
  // Fade-in animation for sections and program cards
  const fadeEls = document.querySelectorAll('.section, .hero, .program-card');
  fadeEls.forEach(el => el.classList.remove('visible')); // Ensure not visible on load

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach(el => observer.observe(el));
});

sideY();