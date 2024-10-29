document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
