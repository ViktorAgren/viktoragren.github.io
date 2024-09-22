document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  function toggleMobileMenu() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
      });
  });

  // Typing Effect
  new Typed('.typed', {
      strings: ['Quantitative Analyst', 'Financial Mathematics Graduate', 'Software Developer'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filterValue = button.getAttribute('data-filter');

          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          projectItems.forEach(item => {
              item.style.display = (filterValue === 'all' || item.classList.contains(filterValue)) ? 'block' : 'none';
          });
      });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
      backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });

  backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (pageYOffset >= sectionTop - 60) {
              current = section.getAttribute('id');
          }
      });

      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').slice(1) === current) {
              link.classList.add('active');
          }
      });
  });

  // Initialize AOS
  AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
  });
});