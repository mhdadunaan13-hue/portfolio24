(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const year = document.querySelector('#year');
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  year.textContent = new Date().getFullYear();

  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    navLinks.classList.toggle('open', open);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      navLinks.classList.remove('open');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const emailTo = 'mhdadunaan@gmail.com';
  const validators = {
    name: value => value.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Enter a valid email address.',
    subject: value => value.trim().length > 0 ? '' : 'Please add a subject.',
    message: value => value.trim().length >= 10 ? '' : 'Please enter at least 10 characters.'
  };
  Object.keys(validators).forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });
  function validateField(field) {
    const error = validators[field.name](field.value);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    field.closest('.form-row').querySelector('.field-error').textContent = error;
    return !error;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea')];
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      const firstInvalid = fields.find(field => field.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    const values = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
    status.textContent = 'Opening your email app. Your message has not been sent by this website.';
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  });
})();