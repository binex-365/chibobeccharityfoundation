import { sideY } from "./toggle.js";

// Smooth scrolling for anchor links and section reveal animation
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

  // Fade-in animation for sections, hero, and cta-banner
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

  // Enhanced Moving banner text animation every 10 seconds with fade/scale and background transition and emoji
  const bannerTexts = [
    { text: "Empowering Dreams, Transforming Lives, Building Hope.", emoji: "✨" },
    { text: "Every Child Deserves a Future – Join Our Mission Today!", emoji: "👧🏾👦🏽" },
    { text: "Together, We Can End Hunger and Poverty.", emoji: "🍲" },
    { text: "Education, Health, Empowerment – For Every Family.", emoji: "📚❤️" },
    { text: "Be the Change: Volunteer, Donate, Inspire.", emoji: "🤝" },
    { text: "Chibobec Charity Foundation – Lighting the Path to a Brighter Tomorrow.", emoji: "🌟" }
  ];
  let bannerIndex = 0;
  const bannerTextEl = document.getElementById('bannerText');
  const movingBanner = document.getElementById('movingBanner');

  // Confetti effect (optional, subtle)
  function createConfetti() {
    if (!movingBanner) return;
    let confetti = document.createElement('div');
    confetti.className = 'confetti';
    for (let i = 0; i < 18; i++) {
      let dot = document.createElement('span');
      dot.style.position = 'absolute';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top =
      dot.style.width = dot.style.height = (Math.random() * 6 + 4) + 'px';
      dot.style.background = ['#ffd700', '#ff6600', '#8f94fb', '#fffbe8'][Math.floor(Math.random()*4)];
      dot.style.borderRadius = '50%';
      dot.style.opacity = 0.7;
      dot.style.filter = 'blur(0.5px)';
      dot.style.animation = `confetti-float ${2 + Math.random() * 2}s ease-in-out infinite alternate`;
      confetti.appendChild(dot);
    }
    movingBanner.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1800);
  }

  // Confetti keyframes (add to your CSS if you want confetti)
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes confetti-float {
    0% { transform: translateY(0);}
    100% { transform: translateY(-18px);}
  }`;
  document.head.appendChild(style);

  function animateBannerText(newObj) {
    bannerTextEl.style.opacity = 0;
    bannerTextEl.style.transform = "translateY(30px) scale(0.9)";
    setTimeout(() => {
      bannerTextEl.innerHTML = `<span class="banner-emoji">${newObj.emoji}</span>${newObj.text}`;
      bannerTextEl.style.opacity = 1;
      bannerTextEl.style.transform = "translateY(0) scale(1.08)";
      setTimeout(() => {
        bannerTextEl.style.transform = "translateY(0) scale(1)";
      }, 600);
      createConfetti();
    }, 400);
  }

  // Initial render with emoji
  bannerTextEl.innerHTML = `<span class="banner-emoji">${bannerTexts[0].emoji}</span>${bannerTexts[0].text}`;

  setInterval(() => {
    bannerIndex = (bannerIndex + 1) % bannerTexts.length;
    animateBannerText(bannerTexts[bannerIndex]);
  }, 10000);
});


sideY();
