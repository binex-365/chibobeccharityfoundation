import { isToggled } from "./toggle.js";

isToggled();

// Smooth scroll for navigation links and donate buttons
function all() {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-links a, .nav-donate-btn, .hero-donate-btn').forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Fade-in animation for sections on scroll
    const sections = document.querySelectorAll('.section, .hero, .cta-banner');
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.92;
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
          section.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Impact number counter animation (on scroll and hover)
    let impactAnimated = false;
    function runImpactAnimation() {
      const impactSection = document.getElementById('impact');
      if (!impactSection) return;
      const numbers = impactSection.querySelectorAll('.program-card h3');
      numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target') || num.textContent.replace(/[^0-9]/g, ''));
        let count = 0;
        const increment = Math.ceil(target / 60);
        const updateNumber = () => {
          count += increment;
          if (count > target) count = target;
          num.textContent = count.toLocaleString() + '+';
          if (count < target) {
            requestAnimationFrame(updateNumber);
          }
        };
        num.textContent = '0+';
        updateNumber();
      });
    }

    function animateImpactNumbers() {
      if (impactAnimated) return;
      const impactSection = document.getElementById('impact');
      if (!impactSection) return;
      const sectionTop = impactSection.getBoundingClientRect().top;
      const triggerBottom = window.innerHeight * 0.92;
      if (sectionTop < triggerBottom) {
        impactAnimated = true;
        runImpactAnimation();
      }
    }

    // Scroll trigger
    window.addEventListener('scroll', animateImpactNumbers);
    animateImpactNumbers();

    // Hover trigger (restarts animation on every hover)
    const impactSection = document.getElementById('impact');
    if (impactSection) {
      impactSection.addEventListener('mouseenter', function () {
        impactAnimated = false;
        runImpactAnimation();
        impactAnimated = true;
      });
    }
  });
}

all();