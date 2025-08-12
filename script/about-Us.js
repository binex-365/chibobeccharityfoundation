import { sideY } from "./toggle.js";

// Smooth scrolling for anchor links and animated section reveal on scroll
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Impact counter animation (increment step) on scroll or mouseenter
  const impactSection = document.getElementById('impact');
  if (impactSection) {
    const impactNumbers = impactSection.querySelectorAll('.impact-card h3');

    // Helper to get the numeric value from text like "5,000+"
    function getTargetValue(text) {
      return parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    }

    // Animate the count from 0 to target
    function animateCount(el, target, duration = 1800) {
      let startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString() + '+';
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
      el.textContent = '0+';
      requestAnimationFrame(step);
    }

    // Always allow animation to be triggered (reset on mouseenter)
    function triggerImpactCount() {
      impactNumbers.forEach(el => {
        const target = el.getAttribute('data-target')
          ? parseInt(el.getAttribute('data-target'), 10)
          : getTargetValue(el.textContent);
        animateCount(el, target);
      });
    }

    // Store the original target values as data-target for consistency
    impactNumbers.forEach(el => {
      if (!el.getAttribute('data-target')) {
        el.setAttribute('data-target', getTargetValue(el.textContent));
      }
      el.textContent = '0+';
    });

    // Trigger on mouseenter (reset and animate)
    impactSection.addEventListener('mouseenter', function () {
      // Reset numbers to 0+ before animating
      impactNumbers.forEach(el => { el.textContent = '0+'; });
      triggerImpactCount();
    });

    // Trigger when section is scrolled into view
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reset numbers to 0+ before animating
            impactNumbers.forEach(el => { el.textContent = '0+'; });
            triggerImpactCount();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(impactSection);
  }

  // Animate sections on scroll
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.add('section-hidden');
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          entry.target.classList.remove('section-hidden');
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach(section => {
    revealObserver.observe(section);
  });

  // Hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('show'));
    });
  }

  // Fade-in animation for sections
  const fadeEls = document.querySelectorAll('.section, .hero, .cta-banner');
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