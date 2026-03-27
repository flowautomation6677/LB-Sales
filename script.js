/* ====================================================
   LB SALES — script.js
   Funcionalidades: Reveal, FAQ Accordion, Menu Mobile
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Inicializar Lucide Icons ----
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ---- 1. SCROLL REVEAL — Fade Up via IntersectionObserver ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- 2. FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fechar todos os outros
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          const otherQuestion = other.querySelector('.faq-question');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle o item clicado
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- 3. MENU MOBILE ----
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav  = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fechar menu ao clicar em qualquer link interno
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // ---- 4. SMOOTH SCROLL para âncoras (fallback cross-browser) ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- 5. HEADER — adicionar sombra no scroll ----
  const header = document.querySelector('.site-header');

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.4)';
      } else {
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

});
